import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import Note from "./components/Note";

const App = () => {

  // state per la darkmode
  const [darkMode, setDarkMode] = useState(false);

  // useEffect per la darkMode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // usiamo l'hook per creare una state variable per le note che parte come array vuoto
  const [notes, setNotes] = useState([]);

  // questa funzione crea una newNote e la aggiunge all'array, ogni nota è un oggetto con titolo, contenuto ed id
  // l'id che usiamo in questo caso è il timestamp
  const addNote = (title, content) => {
    const newNote = { title, content, id: Date.now() };
    // creiamo un nuovo array che include le note esistenti + le nuove
    setNotes([...notes, newNote]);
  };

  // filtriamo l'array siccome lo stato è considerato immutabile, per tanto non va alterato
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  }

  // usiamo map per creare un nuovo array e trasformiamo ogni elemento dell'array originale
  // trasformiamo ogni "note" array in "notes"
  const editNote = (id, updatedNote) => {
    // se l'id di "note" è lo stesso id che abbiamo passato ad editNote() sostituiamo "note" con "updatedNote"
    // se l'id di "note" NON è lo stesso che abbiamo passato ad editNote() lasciamo "note" unchanged
    setNotes(notes.map((note) => note.id === id ? updatedNote : note));
  };

  //funzione per la darkMode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }


  return (
    <div className={darkMode ? 'dark' : ''}>
      <h1 className="flex items-center justify-center font-bold text-black dark:text-white">Reactive Notes</h1>

      <button onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>
      {/* passiamo addNote come prop al componente NoteForm */}
      <NoteForm addNote={addNote} darkMode={darkMode} />
      {/* mappiamo notes e renderiamo un component Note per ogni nota mappata */}
      {notes.map((note) => (
        // passiamo note, deleteNote e editNote come prop al componente Note e usiamo l'id di note come chiave per il mapping
        <Note key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} darkMode={darkMode} />
      ))}
    </div>
  );

};

export default App;