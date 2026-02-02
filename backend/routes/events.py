"""Events management routes - stores events in a shared JSON file (no database)."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List
import json
import os
import uuid
from datetime import datetime
from threading import Lock

router = APIRouter()

# Shared file for event storage between workers
EVENTS_FILE = "events_store.json"
_file_lock = Lock()


class EventCreate(BaseModel):
    """Schema for creating a new event."""
    name: str = Field(..., min_length=1, max_length=200, description="Event name")
    description: str = Field(..., min_length=1, max_length=2000, description="Event description")
    time: str = Field(..., min_length=1, max_length=100, description="Event time")
    venue: str = Field(..., min_length=1, max_length=300, description="Event venue")


class EventResponse(BaseModel):
    """Schema for event response."""
    id: str
    name: str
    description: str
    time: str
    venue: str
    notification_enabled: bool
    created_at: str


class NotificationToggle(BaseModel):
    """Schema for toggling notification."""
    notification_enabled: bool


def _read_events() -> List[dict]:
    """Read events from shared file."""
    with _file_lock:
        if not os.path.exists(EVENTS_FILE):
            return []
        try:
            with open(EVENTS_FILE, "r") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return []


def _write_events(events: List[dict]) -> None:
    """Write events to shared file."""
    with _file_lock:
        with open(EVENTS_FILE, "w") as f:
            json.dump(events, f)


@router.get("/events", response_model=List[EventResponse])
async def get_events():
    """Get all events."""
    return _read_events()


@router.post("/events", response_model=EventResponse, status_code=201)
async def create_event(event: EventCreate):
    """Create a new event."""
    events = _read_events()
    new_event = {
        "id": str(uuid.uuid4()),
        "name": event.name,
        "description": event.description,
        "time": event.time,
        "venue": event.venue,
        "notification_enabled": False,
        "created_at": datetime.utcnow().isoformat(),
    }
    events.append(new_event)
    _write_events(events)
    return new_event


@router.put("/events/{event_id}", response_model=EventResponse)
async def update_event(event_id: str, event: EventCreate):
    """Update an existing event."""
    events = _read_events()
    for i, stored_event in enumerate(events):
        if stored_event["id"] == event_id:
            events[i]["name"] = event.name
            events[i]["description"] = event.description
            events[i]["time"] = event.time
            events[i]["venue"] = event.venue
            _write_events(events)
            return events[i]
    raise HTTPException(status_code=404, detail="Event not found")


@router.delete("/events/{event_id}", status_code=204)
async def delete_event(event_id: str):
    """Delete an event."""
    events = _read_events()
    for i, stored_event in enumerate(events):
        if stored_event["id"] == event_id:
            events.pop(i)
            _write_events(events)
            return
    raise HTTPException(status_code=404, detail="Event not found")


@router.patch("/events/{event_id}/notification", response_model=EventResponse)
async def toggle_notification(event_id: str, toggle: NotificationToggle):
    """Toggle notification for an event."""
    events = _read_events()
    for i, stored_event in enumerate(events):
        if stored_event["id"] == event_id:
            events[i]["notification_enabled"] = toggle.notification_enabled
            _write_events(events)
            return events[i]
    raise HTTPException(status_code=404, detail="Event not found")


@router.get("/events/notifications", response_model=List[EventResponse])
async def get_active_notifications():
    """Get all events with notifications enabled."""
    events = _read_events()
    return [event for event in events if event["notification_enabled"]]
