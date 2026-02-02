"""Subscription routes for YouTube clone."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from database import get_db
from models.user import User
from models.subscription import Subscription
from schemas.subscription import SubscriptionResponse, SubscribedChannel, SubscriptionListResponse
from services.auth import get_current_user

router = APIRouter()


@router.get("/subscriptions", response_model=SubscriptionListResponse)
async def list_subscriptions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's subscriptions."""
    subscriptions = db.query(Subscription).filter(
        Subscription.subscriber_id == current_user.id
    ).all()
    
    result = []
    for sub in subscriptions:
        channel = SubscribedChannel(
            id=sub.channel.id,
            username=sub.channel.username,
            display_name=sub.channel.display_name,
            avatar_url=sub.channel.avatar_url,
            subscriber_count=sub.channel.subscriber_count,
            is_verified=sub.channel.is_verified
        )
        result.append(SubscriptionResponse(
            id=sub.id,
            channel=channel,
            notifications_enabled=sub.notifications_enabled,
            subscribed_at=sub.created_at
        ))
    
    return SubscriptionListResponse(
        subscriptions=result,
        total=len(result)
    )


@router.post("/channels/{channel_id}/subscribe")
async def subscribe(
    channel_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Subscribe to a channel."""
    # Check if channel exists
    channel = db.query(User).filter(User.id == channel_id).first()
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    # Can't subscribe to yourself
    if channel_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot subscribe to yourself"
        )
    
    # Check existing subscription
    existing = db.query(Subscription).filter(
        Subscription.subscriber_id == current_user.id,
        Subscription.channel_id == channel_id
    ).first()
    
    if existing:
        return {"message": "Already subscribed", "subscriber_count": channel.subscriber_count}
    
    # Create subscription
    subscription = Subscription(
        subscriber_id=current_user.id,
        channel_id=channel_id
    )
    db.add(subscription)
    
    # Update subscriber count
    channel.subscriber_count += 1
    
    db.commit()
    
    return {"message": "Subscribed", "subscriber_count": channel.subscriber_count}


@router.delete("/channels/{channel_id}/subscribe")
async def unsubscribe(
    channel_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Unsubscribe from a channel."""
    channel = db.query(User).filter(User.id == channel_id).first()
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    subscription = db.query(Subscription).filter(
        Subscription.subscriber_id == current_user.id,
        Subscription.channel_id == channel_id
    ).first()
    
    if not subscription:
        return {"message": "Not subscribed", "subscriber_count": channel.subscriber_count}
    
    db.delete(subscription)
    channel.subscriber_count = max(0, channel.subscriber_count - 1)
    
    db.commit()
    
    return {"message": "Unsubscribed", "subscriber_count": channel.subscriber_count}


@router.get("/channels/{channel_id}/subscribers")
async def get_subscriber_count(
    channel_id: UUID,
    db: Session = Depends(get_db)
):
    """Get subscriber count for a channel."""
    channel = db.query(User).filter(User.id == channel_id).first()
    if not channel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Channel not found"
        )
    
    return {"subscriber_count": channel.subscriber_count}
