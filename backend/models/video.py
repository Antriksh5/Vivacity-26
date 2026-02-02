"""Video database models for YouTube clone."""

from sqlalchemy import Column, String, Boolean, DateTime, Enum, Integer, Text, ForeignKey
from sqlalchemy import Uuid
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from database import Base


class VideoStatus(str, enum.Enum):
    PROCESSING = "processing"
    PUBLISHED = "published"
    PRIVATE = "private"
    UNLISTED = "unlisted"
    DELETED = "deleted"


class VideoCategory(str, enum.Enum):
    MUSIC = "music"
    GAMING = "gaming"
    EDUCATION = "education"
    ENTERTAINMENT = "entertainment"
    SPORTS = "sports"
    NEWS = "news"
    TECHNOLOGY = "technology"
    HOWTO = "howto"
    COMEDY = "comedy"
    FILM = "film"
    AUTOS = "autos"
    PETS = "pets"
    PEOPLE = "people"
    TRAVEL = "travel"
    OTHER = "other"


class Video(Base):
    __tablename__ = "videos"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    creator_id = Column(Uuid, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    thumbnail_url = Column(String(500), nullable=True)
    video_url = Column(String(500), nullable=False)
    duration = Column(Integer, default=0)
    view_count = Column(Integer, default=0)
    like_count = Column(Integer, default=0)
    dislike_count = Column(Integer, default=0)
    comment_count = Column(Integer, default=0)
    status = Column(Enum(VideoStatus, values_callable=lambda x: [e.value for e in x]), default=VideoStatus.PUBLISHED)
    category = Column(Enum(VideoCategory, values_callable=lambda x: [e.value for e in x]), default=VideoCategory.OTHER)
    tags = Column(String(500), nullable=True)
    is_featured = Column(Boolean, default=False)
    allow_comments = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    published_at = Column(DateTime(timezone=True), server_default=func.now())

    creator = relationship("User", back_populates="videos")
    comments = relationship("Comment", back_populates="video", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="video", cascade="all, delete-orphan")

    @property
    def formatted_duration(self) -> str:
        minutes, seconds = divmod(self.duration, 60)
        hours, minutes = divmod(minutes, 60)
        if hours:
            return f"{hours}:{minutes:02d}:{seconds:02d}"
        return f"{minutes}:{seconds:02d}"
