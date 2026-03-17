function renderNotes(notesToDisplay) {
    notesContainer.innerHTML = "";
    notesToDisplay.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note-card');
        
        // Add a slight staggered delay for each note's animation
        noteDiv.style.animationDelay = `${index * 0.1}s`;
        
        noteDiv.innerHTML = `
            <div class="note-content">${note.text}</div>
            <div class="note-footer">
                <span class="note-date">${note.date}</span>
                <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
            </div>
        `;
        notesContainer.appendChild(noteDiv);
    });
}