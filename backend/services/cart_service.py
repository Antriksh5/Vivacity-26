"""Cart service for business logic."""

from sqlalchemy.orm import Session, joinedload
from uuid import UUID
from typing import Optional
from decimal import Decimal

from models.cart import Cart, CartItem
from models.product import ProductVariant, Product
from schemas.cart import CartResponse, CartItemResponse


class CartService:
    def __init__(self, db: Session):
        self.db = db

    def get_or_create_cart(
        self,
        user_id: Optional[UUID] = None,
        session_id: Optional[str] = None,
    ) -> Cart:
        """Get existing cart or create new one."""
        cart = None

        if user_id:
            cart = self.db.query(Cart).filter(Cart.user_id == user_id).first()
        elif session_id:
            cart = self.db.query(Cart).filter(Cart.session_id == session_id).first()

        if not cart:
            cart = Cart(user_id=user_id, session_id=session_id)
            self.db.add(cart)
            self.db.commit()
            self.db.refresh(cart)

        return cart

    def add_item(self, cart: Cart, variant_id: UUID, quantity: int) -> Cart:
        """Add item to cart or update quantity if exists."""
        variant = self.db.query(ProductVariant).filter(
            ProductVariant.id == variant_id,
            ProductVariant.is_active == True,
        ).first()

        if not variant:
            raise ValueError("Variant not found or inactive")

        if variant.available_stock < quantity:
            raise ValueError("Insufficient stock")

        # Check if item already in cart
        existing_item = self.db.query(CartItem).filter(
            CartItem.cart_id == cart.id,
            CartItem.variant_id == variant_id,
        ).first()

        if existing_item:
            new_quantity = existing_item.quantity + quantity
            if variant.available_stock < new_quantity:
                raise ValueError("Insufficient stock")
            existing_item.quantity = new_quantity
        else:
            price = variant.price or variant.product.base_price
            item = CartItem(
                cart_id=cart.id,
                variant_id=variant_id,
                quantity=quantity,
                unit_price=price,
            )
            self.db.add(item)

        self.db.commit()
        self.db.refresh(cart)
        return cart

    def update_item(self, cart: Cart, item_id: UUID, quantity: int) -> Cart:
        """Update cart item quantity."""
        item = self.db.query(CartItem).filter(
            CartItem.id == item_id,
            CartItem.cart_id == cart.id,
        ).first()

        if not item:
            raise ValueError("Cart item not found")

        variant = self.db.query(ProductVariant).filter(
            ProductVariant.id == item.variant_id
        ).first()

        if variant.available_stock < quantity:
            raise ValueError("Insufficient stock")

        item.quantity = quantity
        self.db.commit()
        self.db.refresh(cart)
        return cart

    def remove_item(self, cart: Cart, item_id: UUID) -> Cart:
        """Remove item from cart."""
        item = self.db.query(CartItem).filter(
            CartItem.id == item_id,
            CartItem.cart_id == cart.id,
        ).first()

        if item:
            self.db.delete(item)
            self.db.commit()
            self.db.refresh(cart)

        return cart

    def clear_cart(self, cart: Cart) -> Cart:
        """Remove all items from cart."""
        self.db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
        self.db.commit()
        self.db.refresh(cart)
        return cart

    def get_cart_response(self, cart: Cart) -> CartResponse:
        """Convert cart to response format."""
        items = []
        subtotal = Decimal("0.00")

        cart_items = self.db.query(CartItem).options(
            joinedload(CartItem.cart)
        ).filter(CartItem.cart_id == cart.id).all()

        for item in cart_items:
            variant = self.db.query(ProductVariant).options(
                joinedload(ProductVariant.product).joinedload(Product.images)
            ).filter(ProductVariant.id == item.variant_id).first()

            if variant:
                product = variant.product
                image_url = None
                if product.images:
                    primary = next((img for img in product.images if img.is_primary), None)
                    image_url = primary.url if primary else product.images[0].url

                item_subtotal = item.unit_price * item.quantity
                subtotal += item_subtotal

                items.append(CartItemResponse(
                    id=item.id,
                    variant_id=variant.id,
                    product_name=product.name,
                    variant_name=variant.name,
                    sku=variant.sku,
                    unit_price=item.unit_price,
                    quantity=item.quantity,
                    subtotal=item_subtotal,
                    image_url=image_url,
                    available_stock=variant.available_stock,
                ))

        return CartResponse(
            id=cart.id,
            items=items,
            item_count=sum(i.quantity for i in items),
            subtotal=subtotal,
            currency=cart.currency,
        )
