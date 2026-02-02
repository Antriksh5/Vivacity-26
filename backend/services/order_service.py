"""Order service for business logic."""

from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from uuid import UUID
from typing import Optional
from decimal import Decimal
import math

from models.cart import Cart, CartItem
from models.order import Order, OrderItem, OrderAddress, OrderStatus, PaymentStatus, AddressType
from models.product import ProductVariant
from schemas.order import (
    AddressRequest,
    OrderResponse,
    OrderListResponse,
    PaginatedOrdersResponse,
)


class OrderService:
    def __init__(self, db: Session):
        self.db = db

    def create_order_from_cart(
        self,
        cart: Cart,
        email: str,
        phone: Optional[str],
        shipping_address: AddressRequest,
        billing_address: AddressRequest,
        notes: Optional[str] = None,
    ) -> Order:
        """Create order from cart."""
        # Calculate totals
        subtotal = Decimal("0.00")
        items_to_create = []

        for cart_item in cart.items:
            variant = self.db.query(ProductVariant).options(
                joinedload(ProductVariant.product)
            ).filter(ProductVariant.id == cart_item.variant_id).first()

            if not variant:
                raise ValueError(f"Variant not found: {cart_item.variant_id}")

            item_total = cart_item.unit_price * cart_item.quantity
            subtotal += item_total

            items_to_create.append({
                "variant_id": variant.id,
                "product_name": variant.product.name,
                "variant_name": variant.name,
                "sku": variant.sku,
                "quantity": cart_item.quantity,
                "unit_price": cart_item.unit_price,
                "total": item_total,
            })

            # Reserve stock
            variant.reserved_stock += cart_item.quantity

        # Create order
        order = Order(
            user_id=cart.user_id,
            subtotal=subtotal,
            grand_total=subtotal,  # Add tax/shipping logic as needed
            customer_email=email,
            customer_phone=phone,
            notes=notes,
        )
        self.db.add(order)
        self.db.flush()  # Get order ID

        # Create order items
        for item_data in items_to_create:
            order_item = OrderItem(order_id=order.id, **item_data)
            self.db.add(order_item)

        # Create addresses
        shipping = OrderAddress(
            order_id=order.id,
            type=AddressType.SHIPPING,
            **shipping_address.model_dump(),
        )
        self.db.add(shipping)

        billing = OrderAddress(
            order_id=order.id,
            type=AddressType.BILLING,
            **billing_address.model_dump(),
        )
        self.db.add(billing)

        self.db.commit()
        self.db.refresh(order)

        return order

    def get_order(self, order_id: UUID) -> Optional[Order]:
        """Get order by ID."""
        return self.db.query(Order).options(
            joinedload(Order.items),
            joinedload(Order.addresses),
        ).filter(Order.id == order_id).first()

    def list_user_orders(
        self,
        user_id: UUID,
        page: int = 1,
        page_size: int = 10,
    ) -> PaginatedOrdersResponse:
        """List orders for a user."""
        query = self.db.query(Order).filter(Order.user_id == user_id)

        total = query.count()
        orders = query.order_by(Order.created_at.desc()).offset(
            (page - 1) * page_size
        ).limit(page_size).all()

        items = []
        for o in orders:
            item_count = self.db.query(func.sum(OrderItem.quantity)).filter(
                OrderItem.order_id == o.id
            ).scalar() or 0

            items.append(OrderListResponse(
                id=o.id,
                order_number=o.order_number,
                status=o.status,
                payment_status=o.payment_status,
                grand_total=o.grand_total,
                item_count=int(item_count),
                created_at=o.created_at,
            ))

        return PaginatedOrdersResponse(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=math.ceil(total / page_size) if total > 0 else 1,
        )

    def list_all_orders(
        self,
        page: int = 1,
        page_size: int = 20,
        status: Optional[str] = None,
        search: Optional[str] = None,
    ) -> PaginatedOrdersResponse:
        """List all orders (admin)."""
        query = self.db.query(Order)

        if status:
            query = query.filter(Order.status == status)

        if search:
            query = query.filter(
                Order.order_number.ilike(f"%{search}%") |
                Order.customer_email.ilike(f"%{search}%")
            )

        total = query.count()
        orders = query.order_by(Order.created_at.desc()).offset(
            (page - 1) * page_size
        ).limit(page_size).all()

        items = []
        for o in orders:
            item_count = self.db.query(func.sum(OrderItem.quantity)).filter(
                OrderItem.order_id == o.id
            ).scalar() or 0

            items.append(OrderListResponse(
                id=o.id,
                order_number=o.order_number,
                status=o.status,
                payment_status=o.payment_status,
                grand_total=o.grand_total,
                item_count=int(item_count),
                created_at=o.created_at,
            ))

        return PaginatedOrdersResponse(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=math.ceil(total / page_size) if total > 0 else 1,
        )

    def update_order_status(
        self,
        order_id: UUID,
        status: OrderStatus,
        tracking_number: Optional[str] = None,
        internal_notes: Optional[str] = None,
    ) -> Optional[Order]:
        """Update order status."""
        order = self.db.query(Order).filter(Order.id == order_id).first()
        if not order:
            return None

        order.status = status

        if tracking_number:
            order.tracking_number = tracking_number

        if internal_notes:
            order.internal_notes = internal_notes

        # If shipped, update shipped_at
        if status == OrderStatus.SHIPPED:
            from datetime import datetime
            order.shipped_at = datetime.utcnow()

        # If delivered, update delivered_at
        if status == OrderStatus.DELIVERED:
            from datetime import datetime
            order.delivered_at = datetime.utcnow()

        self.db.commit()
        self.db.refresh(order)

        return order

    def process_refund(
        self,
        order_id: UUID,
        amount: Optional[float] = None,
    ) -> bool:
        """Process order refund."""
        order = self.db.query(Order).filter(Order.id == order_id).first()
        if not order:
            return False

        # Update status
        if amount and amount < float(order.grand_total):
            order.payment_status = PaymentStatus.PARTIALLY_REFUNDED
        else:
            order.payment_status = PaymentStatus.REFUNDED
            order.status = OrderStatus.REFUNDED

        # Restore stock
        for item in order.items:
            if item.variant_id:
                variant = self.db.query(ProductVariant).filter(
                    ProductVariant.id == item.variant_id
                ).first()
                if variant:
                    variant.reserved_stock = max(0, variant.reserved_stock - item.quantity)
                    variant.stock += item.quantity

        self.db.commit()
        return True
