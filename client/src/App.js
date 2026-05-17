import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:3001/api/notes');
    setNotes(res.data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const addNote = async (note) => {
    await axios.post('http://localhost:3001/api/notes', note);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:3001/api/notes/${id}`);
    fetchNotes();
  };

  const editNote = async (id, updatedNote) => {
    await axios.put(`http://localhost:3001/api/notes/${id}`, updatedNote);
    fetchNotes();
  };

  const pinNote = async (id, pinned) => {
    await axios.put(`http://localhost:3001/api/notes/${id}`, { pinned: !pinned });
    fetchNotes();
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>My Notes!</h1>
      <input
        className="search-bar"
        placeholder="Search notes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <NoteForm onAdd={addNote} />
      <NoteList notes={filteredNotes} onDelete={deleteNote} onEdit={editNote} onPin={pinNote} />
    </div>
  );
}

export default App;