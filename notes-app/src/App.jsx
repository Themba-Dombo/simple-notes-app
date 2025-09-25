import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [error, setError] = useState(null);

    // Fetch initial notes from the backend
    useEffect(() => {
        fetch('/api/notes')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => setNotes(data))
            .catch(error => {
                console.error("Fetch error:", error);
                setError("Could not load notes. Is the server running?");
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newNote.trim()) return; // Prevent adding empty notes

        fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newNote }),
        })
            .then((res) => res.json())
            .then((data) => {
                setNotes([...notes, data]);
                setNewNote('');
                setError(null); // Clear any previous errors
            })
            .catch(error => {
                console.error("Submit error:", error);
                setError("Could not add note. Please try again.");
            });
    };

    return (
        <div className="App">
            <header>
                <h1>Simple Notes App 📝</h1>
                <p>This app is running with a Vite frontend and an Express backend.</p>
            </header>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="note-form">
                <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new note"
                />
                <button type="submit">Add Note</button>
            </form>

            <div className="notes-list">
                <h2>Notes</h2>
                <ul>
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <li key={note.id}>{note.text}</li>
                        ))
                    ) : (
                        <p>No notes yet. Add one above!</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default App;
