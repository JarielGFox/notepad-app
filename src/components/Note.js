import { useState } from "react";
import NoteDisplay from "./NoteDisplay";
import NoteEdit from "./NoteEdit";

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
        <NoteEdit
            note={note}
            onSave={handleSubmit}
            onCancel={() => setIsEditing(false)}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            category={category}
            setCategory={setCategory}
            charCount={charCount}
            setCharCount={setCharCount}
            errorMessage={errorMessage}
            darkMode={darkMode}
        />
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