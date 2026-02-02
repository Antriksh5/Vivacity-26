"""Like database models for YouTube clone."""

from sqlalchemy import Column, DateTime, Enum, ForeignKey, UniqueConstraint
from sqlalchemy import Uuid
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from database import Base


class LikeType(str, enum.Enum):
    LIKE = "like"
    DISLIKE = "dislike"


class LikeTargetType(str, enum.Enum):
    VIDEO = "video"
    COMMENT = "comment"


class Like(Base):
    __tablename__ = "likes"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    video_id = Column(Uuid, ForeignKey("videos.id", ondelete="CASCADE"), nullable=True)
    comment_id = Column(Uuid, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True)
    like_type = Column(Enum(LikeType, values_callable=lambda x: [e.value for e in x]), nullable=False)
    target_type = Column(Enum(LikeTargetType, values_callable=lambda x: [e.value for e in x]), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="likes")
    video = relationship("Video", back_populates="likes")

    __table_args__ = (
        UniqueConstraint('user_id', 'video_id', 'target_type', name='unique_video_like'),
    )
