import { useState } from 'react';

const colors = ['yellow', 'green', 'pink', 'blue'];

function NoteCard({ note, onDelete, onEdit, onPin, index }) {
  const color = colors[index % colors.length];
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onEdit(note._id, { title, content });
    setIsEditing(false);
  };

  return (
    <div className={`note-card ${color} ${note.pinned ? 'pinned' : ''}`}>
      {note.pinned && <span className="pin-badge">📌 Pinned</span>}
      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="edit-textarea"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <button className="save-btn" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
          <div className="card-buttons">
            <button className="pin-btn" onClick={() => onPin(note._id, note.pinned)}>
              {note.pinned ? 'Unpin' : 'Pin'}
            </button>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(note._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default NoteCard;