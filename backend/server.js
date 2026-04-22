// backend/ server.js
// StAuth10244: I Mahtabin Tushi, 000952184 certify that this material is my original work.
// No other person's work has been used without due acknowledgement. I have not made my work available 
// to anyone else.

const express = require('express');
const { createClient } = require('redis');

const app = express();
const PORT = 3001;

// Middleware to parse JSON body
app.use(express.json());

// Create Redis client
const redisClient = createClient();

// Handle Redis errors
redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Connect to Redis
(async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis");
    } catch (err) {
        console.error("Redis connection failed:", err);
    }
})();


// ==============================
// GET /load → Load todos from Redis
// ==============================
app.get('/load', async (req, res) => {
    try {
        // Get all items from Redis list
        const todos = await redisClient.lRange('todos', 0, -1);

        // Always return an array
        res.json(todos || []);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


// ==============================
// POST /save → Save todos to Redis
// ==============================
app.post('/save', async (req, res) => {
    const todos = req.body;

    // Validate input
    if (!Array.isArray(todos)) {
        return res.status(400).json({
            error: "Request body must be an array"
        });
    }

    try {
        // Remove old todos
        await redisClient.del('todos');

        // Save new todos (optimized)
        if (todos.length > 0) {
            await redisClient.rPush('todos', todos);
        }

        res.json({ status: "Save successful" });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


// ==============================
// GET /clear → Clear all todos
// ==============================
app.get('/clear', async (req, res) => {
    try {
        await redisClient.del('todos');
        res.json({ status: "Clear successful" });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});