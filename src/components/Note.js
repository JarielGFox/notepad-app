import { useState } from "react";

// queste sono le props che passiamo al componente
const Note = ({ note, deleteNote, editNote, darkMode }) => {
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
        <div className={`flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <form onSubmit={handleSubmit} className={`w-1/2 p-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} rounded shadow`}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full p-2 mb-4 border ${darkMode ? 'dark:border-gray-400 bg-gray-600' : ''} rounded`}
                    placeholder="Note Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={`w-full p-2 mb-4 border ${darkMode ? 'dark:border-gray-400 bg-gray-600' : ''} rounded`}
                    placeholder="Note Content"
                ></textarea>
                <button type="submit" className={`bg-blue-500 ${darkMode ? 'dark:bg-blue-300 dark:text-black' : 'text-white'} rounded`}>Update Note</button>
            </form>
        </div>
    ) : (
        <div className={`p-4 m-4 rounded shadow ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
            <h2 className="font-bold">{note.title}</h2>
            <p className="mb-4">{note.content}</p>
            <button onClick={() => deleteNote(note.id)} className="mr-2 bg-red-500 text-white rounded p-1">Delete</button>
            <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white rounded p-1">Edit</button>
        </div>
    );
};

export default Note;