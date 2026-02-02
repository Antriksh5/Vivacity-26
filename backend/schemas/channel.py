"""Channel schemas for YouTube clone."""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class ChannelResponse(BaseModel):
    id: UUID
    username: str
    display_name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    banner_url: Optional[str] = None
    is_verified: bool = False
    subscriber_count: int = 0
    total_views: int = 0
    video_count: int = 0
    created_at: datetime
    is_subscribed: bool = False

    class Config:
        from_attributes = True


class ChannelSearchResponse(BaseModel):
    channels: List[ChannelResponse]
    total: int
