"""Stripe integration service."""

import stripe
from typing import Optional
from decimal import Decimal

from config import settings
from models.cart import Cart


class StripeService:
    def __init__(self):
        stripe.api_key = settings.STRIPE_SECRET_KEY

    async def create_checkout_session(
        self,
        cart: Cart,
        customer_email: str,
        success_url: str,
        cancel_url: str,
    ):
        """Create Stripe Checkout session."""
        line_items = []

        for item in cart.items:
            variant = item.variant
            product = variant.product

            line_items.append({
                "price_data": {
                    "currency": cart.currency.lower(),
                    "unit_amount": int(item.unit_price * 100),  # Convert to cents
                    "product_data": {
                        "name": f"{product.name} - {variant.name}",
                        "description": product.short_description or "",
                    },
                },
                "quantity": item.quantity,
            })

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url=success_url,
            cancel_url=cancel_url,
            customer_email=customer_email,
            metadata={
                "cart_id": str(cart.id),
                "user_id": str(cart.user_id) if cart.user_id else "",
            },
        )

        return session

    async def create_payment_intent(
        self,
        amount: int,
        currency: str = "usd",
        metadata: Optional[dict] = None,
    ):
        """Create Payment Intent for custom checkout."""
        return stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            metadata=metadata or {},
        )

    def construct_webhook_event(self, payload: bytes, signature: str):
        """Construct and verify webhook event."""
        return stripe.Webhook.construct_event(
            payload,
            signature,
            settings.STRIPE_WEBHOOK_SECRET,
        )

    async def process_refund(
        self,
        payment_intent_id: str,
        amount: Optional[int] = None,
        reason: Optional[str] = None,
    ):
        """Process refund for a payment."""
        refund_params = {"payment_intent": payment_intent_id}

        if amount:
            refund_params["amount"] = amount

        if reason:
            refund_params["reason"] = reason

        return stripe.Refund.create(**refund_params)
