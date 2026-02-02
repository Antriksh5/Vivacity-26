"""User database models for YouTube clone."""

from sqlalchemy import Column, String, Boolean, DateTime, Enum, Integer, Text
from sqlalchemy import Uuid
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from database import Base


class UserRole(str, enum.Enum):
    USER = "user"
    CREATOR = "creator"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    display_name = Column(String(100), nullable=True)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String(500), nullable=True)
    banner_url = Column(String(500), nullable=True)
    role = Column(Enum(UserRole, values_callable=lambda x: [e.value for e in x]), default=UserRole.USER)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    subscriber_count = Column(Integer, default=0)
    total_views = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    videos = relationship("Video", back_populates="creator", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="user", cascade="all, delete-orphan")
    subscriptions = relationship("Subscription", foreign_keys="[Subscription.subscriber_id]", back_populates="subscriber", cascade="all, delete-orphan")
    subscribers = relationship("Subscription", foreign_keys="[Subscription.channel_id]", back_populates="channel", cascade="all, delete-orphan")
    watch_history = relationship("WatchHistory", back_populates="user", cascade="all, delete-orphan")

    @property
    def channel_name(self) -> str:
        return self.display_name or self.username
