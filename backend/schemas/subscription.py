"""Subscription schemas for YouTube clone."""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class SubscribedChannel(BaseModel):
    id: UUID
    username: str
    display_name: Optional[str] = None
    avatar_url: Optional[str] = None
    subscriber_count: int = 0
    is_verified: bool = False

    class Config:
        from_attributes = True


class SubscriptionResponse(BaseModel):
    id: UUID
    channel: SubscribedChannel
    notifications_enabled: bool = True
    subscribed_at: datetime

    class Config:
        from_attributes = True


class SubscriptionListResponse(BaseModel):
    subscriptions: List[SubscriptionResponse]
    total: int
