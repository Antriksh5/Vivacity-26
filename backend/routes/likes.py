"""Like routes for YouTube clone."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from database import get_db
from models.user import User
from models.video import Video
from models.comment import Comment
from models.like import Like, LikeType, LikeTargetType
from services.auth import get_current_user

router = APIRouter()


@router.post("/videos/{video_id}/like")
async def like_video(
    video_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Like a video."""
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    # Check existing like
    existing = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.video_id == video_id,
        Like.target_type == LikeTargetType.VIDEO
    ).first()
    
    if existing:
        if existing.like_type == LikeType.LIKE:
            return {"message": "Already liked", "like_count": video.like_count, "dislike_count": video.dislike_count}
        else:
            # Change from dislike to like
            existing.like_type = LikeType.LIKE
            video.dislike_count = max(0, video.dislike_count - 1)
            video.like_count += 1
    else:
        # New like
        like = Like(
            user_id=current_user.id,
            video_id=video_id,
            like_type=LikeType.LIKE,
            target_type=LikeTargetType.VIDEO
        )
        db.add(like)
        video.like_count += 1
    
    db.commit()
    
    return {"message": "Liked", "like_count": video.like_count, "dislike_count": video.dislike_count}


@router.post("/videos/{video_id}/dislike")
async def dislike_video(
    video_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Dislike a video."""
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    existing = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.video_id == video_id,
        Like.target_type == LikeTargetType.VIDEO
    ).first()
    
    if existing:
        if existing.like_type == LikeType.DISLIKE:
            return {"message": "Already disliked", "like_count": video.like_count, "dislike_count": video.dislike_count}
        else:
            existing.like_type = LikeType.DISLIKE
            video.like_count = max(0, video.like_count - 1)
            video.dislike_count += 1
    else:
        like = Like(
            user_id=current_user.id,
            video_id=video_id,
            like_type=LikeType.DISLIKE,
            target_type=LikeTargetType.VIDEO
        )
        db.add(like)
        video.dislike_count += 1
    
    db.commit()
    
    return {"message": "Disliked", "like_count": video.like_count, "dislike_count": video.dislike_count}


@router.delete("/videos/{video_id}/like")
async def remove_video_like(
    video_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Remove like or dislike from a video."""
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    existing = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.video_id == video_id,
        Like.target_type == LikeTargetType.VIDEO
    ).first()
    
    if not existing:
        return {"message": "No reaction to remove", "like_count": video.like_count, "dislike_count": video.dislike_count}
    
    if existing.like_type == LikeType.LIKE:
        video.like_count = max(0, video.like_count - 1)
    else:
        video.dislike_count = max(0, video.dislike_count - 1)
    
    db.delete(existing)
    db.commit()
    
    return {"message": "Removed", "like_count": video.like_count, "dislike_count": video.dislike_count}


@router.post("/comments/{comment_id}/like")
async def like_comment(
    comment_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Like a comment."""
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
    
    existing = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.comment_id == comment_id,
        Like.target_type == LikeTargetType.COMMENT
    ).first()
    
    if existing:
        if existing.like_type == LikeType.LIKE:
            return {"message": "Already liked", "like_count": comment.like_count}
        else:
            existing.like_type = LikeType.LIKE
            comment.dislike_count = max(0, comment.dislike_count - 1)
            comment.like_count += 1
    else:
        like = Like(
            user_id=current_user.id,
            comment_id=comment_id,
            like_type=LikeType.LIKE,
            target_type=LikeTargetType.COMMENT
        )
        db.add(like)
        comment.like_count += 1
    
    db.commit()
    
    return {"message": "Liked", "like_count": comment.like_count}


@router.delete("/comments/{comment_id}/like")
async def remove_comment_like(
    comment_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Remove like from a comment."""
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
    
    existing = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.comment_id == comment_id,
        Like.target_type == LikeTargetType.COMMENT
    ).first()
    
    if not existing:
        return {"message": "No reaction to remove", "like_count": comment.like_count}
    
    if existing.like_type == LikeType.LIKE:
        comment.like_count = max(0, comment.like_count - 1)
    else:
        comment.dislike_count = max(0, comment.dislike_count - 1)
    
    db.delete(existing)
    db.commit()
    
    return {"message": "Removed", "like_count": comment.like_count}
