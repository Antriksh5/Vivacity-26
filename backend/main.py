"""Main FastAPI application for YouTube Clone API."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings

# Import all models to ensure they are registered with SQLAlchemy
from models.user import User, UserRole
from models.video import Video, VideoStatus, VideoCategory
from models.comment import Comment
from models.like import Like, LikeType, LikeTargetType
from models.subscription import Subscription
from models.watch_history import WatchHistory

# Routes
from routes.health import router as health_router
from routes.auth import router as auth_router
from routes.videos import router as videos_router
from routes.comments import router as comments_router
from routes.likes import router as likes_router
from routes.subscriptions import router as subscriptions_router
from routes.channels import router as channels_router
from routes.search import router as search_router
from routes.events import router as events_router
from routes.popup import router as popup_router

app = FastAPI(
    title="YouTube Clone API",
    version="1.0.0",
    description="A full-featured YouTube clone API with videos, comments, likes, and subscriptions"
)

# ... (startup event)

# ... (CORS config)

# ... (Other routers)

# Events routes (admin panel)
app.include_router(events_router, tags=["events"])
app.include_router(popup_router, tags=["popup"])


@app.on_event("startup")
async def startup_event():
    """Initialize database and seed sample data."""
    from database import engine, Base, SessionLocal
    from models.user import User, UserRole
    from models.video import Video, VideoStatus, VideoCategory
    from models.comment import Comment
    from services.auth import get_password_hash
    from datetime import datetime, timedelta
    import random

    # Create tables
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if already seeded
        admin = db.query(User).filter(User.email == "admin@youtube.com").first()
        if admin:
            print("Database already seeded!")
            return

        # Create sample users
        users_data = [
            {
                "email": "admin@youtube.com",
                "username": "admin",
                "display_name": "Admin User",
                "role": UserRole.ADMIN,
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
                "bio": "Platform administrator"
            },
            {
                "email": "techguru@youtube.com",
                "username": "TechGuru",
                "display_name": "Tech Guru",
                "role": UserRole.CREATOR,
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=techguru",
                "banner_url": "https://picsum.photos/seed/tech/1280/320",
                "bio": "Your daily dose of tech news and tutorials!",
                "is_verified": True,
                "subscriber_count": 125000
            },
            {
                "email": "musicmaster@youtube.com",
                "username": "MusicMaster",
                "display_name": "Music Master",
                "role": UserRole.CREATOR,
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=music",
                "banner_url": "https://picsum.photos/seed/music/1280/320",
                "bio": "Original music and covers. New uploads every week!",
                "is_verified": True,
                "subscriber_count": 89000
            },
            {
                "email": "gamingpro@youtube.com",
                "username": "GamingPro",
                "display_name": "Gaming Pro",
                "role": UserRole.CREATOR,
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=gaming",
                "banner_url": "https://picsum.photos/seed/gaming/1280/320",
                "bio": "Pro gamer sharing tips, tricks, and epic moments!",
                "is_verified": True,
                "subscriber_count": 250000
            },
            {
                "email": "cookingjoy@youtube.com",
                "username": "CookingJoy",
                "display_name": "Cooking Joy",
                "role": UserRole.CREATOR,
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=cooking",
                "banner_url": "https://picsum.photos/seed/cooking/1280/320",
                "bio": "Easy and delicious recipes for everyone!",
                "subscriber_count": 45000
            },
            {
                "email": "travelvibes@youtube.com",
                "username": "TravelVibes",
                "display_name": "Travel Vibes",
                "role": UserRole.CREATOR,
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=travel",
                "banner_url": "https://picsum.photos/seed/travel/1280/320",
                "bio": "Exploring the world one destination at a time!",
                "subscriber_count": 67000
            },
            {
                "email": "user@youtube.com",
                "username": "RegularUser",
                "display_name": "Regular User",
                "role": UserRole.USER,
                "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
                "bio": "Just a regular viewer"
            }
        ]

        users = {}
        for user_data in users_data:
            user = User(
                email=user_data["email"],
                username=user_data["username"],
                hashed_password=get_password_hash("password123"),
                display_name=user_data["display_name"],
                role=user_data["role"],
                avatar_url=user_data.get("avatar_url"),
                banner_url=user_data.get("banner_url"),
                bio=user_data.get("bio"),
                is_verified=user_data.get("is_verified", False),
                subscriber_count=user_data.get("subscriber_count", 0),
                is_active=True
            )
            db.add(user)
            db.flush()
            users[user_data["username"]] = user

        # Sample video data with real-looking thumbnails
        videos_data = [
            # Tech videos
            {
                "creator": "TechGuru",
                "title": "iPhone 16 Pro Review - Is It Worth It?",
                "description": "Full review of the new iPhone 16 Pro. We test the camera, battery, performance and more!",
                "category": VideoCategory.TECHNOLOGY,
                "duration": 845,
                "view_count": 1250000,
                "like_count": 45000,
                "comment_count": 2300,
                "tags": "iphone,apple,tech,review",
                "is_featured": True
            },
            {
                "creator": "TechGuru",
                "title": "Best Laptops of 2024 - Ultimate Buying Guide",
                "description": "Complete guide to the best laptops for every budget and use case.",
                "category": VideoCategory.TECHNOLOGY,
                "duration": 1230,
                "view_count": 890000,
                "like_count": 32000,
                "comment_count": 1500,
                "tags": "laptop,tech,guide,2024"
            },
            {
                "creator": "TechGuru",
                "title": "How to Build a Gaming PC in 2024",
                "description": "Step by step guide to building your own gaming PC.",
                "category": VideoCategory.HOWTO,
                "duration": 1820,
                "view_count": 2100000,
                "like_count": 98000,
                "comment_count": 4200,
                "tags": "pc,gaming,build,tutorial",
                "is_featured": True
            },
            # Music videos
            {
                "creator": "MusicMaster",
                "title": "Peaceful Piano - Study Music",
                "description": "Relaxing piano music perfect for studying or working.",
                "category": VideoCategory.MUSIC,
                "duration": 3600,
                "view_count": 5600000,
                "like_count": 120000,
                "comment_count": 3400,
                "tags": "piano,study,music,relax",
                "is_featured": True
            },
            {
                "creator": "MusicMaster",
                "title": "Epic Orchestral Music Mix",
                "description": "1 hour of epic orchestral music for motivation.",
                "category": VideoCategory.MUSIC,
                "duration": 3720,
                "view_count": 3200000,
                "like_count": 89000,
                "comment_count": 2100,
                "tags": "orchestra,epic,music,motivation"
            },
            # Gaming videos
            {
                "creator": "GamingPro",
                "title": "Fortnite Season 5 - First Win!",
                "description": "My first win in the new Fortnite season. Epic gameplay!",
                "category": VideoCategory.GAMING,
                "duration": 1200,
                "view_count": 4500000,
                "like_count": 180000,
                "comment_count": 8900,
                "tags": "fortnite,gaming,win,season5",
                "is_featured": True
            },
            {
                "creator": "GamingPro",
                "title": "Minecraft Survival - Day 100",
                "description": "What happens when you survive 100 days in Minecraft hardcore mode.",
                "category": VideoCategory.GAMING,
                "duration": 2400,
                "view_count": 8900000,
                "like_count": 350000,
                "comment_count": 15000,
                "tags": "minecraft,survival,hardcore,100days"
            },
            {
                "creator": "GamingPro",
                "title": "GTA 6 Trailer Breakdown",
                "description": "Everything you missed in the GTA 6 trailer!",
                "category": VideoCategory.GAMING,
                "duration": 950,
                "view_count": 12000000,
                "like_count": 520000,
                "comment_count": 45000,
                "tags": "gta6,rockstar,trailer,analysis"
            },
            # Cooking videos
            {
                "creator": "CookingJoy",
                "title": "Perfect Homemade Pizza Recipe",
                "description": "Learn how to make restaurant-quality pizza at home!",
                "category": VideoCategory.HOWTO,
                "duration": 720,
                "view_count": 1800000,
                "like_count": 67000,
                "comment_count": 3200,
                "tags": "pizza,cooking,recipe,homemade"
            },
            {
                "creator": "CookingJoy",
                "title": "5 Minute Breakfast Ideas",
                "description": "Quick and healthy breakfast recipes for busy mornings.",
                "category": VideoCategory.HOWTO,
                "duration": 480,
                "view_count": 2400000,
                "like_count": 92000,
                "comment_count": 4100,
                "tags": "breakfast,quick,healthy,recipe"
            },
            # Travel videos
            {
                "creator": "TravelVibes",
                "title": "Japan Travel Guide 2024",
                "description": "Everything you need to know before visiting Japan.",
                "category": VideoCategory.TRAVEL,
                "duration": 1800,
                "view_count": 3100000,
                "like_count": 145000,
                "comment_count": 6700,
                "tags": "japan,travel,guide,2024",
                "is_featured": True
            },
            {
                "creator": "TravelVibes",
                "title": "Hidden Gems of Europe",
                "description": "10 underrated destinations in Europe you must visit.",
                "category": VideoCategory.TRAVEL,
                "duration": 1560,
                "view_count": 1900000,
                "like_count": 78000,
                "comment_count": 3800,
                "tags": "europe,travel,hidden,destinations"
            }
        ]

        video_objects = []
        for i, video_data in enumerate(videos_data):
            creator = users[video_data["creator"]]
            # Generate thumbnail URLs using picsum
            thumbnail_url = f"https://picsum.photos/seed/video{i}/640/360"
            # Use sample video URL
            video_url = f"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"

            video = Video(
                creator_id=creator.id,
                title=video_data["title"],
                description=video_data["description"],
                thumbnail_url=thumbnail_url,
                video_url=video_url,
                duration=video_data["duration"],
                view_count=video_data["view_count"],
                like_count=video_data["like_count"],
                comment_count=video_data["comment_count"],
                category=video_data["category"],
                tags=video_data["tags"],
                status=VideoStatus.PUBLISHED,
                is_featured=video_data.get("is_featured", False),
                published_at=datetime.utcnow() - timedelta(days=random.randint(1, 60))
            )
            db.add(video)
            db.flush()
            video_objects.append(video)

            # Update creator's total views
            creator.total_views += video_data["view_count"]

        # Add sample comments
        sample_comments = [
            "Great video! Very informative.",
            "Thanks for sharing this!",
            "Love your content, keep it up!",
            "This is exactly what I was looking for.",
            "Amazing quality as always!",
            "Subscribed! Can't wait for more.",
            "Best explanation I've seen on this topic.",
            "You deserve more views!",
            "Finally someone explains this properly.",
            "Watching this at 3am, no regrets."
        ]

        regular_user = users["RegularUser"]
        for video in video_objects[:5]:  # Add comments to first 5 videos
            for _ in range(3):
                comment = Comment(
                    video_id=video.id,
                    user_id=regular_user.id,
                    content=random.choice(sample_comments)
                )
                db.add(comment)

        db.commit()
        print("Database seeded successfully with YouTube clone data!")
    except Exception as e:
        print(f"Seed error: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()


# CORS configuration
origins = settings.cors_origins.split(",") if settings.cors_origins else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
app.include_router(health_router)

# Auth routes
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# Video routes
app.include_router(videos_router, tags=["videos"])

# Comment routes
app.include_router(comments_router, tags=["comments"])

# Like routes
app.include_router(likes_router, tags=["likes"])

# Subscription routes
app.include_router(subscriptions_router, tags=["subscriptions"])

# Channel routes
app.include_router(channels_router, tags=["channels"])

# Search routes
app.include_router(search_router, tags=["search"])

# Events routes (admin panel)
app.include_router(events_router, tags=["events"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to YouTube Clone API",
        "version": "1.0.0",
        "docs": "/docs"
    }
