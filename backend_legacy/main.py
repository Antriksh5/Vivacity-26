"""Main FastAPI application for Vivacity 2026 Admin Panel."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings

# Routes
from routes.health import router as health_router
from routes.events import router as events_router
from routes.popup import router as popup_router

app = FastAPI(
    title="Vivacity 2026 API",
    version="1.0.0",
    description="API for Vivacity 2026 Admin Panel"
)

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

# Events routes (admin panel)
app.include_router(events_router, tags=["events"])
app.include_router(popup_router, tags=["popup"])


@app.get("/")
async def root():
    return {
        "message": "Vivacity 2026 API",
        "version": "1.0.0",
        "docs": "/docs"
    }
