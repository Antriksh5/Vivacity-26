const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const POPUP_FILE = path.join(__dirname, '../popup_store.json');

const DEFAULT_CONFIG = {
    title: "Welcome onto the Board!",
    message: "We're excited to have you here at Vivacity '26. Explore our events, team, and legacy.",
    isVisible: true,
    eventName: "Vivacity 2026",
    eventDescription: "Join us for the biggest cultural fest!",
    date: "2026-02-15",
    time: "10:00 AM",
    venue: "LNMIIT Campus"
};

// Helper to read config
async function readConfig() {
    try {
        const data = await fs.readFile(POPUP_FILE, 'utf8');
        const config = JSON.parse(data);
        // Ensure all default fields exist
        return { ...DEFAULT_CONFIG, ...config };
    } catch (error) {
        // If file doesn't exist or error, return default
        return DEFAULT_CONFIG;
    }
}

// Helper to write config
async function writeConfig(config) {
    try {
        await fs.writeFile(POPUP_FILE, JSON.stringify(config, null, 2));
    } catch (error) {
        console.error("Error writing popup file:", error);
    }
}

// GET popup config
router.get('/', async (req, res) => {
    const config = await readConfig();
    res.json(config);
});

// POST update popup config
router.post('/', async (req, res) => {
    const currentConfig = await readConfig();
    const newConfig = { ...currentConfig, ...req.body };

    await writeConfig(newConfig);
    res.json(newConfig);
});

module.exports = router;
