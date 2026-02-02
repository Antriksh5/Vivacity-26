"""Video routes for YouTube clone."""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc, or_
from typing import Optional, List
from uuid import UUID
from datetime import datetime

from database import get_db
from models.user import User
from models.video import Video, VideoStatus, VideoCategory
from models.like import Like, LikeType, LikeTargetType
from models.subscription import Subscription
from schemas.video import VideoCreate, VideoUpdate, VideoResponse, VideoListResponse, CreatorInfo
from services.auth import get_current_user, get_current_user_optional

router = APIRouter()


def video_to_response(video: Video, current_user: Optional[User] = None, db: Session = None) -> VideoResponse:
    """Convert video model to response schema."""
    user_like_status = None
    is_subscribed = False
    
    if current_user and db:
        # Check user's like status
        like = db.query(Like).filter(
            Like.user_id == current_user.id,
            Like.video_id == video.id,
            Like.target_type == LikeTargetType.VIDEO
        ).first()
        if like:
            user_like_status = like.like_type.value
        
        # Check subscription status
        sub = db.query(Subscription).filter(
            Subscription.subscriber_id == current_user.id,
            Subscription.channel_id == video.creator_id
        ).first()
        is_subscribed = sub is not None
    
    creator_info = CreatorInfo(
        id=video.creator.id,
        username=video.creator.username,
        display_name=video.creator.display_name,
        avatar_url=video.creator.avatar_url,
        subscriber_count=video.creator.subscriber_count,
        is_verified=video.creator.is_verified
    )
    
    return VideoResponse(
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
        user_like_status=user_like_status,
        is_subscribed=is_subscribed
    )


@router.get("/videos", response_model=VideoListResponse)
async def list_videos(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=50),
    category: Optional[str] = None,
    search: Optional[str] = None,
    creator_id: Optional[UUID] = None,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """List videos with pagination and filtering."""
    query = db.query(Video).filter(Video.status == VideoStatus.PUBLISHED)
    
    if category:
        try:
            cat_enum = VideoCategory(category)
            query = query.filter(Video.category == cat_enum)
        except ValueError:
            pass
    
    if search:
        query = query.filter(
            or_(
                Video.title.ilike(f"%{search}%"),
                Video.description.ilike(f"%{search}%"),
                Video.tags.ilike(f"%{search}%")
            )
        )
    
    if creator_id:
        query = query.filter(Video.creator_id == creator_id)
    
    total = query.count()
    videos = query.order_by(desc(Video.created_at)).offset((page - 1) * per_page).limit(per_page).all()
    
    return VideoListResponse(
        videos=[video_to_response(v, current_user, db) for v in videos],
        total=total,
        page=page,
        per_page=per_page,
        has_next=page * per_page < total
    )


@router.get("/videos/trending", response_model=VideoListResponse)
async def trending_videos(
    per_page: int = Query(20, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get trending videos (sorted by view count)."""
    videos = db.query(Video).filter(
        Video.status == VideoStatus.PUBLISHED
    ).order_by(desc(Video.view_count)).limit(per_page).all()
    
    return VideoListResponse(
        videos=[video_to_response(v, current_user, db) for v in videos],
        total=len(videos),
        page=1,
        per_page=per_page,
        has_next=False
    )


@router.get("/videos/recommended", response_model=VideoListResponse)
async def recommended_videos(
    per_page: int = Query(20, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get recommended videos."""
    # For simplicity, return featured videos + random popular ones
    videos = db.query(Video).filter(
        Video.status == VideoStatus.PUBLISHED
    ).order_by(desc(Video.is_featured), desc(Video.view_count)).limit(per_page).all()
    
    return VideoListResponse(
        videos=[video_to_response(v, current_user, db) for v in videos],
        total=len(videos),
        page=1,
        per_page=per_page,
        has_next=False
    )


@router.get("/videos/{video_id}", response_model=VideoResponse)
async def get_video(
    video_id: UUID,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get video details."""
    video = db.query(Video).filter(Video.id == video_id).first()
    
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    # Check visibility
    if video.status == VideoStatus.PRIVATE:
        if not current_user or current_user.id != video.creator_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Video not found"
            )
    
    return video_to_response(video, current_user, db)


@router.post("/videos", response_model=VideoResponse, status_code=status.HTTP_201_CREATED)
async def create_video(
    video_data: VideoCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new video."""
    video = Video(
        creator_id=current_user.id,
        title=video_data.title,
        description=video_data.description,
        thumbnail_url=video_data.thumbnail_url,
        video_url=video_data.video_url,
        duration=video_data.duration,
        category=VideoCategory(video_data.category.value),
        tags=video_data.tags,
        status=VideoStatus(video_data.status.value),
        allow_comments=video_data.allow_comments,
        published_at=datetime.utcnow() if video_data.status == "published" else None
    )
    
    db.add(video)
    db.commit()
    db.refresh(video)
    
    return video_to_response(video, current_user, db)


@router.put("/videos/{video_id}", response_model=VideoResponse)
async def update_video(
    video_id: UUID,
    video_data: VideoUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a video (owner only)."""
    video = db.query(Video).filter(Video.id == video_id).first()
    
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    if video.creator_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this video"
        )
    
    if video_data.title is not None:
        video.title = video_data.title
    if video_data.description is not None:
        video.description = video_data.description
    if video_data.thumbnail_url is not None:
        video.thumbnail_url = video_data.thumbnail_url
    if video_data.category is not None:
        video.category = VideoCategory(video_data.category.value)
    if video_data.tags is not None:
        video.tags = video_data.tags
    if video_data.status is not None:
        video.status = VideoStatus(video_data.status.value)
        if video_data.status.value == "published" and not video.published_at:
            video.published_at = datetime.utcnow()
    if video_data.allow_comments is not None:
        video.allow_comments = video_data.allow_comments
    
    db.commit()
    db.refresh(video)
    
    return video_to_response(video, current_user, db)


@router.delete("/videos/{video_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_video(
    video_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a video (owner only)."""
    video = db.query(Video).filter(Video.id == video_id).first()
    
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    if video.creator_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this video"
        )
    
    db.delete(video)
    db.commit()


@router.post("/videos/{video_id}/view")
async def increment_view(
    video_id: UUID,
    db: Session = Depends(get_db)
):
    """Increment video view count."""
    video = db.query(Video).filter(Video.id == video_id).first()
    
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    video.view_count += 1
    video.creator.total_views += 1
    db.commit()
    
    return {"view_count": video.view_count}
