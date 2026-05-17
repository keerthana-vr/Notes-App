import NoteCard from './NoteCard';

function NoteList({ notes, onDelete, onEdit, onPin }) {
  return (
    <div className="note-list">
      {notes.map((note, index) => (
        <NoteCard key={note._id} note={note} onDelete={onDelete} onEdit={onEdit} onPin={onPin} index={index} />
      ))}
    </div>
  );
}

export default NoteList;