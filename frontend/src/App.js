// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE}/notes`).then(res => setNotes(res.data));
  }, []);

  const addNote = async () => {
    if (!newNote.trim()) return;
    const res = await axios.post(`${API_BASE}/notes`, { content: newNote });
    setNotes([...notes, res.data]);
    setNewNote('');
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_BASE}/notes/${id}`);
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>☁️ Cloud Notes</h1>
      <input
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder='Write a note...'
      />
      <button onClick={addNote}>Add</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.content}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
