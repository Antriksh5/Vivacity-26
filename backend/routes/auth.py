"""Authentication routes for YouTube clone."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from database import get_db
from models.user import User
from schemas.auth import UserCreate, UserLogin, UserUpdate, UserResponse, TokenResponse, TokenRefresh
from services.auth import (
    get_password_hash, 
    verify_password, 
    create_access_token, 
    create_refresh_token,
    verify_token,
    get_current_user
)

router = APIRouter()


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user."""
    # Check if email exists
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username exists
    if db.query(User).filter(User.username == user_data.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create user
    user = User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=get_password_hash(user_data.password),
        display_name=user_data.display_name or user_data.username
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Generate tokens
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.model_validate(user)
    )


@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Login and get access token."""
    # Hardcoded allowed emails for Admin Panel
    ALLOWED_EMAILS = [
        "vivacity.admin@lnmiit.ac.in"
    ]
    
    # Hardcoded password
    HARDCODED_PASSWORD = "vivacity26"
    
    if credentials.email not in ALLOWED_EMAILS:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: You are not authorized to access this panel."
        )

    # Verify hardcoded password first
    if credentials.password != HARDCODED_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    user = db.query(User).filter(User.email == credentials.email).first()
    
    if not user:
        # Auto-create the admin user if they don't exist
        user = User(
            email=credentials.email,
            username=credentials.email.split('@')[0],  # Use part before @ as username
            hashed_password=get_password_hash(HARDCODED_PASSWORD),
            display_name="Admin User",
            is_active=True,
            is_verified=True,
            role="admin"
        )
        db.add(user)
        try:
            db.commit()
            db.refresh(user)
        except Exception as e:
            db.rollback()
            # Fallback if username taken or other error
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to auto-create admin account: {str(e)}"
            )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is disabled"
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.model_validate(user)
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(token_data: TokenRefresh, db: Session = Depends(get_db)):
    """Refresh access token."""
    payload = verify_token(token_data.refresh_token, token_type="refresh")
    user_id = payload.get("sub")
    
    user = db.query(User).filter(User.id == UUID(user_id)).first()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserResponse.model_validate(user)
    )


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current user profile."""
    return UserResponse.model_validate(current_user)


@router.put("/me", response_model=UserResponse)
async def update_me(
    user_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update current user profile."""
    if user_data.display_name is not None:
        current_user.display_name = user_data.display_name
    if user_data.bio is not None:
        current_user.bio = user_data.bio
    if user_data.avatar_url is not None:
        current_user.avatar_url = user_data.avatar_url
    if user_data.banner_url is not None:
        current_user.banner_url = user_data.banner_url
    
    db.commit()
    db.refresh(current_user)
    
    return UserResponse.model_validate(current_user)
