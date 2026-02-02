"""Product service for business logic."""

from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, or_
from uuid import UUID
from typing import Optional
from decimal import Decimal
import math

from models.product import Product, Category, ProductImage, ProductVariant, ProductStatus, product_categories
from schemas.product import (
    ProductListResponse,
    ProductDetailResponse,
    ProductCreateRequest,
    ProductUpdateRequest,
    PaginatedProductsResponse,
)


class ProductService:
    def __init__(self, db: Session):
        self.db = db

    def list_products(
        self,
        page: int = 1,
        page_size: int = 12,
        category_slug: Optional[str] = None,
        search: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        featured_only: Optional[bool] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc",
        status: Optional[str] = None,
        include_drafts: bool = False,
    ) -> PaginatedProductsResponse:
        query = self.db.query(Product).options(
            joinedload(Product.images),
            joinedload(Product.categories),
        )

        # Filter by status
        if not include_drafts:
            query = query.filter(Product.status == ProductStatus.ACTIVE)
        elif status:
            query = query.filter(Product.status == status)

        # Filter by category
        if category_slug:
            query = query.join(product_categories).join(Category).filter(
                Category.slug == category_slug
            )

        # Search
        if search:
            query = query.filter(
                or_(
                    Product.name.ilike(f"%{search}%"),
                    Product.description.ilike(f"%{search}%"),
                    Product.sku.ilike(f"%{search}%"),
                )
            )

        # Price filters
        if min_price is not None:
            query = query.filter(Product.base_price >= min_price)
        if max_price is not None:
            query = query.filter(Product.base_price <= max_price)

        # Featured only
        if featured_only:
            query = query.filter(Product.is_featured == True)

        # Count total
        total = query.count()

        # Sorting
        sort_mapping = {
            "price": Product.base_price,
            "name": Product.name,
            "created_at": Product.created_at,
        }
        sort_column = sort_mapping.get(sort_by, Product.created_at)
        if sort_order == "desc":
            query = query.order_by(sort_column.desc())
        else:
            query = query.order_by(sort_column.asc())

        # Pagination
        offset = (page - 1) * page_size
        products = query.offset(offset).limit(page_size).all()

        items = []
        for p in products:
            primary_image = next((img.url for img in p.images if img.is_primary), None)
            if not primary_image and p.images:
                primary_image = p.images[0].url

            items.append(ProductListResponse(
                id=p.id,
                sku=p.sku,
                name=p.name,
                slug=p.slug,
                short_description=p.short_description,
                base_price=p.base_price,
                compare_at_price=p.compare_at_price,
                status=p.status,
                is_featured=p.is_featured,
                primary_image=primary_image,
                category_names=[c.name for c in p.categories],
            ))

        return PaginatedProductsResponse(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=math.ceil(total / page_size) if total > 0 else 1,
        )

    def get_featured_products(self, limit: int = 8) -> list[ProductListResponse]:
        products = self.db.query(Product).options(
            joinedload(Product.images),
            joinedload(Product.categories),
        ).filter(
            Product.status == ProductStatus.ACTIVE,
            Product.is_featured == True,
        ).limit(limit).all()

        items = []
        for p in products:
            primary_image = next((img.url for img in p.images if img.is_primary), None)
            if not primary_image and p.images:
                primary_image = p.images[0].url

            items.append(ProductListResponse(
                id=p.id,
                sku=p.sku,
                name=p.name,
                slug=p.slug,
                short_description=p.short_description,
                base_price=p.base_price,
                compare_at_price=p.compare_at_price,
                status=p.status,
                is_featured=p.is_featured,
                primary_image=primary_image,
                category_names=[c.name for c in p.categories],
            ))

        return items

    def get_product_by_slug(self, slug: str) -> Optional[ProductDetailResponse]:
        product = self.db.query(Product).options(
            joinedload(Product.images),
            joinedload(Product.variants).joinedload(ProductVariant.options),
            joinedload(Product.categories),
            joinedload(Product.reviews),
        ).filter(
            Product.slug == slug,
            Product.status == ProductStatus.ACTIVE,
        ).first()

        if not product:
            return None

        return self._to_detail_response(product)

    def get_product_by_id(self, product_id: UUID) -> Optional[ProductDetailResponse]:
        product = self.db.query(Product).options(
            joinedload(Product.images),
            joinedload(Product.variants).joinedload(ProductVariant.options),
            joinedload(Product.categories),
        ).filter(Product.id == product_id).first()

        if not product:
            return None

        return self._to_detail_response(product)

    def _to_detail_response(self, product: Product) -> ProductDetailResponse:
        reviews = [r for r in product.reviews if r.is_approved]
        avg_rating = sum(r.rating for r in reviews) / len(reviews) if reviews else None

        return ProductDetailResponse(
            id=product.id,
            sku=product.sku,
            name=product.name,
            slug=product.slug,
            description=product.description,
            short_description=product.short_description,
            base_price=product.base_price,
            compare_at_price=product.compare_at_price,
            status=product.status,
            is_featured=product.is_featured,
            is_taxable=product.is_taxable,
            weight=product.weight,
            meta_title=product.meta_title,
            meta_description=product.meta_description,
            images=product.images,
            variants=product.variants,
            categories=product.categories,
            average_rating=avg_rating,
            review_count=len(reviews),
        )

    def create_product(self, data: ProductCreateRequest) -> ProductDetailResponse:
        product = Product(
            sku=data.sku,
            name=data.name,
            slug=data.slug,
            description=data.description,
            short_description=data.short_description,
            base_price=data.base_price,
            compare_at_price=data.compare_at_price,
            cost_price=data.cost_price,
            status=data.status,
            is_featured=data.is_featured,
            is_taxable=data.is_taxable,
        )

        if data.category_ids:
            categories = self.db.query(Category).filter(
                Category.id.in_(data.category_ids)
            ).all()
            product.categories = categories

        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)

        return self._to_detail_response(product)

    def update_product(self, product_id: UUID, data: ProductUpdateRequest) -> Optional[ProductDetailResponse]:
        product = self.db.query(Product).filter(Product.id == product_id).first()
        if not product:
            return None

        update_data = data.model_dump(exclude_unset=True)

        if "category_ids" in update_data:
            category_ids = update_data.pop("category_ids")
            if category_ids is not None:
                categories = self.db.query(Category).filter(
                    Category.id.in_(category_ids)
                ).all()
                product.categories = categories

        for key, value in update_data.items():
            setattr(product, key, value)

        self.db.commit()
        self.db.refresh(product)

        return self._to_detail_response(product)

    def delete_product(self, product_id: UUID) -> bool:
        product = self.db.query(Product).filter(Product.id == product_id).first()
        if not product:
            return False

        self.db.delete(product)
        self.db.commit()
        return True

    def update_variant_stock(self, variant_id: UUID, stock: int) -> bool:
        variant = self.db.query(ProductVariant).filter(
            ProductVariant.id == variant_id
        ).first()
        if not variant:
            return False

        variant.stock = stock
        self.db.commit()
        return True
