"""Comment routes for YouTube clone."""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional
from uuid import UUID

from database import get_db
from models.user import User
from models.video import Video
from models.comment import Comment
from models.like import Like, LikeType, LikeTargetType
from schemas.comment import CommentCreate, CommentUpdate, CommentResponse, CommentListResponse, CommentAuthor
from services.auth import get_current_user, get_current_user_optional

router = APIRouter()


def comment_to_response(comment: Comment, current_user: Optional[User] = None, db: Session = None, include_replies: bool = False) -> CommentResponse:
    """Convert comment model to response schema."""
    user_like_status = None
    
    if current_user and db:
        like = db.query(Like).filter(
            Like.user_id == current_user.id,
            Like.comment_id == comment.id,
            Like.target_type == LikeTargetType.COMMENT
        ).first()
        if like:
            user_like_status = like.like_type.value
    
    author = CommentAuthor(
        id=comment.user.id,
        username=comment.user.username,
        display_name=comment.user.display_name,
        avatar_url=comment.user.avatar_url
    )
    
    replies = []
    if include_replies and comment.replies:
        replies = [comment_to_response(r, current_user, db, False) for r in comment.replies[:5]]
    
    return CommentResponse(
        id=comment.id,
        video_id=comment.video_id,
        content=comment.content,
        like_count=comment.like_count,
        dislike_count=comment.dislike_count,
        reply_count=comment.reply_count,
        is_pinned=comment.is_pinned,
        is_edited=comment.is_edited,
        created_at=comment.created_at,
        updated_at=comment.updated_at,
        author=author,
        parent_id=comment.parent_id,
        replies=replies,
        user_like_status=user_like_status
    )


@router.get("/videos/{video_id}/comments", response_model=CommentListResponse)
async def list_comments(
    video_id: UUID,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=50),
    sort: str = Query("newest", regex="^(newest|oldest|top)$"),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """List comments for a video."""
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    query = db.query(Comment).filter(
        Comment.video_id == video_id,
        Comment.parent_id == None  # Only top-level comments
    )
    
    if sort == "newest":
        query = query.order_by(desc(Comment.is_pinned), desc(Comment.created_at))
    elif sort == "oldest":
        query = query.order_by(desc(Comment.is_pinned), Comment.created_at)
    else:  # top
        query = query.order_by(desc(Comment.is_pinned), desc(Comment.like_count))
    
    total = query.count()
    comments = query.offset((page - 1) * per_page).limit(per_page).all()
    
    return CommentListResponse(
        comments=[comment_to_response(c, current_user, db, True) for c in comments],
        total=total,
        page=page,
        per_page=per_page,
        has_next=page * per_page < total
    )


@router.post("/videos/{video_id}/comments", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_comment(
    video_id: UUID,
    comment_data: CommentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add a comment to a video."""
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    if not video.allow_comments:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Comments are disabled for this video"
        )
    
    # If replying to a comment, verify parent exists
    if comment_data.parent_id:
        parent = db.query(Comment).filter(
            Comment.id == comment_data.parent_id,
            Comment.video_id == video_id
        ).first()
        if not parent:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Parent comment not found"
            )
    
    comment = Comment(
        video_id=video_id,
        user_id=current_user.id,
        content=comment_data.content,
        parent_id=comment_data.parent_id
    )
    
    db.add(comment)
    
    # Update counts
    video.comment_count += 1
    if comment_data.parent_id:
        parent = db.query(Comment).filter(Comment.id == comment_data.parent_id).first()
        if parent:
            parent.reply_count += 1
    
    db.commit()
    db.refresh(comment)
    
    return comment_to_response(comment, current_user, db)


@router.put("/comments/{comment_id}", response_model=CommentResponse)
async def update_comment(
    comment_id: UUID,
    comment_data: CommentUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a comment (owner only)."""
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
    
    if comment.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to edit this comment"
        )
    
    comment.content = comment_data.content
    comment.is_edited = True
    
    db.commit()
    db.refresh(comment)
    
    return comment_to_response(comment, current_user, db)


@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(
    comment_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a comment (owner only)."""
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
    
    if comment.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this comment"
        )
    
    # Update video comment count
    video = db.query(Video).filter(Video.id == comment.video_id).first()
    if video:
        video.comment_count = max(0, video.comment_count - 1)
    
    # Update parent reply count if this is a reply
    if comment.parent_id:
        parent = db.query(Comment).filter(Comment.id == comment.parent_id).first()
        if parent:
            parent.reply_count = max(0, parent.reply_count - 1)
    
    db.delete(comment)
    db.commit()
