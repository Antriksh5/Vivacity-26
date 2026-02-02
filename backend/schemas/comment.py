"""Comment schemas for YouTube clone."""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class CommentAuthor(BaseModel):
    id: UUID
    username: str
    display_name: Optional[str] = None
    avatar_url: Optional[str] = None

    class Config:
        from_attributes = True


class CommentCreate(BaseModel):
    content: str = Field(..., min_length=1, max_length=5000)
    parent_id: Optional[UUID] = None


class CommentUpdate(BaseModel):
    content: str = Field(..., min_length=1, max_length=5000)


class CommentResponse(BaseModel):
    id: UUID
    video_id: UUID
    content: str
    like_count: int = 0
    dislike_count: int = 0
    reply_count: int = 0
    is_pinned: bool = False
    is_edited: bool = False
    created_at: datetime
    updated_at: datetime
    author: CommentAuthor
    parent_id: Optional[UUID] = None
    replies: List["CommentResponse"] = []
    user_like_status: Optional[str] = None

    class Config:
        from_attributes = True


class CommentListResponse(BaseModel):
    comments: List[CommentResponse]
    total: int
    page: int
    per_page: int
    has_next: bool
