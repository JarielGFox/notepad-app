import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import Note from "./components/Note";
import lightbulb from '../src/lightbulb.png';


const App = () => {

  // state per la darkmode nel localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('dark-mode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  // useEffect per la darkMode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // controlla se ci sono note salvate sotto la keyword notes nel localStorage
  // se ci sono parsa la stringa JSON in un array JS e lo usa come stato iniziale, sennò array vuoto
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        return JSON.parse(savedNotes);
      } catch (error) {
        console.error("Error parsing notes from local storage:", error);
        return [];
      }
    } else {
      return [];
    }
  });

  // questa funzione crea una newNote e la aggiunge all'array, ogni nota è un oggetto con titolo, contenuto ed id
  // l'id che usiamo in questo caso è il timestamp
  // salviamo le note nel localStorage con JSON.stringify()
  const addNote = (title, content, category) => {
    const newNote = {
      title,
      content,
      category,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      lastEditedAt: new Date().toISOString(),
    };
    // creiamo un nuovo array che include le note esistenti + le nuove
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    // salviamo le note nel localStorage
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  // filtriamo l'array siccome lo stato è considerato immutabile, per tanto non va alterato
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  // usiamo map per creare un nuovo array e trasformiamo ogni elemento dell'array originale
  // trasformiamo ogni "note" array in "notes"
  const editNote = (id, updatedNote) => {
    // se l'id di "note" è lo stesso id che abbiamo passato ad editNote() sostituiamo "note" con "updatedNote"
    // se l'id di "note" NON è lo stesso che abbiamo passato ad editNote() lasciamo "note" unchanged
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...updatedNote,
          createdAt: note.createdAt,
          lastEditedAt: new Date().toISOString()
        };
      }
      return note;
    });
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  //attiviamo darkMode persistente nel localStorage
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('dark-mode', JSON.stringify(newDarkMode));
  };


  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* don't repeat yourself tua madre */}
      <h1 className="mt-3 flex items-center justify-center font-bold text-black dark:text-white font-mono text-2xl">Reactive Notes</h1>
      <div className="flex items-center justify-center">
        <button className="my-3 cursor-pointer" onClick={toggleDarkMode}>
          <img src={lightbulb} width={50} height={50} alt="DarkMode" title="Dark Mode" />
        </button>
      </div>

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