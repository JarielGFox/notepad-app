import React, { useState } from 'react';
import NoteForm from './components/NoteForm';
import Note from "./components/Note";

const App = () => {
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

  return (
    <div>
      <h1>Reactive Notes</h1>
      {/* passiamo addNote come prop al componente NoteForm */}
      <NoteForm addNote={addNote} />
      {/* mappiamo notes e renderiamo un component Note per ogni nota mappata */}
      {notes.map((note) => (
        // passiamo note, deleteNote e editNote come prop al componente Note e usiamo l'id di note come chiave per il mapping
        <Note key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} />
      ))}
    </div>
  );
};

export default App;