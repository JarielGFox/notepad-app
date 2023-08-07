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
        <div className="flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-1/2 p-4 bg-white rounded shadow">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Note Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Note Content"
                ></textarea>
                <button type="submit" className=" bg-blue-500 text-white rounded">Update Note</button>
            </form>
        </div>
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