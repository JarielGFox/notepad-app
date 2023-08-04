import { useState } from "react"

// passiamo addNote come prop
const NoteForm = ({ addNote }) => {
    // usiamo useState hook per creare variabili "title" e "content"
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // questa funzione viene richiamata quando il form viene submittato
    // è anche responsabile della creazione di nuove note
    const handleSubmit = (e) => {
        // previene aggiornamento della pagina della form submission
        e.preventDefault();
        // titolo e contenuto vengono impostati a stringhe vuote
        addNote(title, content);
        setTitle('');
        setContent('');
    };


    // nel text input passiamo title, nella text-area invece content
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => (setTitle(e.target.value))}
                    placeholder="note title"
                />
            </div>

            <div>
                <textarea
                    name="notepad" id="notepad" cols="30" rows="10"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="note content"
                />
            </div>

            <button type="submit">
                Add Note
            </button>
        </form>
    );
};

export default NoteForm
