"""Video schemas for YouTube clone."""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from enum import Enum


class VideoCategory(str, Enum):
    MUSIC = "music"
    GAMING = "gaming"
    EDUCATION = "education"
    ENTERTAINMENT = "entertainment"
    SPORTS = "sports"
    NEWS = "news"
    TECHNOLOGY = "technology"
    HOWTO = "howto"
    COMEDY = "comedy"
    FILM = "film"
    AUTOS = "autos"
    PETS = "pets"
    PEOPLE = "people"
    TRAVEL = "travel"
    OTHER = "other"


class VideoStatus(str, Enum):
    PROCESSING = "processing"
    PUBLISHED = "published"
    PRIVATE = "private"
    UNLISTED = "unlisted"


class CreatorInfo(BaseModel):
    id: UUID
    username: str
    display_name: Optional[str] = None
    avatar_url: Optional[str] = None
    subscriber_count: int = 0
    is_verified: bool = False

    class Config:
        from_attributes = True


class VideoCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    video_url: str
    duration: int = 0
    category: VideoCategory = VideoCategory.OTHER
    tags: Optional[str] = None
    status: VideoStatus = VideoStatus.PUBLISHED
    allow_comments: bool = True


class VideoUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    category: Optional[VideoCategory] = None
    tags: Optional[str] = None
    status: Optional[VideoStatus] = None
    allow_comments: Optional[bool] = None


class VideoResponse(BaseModel):
    id: UUID
    title: str
    description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    video_url: str
    duration: int = 0
    view_count: int = 0
    like_count: int = 0
    dislike_count: int = 0
    comment_count: int = 0
    category: str
    tags: Optional[str] = None
    status: str
    allow_comments: bool = True
    created_at: datetime
    published_at: Optional[datetime] = None
    creator: CreatorInfo
    user_like_status: Optional[str] = None
    is_subscribed: bool = False

    class Config:
        from_attributes = True


class VideoListResponse(BaseModel):
    videos: List[VideoResponse]
    total: int
    page: int
    per_page: int
    has_next: bool
