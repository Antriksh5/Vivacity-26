"""Search routes for YouTube clone."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc
from typing import Optional, List
from pydantic import BaseModel

from database import get_db
from models.user import User
from models.video import Video, VideoStatus
from schemas.video import VideoResponse, CreatorInfo
from schemas.channel import ChannelResponse
from services.auth import get_current_user_optional

router = APIRouter()


class SearchResult(BaseModel):
    videos: List[VideoResponse]
    channels: List[ChannelResponse]
    video_count: int
    channel_count: int


@router.get("/search", response_model=SearchResult)
async def search(
    q: str = Query(..., min_length=1),
    type: Optional[str] = Query(None, regex="^(video|channel|all)$"),
    category: Optional[str] = None,
    sort: str = Query("relevance", regex="^(relevance|date|views)$"),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Search videos and channels."""
    videos = []
    channels = []
    video_count = 0
    channel_count = 0
    
    search_type = type or "all"
    
    # Search videos
    if search_type in ["video", "all"]:
        video_query = db.query(Video).filter(
            Video.status == VideoStatus.PUBLISHED,
            or_(
                Video.title.ilike(f"%{q}%"),
                Video.description.ilike(f"%{q}%"),
                Video.tags.ilike(f"%{q}%")
            )
        )
        
        if category:
            video_query = video_query.filter(Video.category == category)
        
        if sort == "date":
            video_query = video_query.order_by(desc(Video.created_at))
        elif sort == "views":
            video_query = video_query.order_by(desc(Video.view_count))
        else:  # relevance - prioritize title matches
            video_query = video_query.order_by(desc(Video.view_count))
        
        video_count = video_query.count()
        video_results = video_query.offset((page - 1) * per_page).limit(per_page).all()
        
        for video in video_results:
            creator_info = CreatorInfo(
                id=video.creator.id,
                username=video.creator.username,
                display_name=video.creator.display_name,
                avatar_url=video.creator.avatar_url,
                subscriber_count=video.creator.subscriber_count,
                is_verified=video.creator.is_verified
            )
            videos.append(VideoResponse(
                id=video.id,
                title=video.title,
                description=video.description,
                thumbnail_url=video.thumbnail_url,
                video_url=video.video_url,
                duration=video.duration,
                view_count=video.view_count,
                like_count=video.like_count,
                dislike_count=video.dislike_count,
                comment_count=video.comment_count,
                category=video.category.value if video.category else "other",
                tags=video.tags,
                status=video.status.value if video.status else "published",
                allow_comments=video.allow_comments,
                created_at=video.created_at,
                published_at=video.published_at,
                creator=creator_info
            ))
    
    # Search channels
    if search_type in ["channel", "all"]:
        channel_query = db.query(User).filter(
            or_(
                User.username.ilike(f"%{q}%"),
                User.display_name.ilike(f"%{q}%")
            )
        ).order_by(desc(User.subscriber_count))
        
        channel_count = channel_query.count()
        channel_results = channel_query.limit(10 if search_type == "all" else per_page).all()
        
        for channel in channel_results:
            video_count_for_channel = db.query(Video).filter(
                Video.creator_id == channel.id,
                Video.status == VideoStatus.PUBLISHED
            ).count()
            
            channels.append(ChannelResponse(
                id=channel.id,
                username=channel.username,
                display_name=channel.display_name,
                bio=channel.bio,
                avatar_url=channel.avatar_url,
                banner_url=channel.banner_url,
                is_verified=channel.is_verified,
                subscriber_count=channel.subscriber_count,
                total_views=channel.total_views,
                video_count=video_count_for_channel,
                created_at=channel.created_at
            ))
    
    return SearchResult(
        videos=videos,
        channels=channels,
        video_count=video_count,
        channel_count=channel_count
    )
