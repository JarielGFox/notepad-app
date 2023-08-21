import { useState } from "react";
import NoteDisplay from "./NoteDisplay";

// queste sono le props che passiamo al componente
const Note = ({ note, deleteNote, editNote, darkMode }) => {

    // stato per l'editing delle note
    const [isEditing, setIsEditing] = useState(false);
    // stati per il contenuto delle note
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [category, setCategory] = useState(note.category);

    // stato per il character counter
    const [charCount, setCharCount] = useState(0);

    // gestisce l'errore nel caso la nota è vuota
    const [errorMessage, setErrorMessage] = useState('');

    // stato per vedere le note espanse
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // stessa cosa di noteform.js controlla se è vuoto o ci sono spazi
        if (!title.trim() || !content.trim()) {
            setErrorMessage('Please fill in both the title and content.');
            return;
        }

        // se passa validazione reset del messaggio di errore
        setErrorMessage('');

        // aggiorna il contenuto delle note
        editNote(note.id, { title, content, category, id: note.id });
        setIsEditing(false);
    }

    return isEditing ? (
        <div className={`mt-1 flex items-center justify-center font-mono ${darkMode ? '' : 'bg-gray-100'}`}>
            <form onSubmit={handleSubmit} className={`w-1/2 p-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} rounded shadow`}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full text-center p-2 mb-4 border ${darkMode ? 'dark:border-gray-400 bg-gray-600' : ''} rounded`}
                    placeholder="Note Title"
                />

                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full text-center p-2 mb-4 border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} rounded`}
                    placeholder="Note Category"
                />

                <textarea
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        setCharCount(e.target.value.length);
                    }}
                    className={`w-full text-center p-2 mb-4 border ${darkMode ? 'dark:border-gray-400 bg-gray-600' : ''} rounded`}
                    placeholder="Note Content"
                ></textarea>
                <center>
                    {errorMessage ? <p className="text-red-500 fw-700 my-3">{errorMessage}</p> : null}
                </center>
                <p className="mb-2 text-center">
                    Characters: {charCount}
                </p>
                <div className="flex items-center justify-center">
                    <button type="submit" className={`bg-blue-500 font-mono ${darkMode ? 'dark:bg-blue-300 dark:text-black' : 'text-white'} rounded`}>Update Note</button>
                </div>
            </form>
        </div >
    ) : (
        <NoteDisplay
            note={note}
            onEdit={() => {
                setIsEditing(true);
                setCharCount(note.content.length);
            }}
            onDelete={() => deleteNote(note.id)}
            isExpanded={isExpanded}
            toggleExpand={() => setIsExpanded(!isExpanded)}
            darkMode={darkMode}
        />
    );
};

export default Note;