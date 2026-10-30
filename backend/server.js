const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const eventsRouter = require('./routes/events');
const popupRouter = require('./routes/popup');

// Match the .env.local file used for this handoff; allow .env as a fallback.
dotenv.config({ path: require('path').join(__dirname, '.env.local') });
dotenv.config({ path: require('path').join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/events', eventsRouter);
app.use('/popup', popupRouter);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Root
app.get('/', (req, res) => {
    res.json({
        message: "Vivacity 2026 API (Node.js)",
        version: "1.0.0"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
