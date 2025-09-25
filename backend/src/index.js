const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
// Use the PORT environment variable, defaulting to 8080
const PORT = process.env.PORT || 8082;

// This is where you would connect to a real database!
// We're logging it to show that the environment variable is being used.
const DATABASE_URL = process.env.DATABASE_URL || "in-memory-db";
console.log(`Connecting to database: ${DATABASE_URL}`);

// In-memory "database"
let notes = [{ id: 1, text: "Hello from the server!" }];

app.use(cors());
app.use(express.json());

// Serve the static frontend files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// API Endpoints
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = { id: Date.now(), text: req.body.text };
    notes.push(newNote);
    res.status(201).json(newNote);
});

// For any other request, serve the React app's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});