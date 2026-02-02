from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
import os
from threading import Lock

router = APIRouter()

POPUP_FILE = "popup_store.json"
_file_lock = Lock()

class PopupConfig(BaseModel):
    title: str
    message: str
    isVisible: bool
    eventName: str = ""
    eventDescription: str = ""
    date: str = ""
    time: str = ""
    venue: str = ""

def _read_config() -> dict:
    with _file_lock:
        if not os.path.exists(POPUP_FILE):
            # Default config
            return {
                "title": "Welcome onto the Board!",
                "message": "We're excited to have you here at Vivacity '26. Explore our events, team, and legacy.",
                "isVisible": True,
                "eventName": "Vivacity 2026",
                "eventDescription": "Join us for the biggest cultural fest!",
                "date": "2026-02-15",
                "time": "10:00 AM",
                "venue": "LNMIIT Campus"
            }
        try:
            with open(POPUP_FILE, "r") as f:
                data = json.load(f)
                # Ensure new fields exist in old files
                if "eventName" not in data: data["eventName"] = ""
                if "eventDescription" not in data: data["eventDescription"] = ""
                if "date" not in data: data["date"] = ""
                if "time" not in data: data["time"] = ""
                if "venue" not in data: data["venue"] = ""
                return data
        except:
            return {
                "title": "Welcome onto the Board!",
                "message": "We're excited to have you here at Vivacity '26. Explore our events, team, and legacy.",
                "isVisible": True,
                "eventName": "Vivacity 2026",
                "eventDescription": "Join us for the biggest cultural fest!",
                "date": "2026-02-15",
                "time": "10:00 AM",
                "venue": "LNMIIT Campus"
            }

def _write_config(config: dict):
    with _file_lock:
        with open(POPUP_FILE, "w") as f:
            json.dump(config, f)

@router.get("/popup")
async def get_popup_config():
    return _read_config()

@router.post("/popup")
async def update_popup_config(config: PopupConfig):
    _write_config(config.dict())
    return config
