"""Comment database models for YouTube clone."""

from sqlalchemy import Column, DateTime, Integer, Text, ForeignKey, Boolean
from sqlalchemy import Uuid
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from database import Base


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    video_id = Column(Uuid, ForeignKey("videos.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Uuid, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    parent_id = Column(Uuid, ForeignKey("comments.id", ondelete="CASCADE"), nullable=True)
    content = Column(Text, nullable=False)
    like_count = Column(Integer, default=0)
    dislike_count = Column(Integer, default=0)
    reply_count = Column(Integer, default=0)
    is_pinned = Column(Boolean, default=False)
    is_edited = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    video = relationship("Video", back_populates="comments")
    user = relationship("User", back_populates="comments")
    parent = relationship("Comment", remote_side=[id], backref="replies")
