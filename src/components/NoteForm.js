import { useState } from "react"

// passiamo addNote come prop
const NoteForm = ({ addNote, darkMode }) => {
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
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className={`bg-white dark:bg-gray-800 p-8 rounded shadow-md ${darkMode ? 'text-white' : 'text-black'}`}>
                <div className="mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="note title"
                        className="w-full p-2 border dark:bg-gray-700 dark:border-gray-400 rounded"
                    />
                </div>

                <div className="mb-4">
                    <textarea
                        name="notepad"
                        id="notepad"
                        cols="30"
                        rows="10"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="note content"
                        className="w-full p-2 border dark:bg-gray-700 dark:border-gray-400 rounded"
                    />
                </div>

                <button type="submit" className="w-full p-2 bg-blue-500 dark:bg-blue-300 dark:text-black text-white rounded">
                    Add Note
                </button>
            </form>
        </div>
    );


};

export default NoteForm
