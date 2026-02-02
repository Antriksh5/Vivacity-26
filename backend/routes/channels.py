"""Channel routes for YouTube clone."""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc
from typing import Optional
from uuid import UUID

from database import get_db
from models.user import User
from models.video import Video, VideoStatus
from models.subscription import Subscription
from schemas.channel import ChannelResponse, ChannelSearchResponse
from schemas.video import VideoListResponse, CreatorInfo, VideoResponse
from services.auth import get_current_user_optional

router = APIRouter()


def channel_to_response(user: User, current_user: Optional[User] = None, db: Session = None) -> ChannelResponse:
    """Convert user to channel response."""
    is_subscribed = False
    video_count = 0
    
    if db:
        video_count = db.query(Video).filter(
            Video.creator_id == user.id,
            Video.status == VideoStatus.PUBLISHED
        ).count()
        
        if current_user:
            sub = db.query(Subscription).filter(
                Subscription.subscriber_id == current_user.id,
                Subscription.channel_id == user.id
            ).first()
            is_subscribed = sub is not None
    
    return ChannelResponse(
        id=user.id,
        username=user.username,
        display_name=user.display_name,
        bio=user.bio,
        avatar_url=user.avatar_url,
        banner_url=user.banner_url,
        is_verified=user.is_verified,
        subscriber_count=user.subscriber_count,
        total_views=user.total_views,
        video_count=video_count,
        created_at=user.created_at,
        is_subscribed=is_subscribed
    )


@router.get("/channels/{channel_id}", response_model=ChannelResponse)
async def get_channel(
    channel_id: UUID,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get channel information."""
    channel = db.query(User).filter(User.id == channel_id).first()
    
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    return channel_to_response(channel, current_user, db)


@router.get("/channels/username/{username}", response_model=ChannelResponse)
async def get_channel_by_username(
    username: str,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get channel by username."""
    channel = db.query(User).filter(User.username == username).first()
    
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    return channel_to_response(channel, current_user, db)


@router.get("/channels/{channel_id}/videos", response_model=VideoListResponse)
async def get_channel_videos(
    channel_id: UUID,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=50),
    sort: str = Query("newest", regex="^(newest|oldest|popular)$"),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get videos from a channel."""
    channel = db.query(User).filter(User.id == channel_id).first()
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    query = db.query(Video).filter(
        Video.creator_id == channel_id,
        Video.status == VideoStatus.PUBLISHED
    )
    
    if sort == "newest":
        query = query.order_by(desc(Video.created_at))
    elif sort == "oldest":
        query = query.order_by(Video.created_at)
    else:  # popular
        query = query.order_by(desc(Video.view_count))
    
    total = query.count()
    videos = query.offset((page - 1) * per_page).limit(per_page).all()
    
    # Check subscription status
    is_subscribed = False
    if current_user:
        sub = db.query(Subscription).filter(
            Subscription.subscriber_id == current_user.id,
            Subscription.channel_id == channel_id
        ).first()
        is_subscribed = sub is not None
    
    video_responses = []
    for video in videos:
        creator_info = CreatorInfo(
            id=channel.id,
            username=channel.username,
            display_name=channel.display_name,
            avatar_url=channel.avatar_url,
            subscriber_count=channel.subscriber_count,
            is_verified=channel.is_verified
        )
        video_responses.append(VideoResponse(
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
            creator=creator_info,
            is_subscribed=is_subscribed
        ))
    
    return VideoListResponse(
        videos=video_responses,
        total=total,
        page=page,
        per_page=per_page,
        has_next=page * per_page < total
    )


@router.get("/channels/search", response_model=ChannelSearchResponse)
async def search_channels(
    q: str = Query(..., min_length=1),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Search for channels."""
    channels = db.query(User).filter(
        or_(
            User.username.ilike(f"%{q}%"),
            User.display_name.ilike(f"%{q}%")
        )
    ).order_by(desc(User.subscriber_count)).limit(limit).all()
    
    return ChannelSearchResponse(
        channels=[channel_to_response(c, current_user, db) for c in channels],
        total=len(channels)
    )
