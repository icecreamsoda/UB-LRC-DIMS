const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Paths to JSON files
const reservationsFile = path.join(__dirname, 'data/reservations.json');
const feedbackFile = path.join(__dirname, 'data/feedback.json');

// Helpers
function readJSON(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ===== Reservations API =====
app.get('/api/reservations', (req, res) => {
    res.json(readJSON(reservationsFile));
});

app.post('/api/reservations', (req, res) => {
    const reservations = readJSON(reservationsFile);
    reservations.push(req.body);
    writeJSON(reservationsFile, reservations);
    res.json({ status: 'success' });
});

// ===== Update Reservations =====
app.post('/api/reservations/update', (req, res) => {
    const updatedReservations = req.body;
    writeJSON(reservationsFile, updatedReservations);
    res.json({ status: 'success' });
});

// ===== Feedback API =====
app.get('/api/feedback', (req, res) => {
    res.json(readJSON(feedbackFile));
});

app.post('/api/feedback', (req, res) => {
    const feedback = readJSON(feedbackFile);
    feedback.push(req.body);
    writeJSON(feedbackFile, feedback);
    res.json({ status: 'success' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
