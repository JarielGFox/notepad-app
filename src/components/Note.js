import { useState } from "react";

// queste sono le props che passiamo al componente
const Note = ({ note, deleteNote, editNote }) => {
    // stati per l'editing delle note
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const handleSubmit = (e) => {
        e.preventDefault();
        // aggiorna il contenuto delle note
        editNote(note.id, { title, content, id: note.id });
        setIsEditing(false);
    }


    return isEditing ? (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Update Note</button>
        </form>
    ) : (
        <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
    );
};

export default Note;