"""Subscription database models for YouTube clone."""

from sqlalchemy import Column, DateTime, ForeignKey, UniqueConstraint, Boolean
from sqlalchemy import Uuid
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from database import Base


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    subscriber_id = Column(Uuid, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    channel_id = Column(Uuid, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    notifications_enabled = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    subscriber = relationship("User", foreign_keys=[subscriber_id], back_populates="subscriptions")
    channel = relationship("User", foreign_keys=[channel_id], back_populates="subscribers")

    __table_args__ = (
        UniqueConstraint('subscriber_id', 'channel_id', name='unique_subscription'),
    )
