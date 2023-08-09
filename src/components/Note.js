import { useState } from "react";

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

    //stato per vedere le note espanse
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
        <div className={`flex items-center justify-center font-mono ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
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
        <div className={`p-4 m-4 w-1/2 rounded shadow mx-auto font-mono ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
            <h2 className="font-bold">{note.title}</h2>
            {/* se isExpanded è true, mostra tutto il contenuto della nota, se false invece solo i primi 100 chars */}
            <p onClick={() => setIsExpanded(!isExpanded)} className="mb-4 cursor-pointer">
                {/* ritorniamo una nuova stringa con substring(), se nota è più lunga di 100 chars, mostra i puntini */}
                {isExpanded ? note.content : note.content.substring(0, 100)}{note.content.length > 100 ? "..." : ""}
            </p>
            <p className={`text-sm my-3 ${darkMode ? 'text-gray-400' : 'bg-white text-black'}`} >Category: {note.category}</p>

            {/* Mostriamo la data di creazione e l'ultima data di modifica */}

            <p className={`text-sm ${darkMode ? 'text-teal-200' : 'bg-white text-black'}`}>Created At: {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString()}</p>
            <p className={`text-sm ${darkMode ? 'text-teal-200' : 'bg-white text-black'}`}>Last Edited: {new Date(note.lastEditedAt).toLocaleDateString()} {new Date(note.lastEditedAt).toLocaleTimeString()}</p>

            <button onClick={() => deleteNote(note.id)} className="mr-2 bg-rose-400 text-gray-800 rounded p-1">Delete</button>
            <button onClick={() => {
                setIsEditing(true);
                setCharCount(note.content.length);
            }} className="bg-teal-400 text-gray-800 rounded p-1">Edit</button>
        </div>
    );
};

export default Note;