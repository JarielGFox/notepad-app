import React from "react";

const NoteDisplay = ({ note, onEdit, onDelete, isExpanded, toggleExpand, darkMode }) => {
    return (
        <div className={`p-4 m-4 w-1/2 rounded shadow mx-auto font-mono ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
            <h2 className="font-bold">{note.title}</h2>
            {/* se isExpanded è true, mostra tutto il contenuto della nota, se false invece solo i primi 100 chars */}
            <p onClick={toggleExpand} className="mb-4 cursor-pointer">
                {/* ritorniamo una nuova stringa con substring(), se nota è più lunga di 100 chars, mostra i puntini */}
                {isExpanded ? note.content : note.content.substring(0, 100)}{note.content.length > 100 ? "..." : ""}
            </p>

            <p className={`text-sm my-3 ${darkMode ? 'text-gray-400' : 'bg-white text-black'}`} >Category: {note.category}</p>

            {/* Mostriamo la data di creazione e l'ultima data di modifica */}
            <p className={`text-sm ${darkMode ? 'text-teal-200' : 'bg-white text-black'}`}>Created At: {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString()}</p>
            <p className={`text-sm ${darkMode ? 'text-teal-200' : 'bg-white text-black'}`}>Last Edited: {new Date(note.lastEditedAt).toLocaleDateString()} {new Date(note.lastEditedAt).toLocaleTimeString()}</p>

            <button onClick={onDelete} className="mr-2 bg-rose-400 text-gray-800 rounded p-1">Delete</button>
            <button onClick={onEdit} className="bg-teal-400 text-gray-800 rounded p-1">Edit</button>
        </div>
    );
}

export default NoteDisplay;