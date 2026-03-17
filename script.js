const noteHeading = document.getElementById('note-heading');
const noteInput = document.getElementById('note-input');
const addBtn = document.getElementById('add-btn');
const notesContainer = document.getElementById('notes-container');
const searchBar = document.getElementById('search-bar');

// Load notes from local storage [cite: 45]
let notes = JSON.parse(localStorage.getItem('myNotes')) || [];
renderNotes(notes);

// Add Note Logic [cite: 42]
addBtn.addEventListener('click', () => {
    const heading = noteHeading.value.trim();
    const text = noteInput.value.trim();

    if (heading !== "" && text !== "") {
        const newNote = {
            id: Date.now(),
            heading: heading,
            text: text,
            date: new Date().toLocaleString()
        };
        notes.push(newNote);
        saveToLocalStorage();
        renderNotes(notes);
        
        // Clear inputs
        noteHeading.value = "";
        noteInput.value = "";
    } else {
        alert("Nifail, please enter both a heading and a note!");
    }
});

// Search Logic
searchBar.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = notes.filter(n => 
        n.heading.toLowerCase().includes(term) || 
        n.text.toLowerCase().includes(term)
    );
    renderNotes(filtered);
});

// Delete Logic [cite: 44]
function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    saveToLocalStorage();
    renderNotes(notes);
}

function saveToLocalStorage() {
    localStorage.setItem('myNotes', JSON.stringify(notes));
}

// Display function [cite: 43]
function renderNotes(notesToDisplay) {
    notesContainer.innerHTML = "";
    notesToDisplay.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note-card');
        noteDiv.style.animationDelay = `${index * 0.1}s`;
        
        noteDiv.innerHTML = `
            <h3>${note.heading}</h3>
            <div class="note-content">${note.text}</div>
            <div class="note-footer">
                <span class="note-date">${note.date}</span>
                <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
            </div>
        `;
        notesContainer.appendChild(noteDiv);
    });
}