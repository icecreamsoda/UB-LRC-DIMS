// ===== Reservations =====
const reservationForm = document.getElementById('reservation-form');
const reservationTable = document.getElementById('reservation-table')?.getElementsByTagName('tbody')[0];

async function loadReservations() {
    if (!reservationTable) return;
    const res = await fetch('/api/reservations');
    const reservations = await res.json();
    reservationTable.innerHTML = '';
    reservations.forEach(r => {
        const row = reservationTable.insertRow();
        row.insertCell(0).textContent = r.name;
        row.insertCell(1).textContent = r.resource;
        row.insertCell(2).textContent = r.date;
        row.insertCell(3).textContent = r.status || 'Pending';
    });
}

if (reservationForm) {
    reservationForm.addEventListener('submit', async e => {
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            resource: document.getElementById('resource').value,
            date: document.getElementById('date').value,
            status: 'Pending'
        };
        await fetch('/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        reservationForm.reset();
        loadReservations();
    });
}

loadReservations();

// ===== Feedback =====
const feedbackForm = document.getElementById('feedback-form');
const feedbackList = document.getElementById('feedback-list');

async function loadFeedback() {
    if (!feedbackList) return;
    const res = await fetch('/api/feedback');
    const feedback = await res.json();
    feedbackList.innerHTML = '';
    feedback.forEach(f => {
        const li = document.createElement('li');
        li.textContent = `${f.name}: ${f.text}`;
        feedbackList.appendChild(li);
    });
}

if (feedbackForm) {
    feedbackForm.addEventListener('submit', async e => {
        e.preventDefault();
        const data = {
            name: document.getElementById('user-name').value,
            text: document.getElementById('feedback-text').value
        };
        await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        feedbackForm.reset();
        loadFeedback();
    });
}

loadFeedback();
