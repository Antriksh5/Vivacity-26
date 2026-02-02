"""Watch history database models for YouTube clone."""

from sqlalchemy import Column, DateTime, ForeignKey, Integer, UniqueConstraint
from sqlalchemy import Uuid
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from database import Base


class WatchHistory(Base):
    __tablename__ = "watch_history"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    video_id = Column(Uuid, ForeignKey("videos.id", ondelete="CASCADE"), nullable=False)
    watch_time = Column(Integer, default=0)
    completed = Column(Integer, default=0)
    watched_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User")
    video = relationship("Video")

    __table_args__ = (
        UniqueConstraint('user_id', 'video_id', name='unique_watch_history'),
    )
