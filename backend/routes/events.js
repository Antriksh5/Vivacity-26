const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const EVENTS_FILE = path.join(__dirname, '../events_store.json');

// Helper to read events
async function readEvents() {
    try {
        const data = await fs.readFile(EVENTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        console.error("Error reading events file:", error);
        return [];
    }
}

// Helper to write events
async function writeEvents(events) {
    try {
        await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2));
    } catch (error) {
        console.error("Error writing events file:", error);
    }
}

// GET all events
router.get('/', async (req, res) => {
    const events = await readEvents();
    res.json(events);
});

// GET active notifications
router.get('/notifications', async (req, res) => {
    const events = await readEvents();
    const notifications = events.filter(e => e.notification_enabled);
    res.json(notifications);
});

// POST create event
router.post('/', async (req, res) => {
    const events = await readEvents();
    const { name, description, time, venue } = req.body;

    if (!name || !description || !time || !venue) {
        return res.status(400).json({ detail: "Missing required fields" });
    }

    const newEvent = {
        id: uuidv4(),
        name,
        description,
        time,
        venue,
        notification_enabled: false,
        created_at: new Date().toISOString()
    };

    events.push(newEvent);
    await writeEvents(events);
    res.status(201).json(newEvent);
});

// PUT update event
router.put('/:id', async (req, res) => {
    const events = await readEvents();
    const { id } = req.params;
    const { name, description, time, venue } = req.body;

    const index = events.findIndex(e => e.id === id);
    if (index === -1) {
        return res.status(404).json({ detail: "Event not found" });
    }

    // Preserve fields that aren't being updated if necessary, but spec implies full update or provided fields
    // Python code updated specific fields: name, description, time, venue
    events[index] = {
        ...events[index],
        name: name || events[index].name,
        description: description || events[index].description,
        time: time || events[index].time,
        venue: venue || events[index].venue
    };

    await writeEvents(events);
    res.json(events[index]);
});

// DELETE event
router.delete('/:id', async (req, res) => {
    const events = await readEvents();
    const { id } = req.params;

    const initialLength = events.length;
    const newEvents = events.filter(e => e.id !== id);

    if (newEvents.length === initialLength) {
        return res.status(404).json({ detail: "Event not found" });
    }

    await writeEvents(newEvents);
    res.status(204).send();
});

// PATCH toggle notification
router.patch('/:id/notification', async (req, res) => {
    const events = await readEvents();
    const { id } = req.params;
    const { notification_enabled } = req.body;

    if (typeof notification_enabled !== 'boolean') {
        return res.status(422).json({ detail: "notification_enabled must be a boolean" });
    }

    const index = events.findIndex(e => e.id === id);
    if (index === -1) {
        return res.status(404).json({ detail: "Event not found" });
    }

    events[index].notification_enabled = notification_enabled;
    await writeEvents(events);
    res.json(events[index]);
});

module.exports = router;
