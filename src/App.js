import React, { useState, useEffect } from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import SortSelect from './components/SortSelect';
import NoteForm from './components/NoteForm';
import Note from "./components/Note";
import exportlogo from '../src/exportlogo.png';
import importlogo from '../src/importlogo.png';

const App = () => {
  // errore per l'import delle note, da refactorare poi con custom hook
  const [error, setError] = useState(null);

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

  //attiviamo darkMode persistente nel localStorage
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('dark-mode', JSON.stringify(newDarkMode));
  };

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

  // funzionalità per esportare le note
  const handleExportNotes = () => {
    //convertiamo le note in JSON
    const notesJSON = JSON.stringify(notes);

    //creiamo un file di raw data Binary Large OBject dalla stringa JSON
    const blob = new Blob([notesJSON], { type: 'application/json' });

    //creiamo un URL per il Blob
    const urlBlob = URL.createObjectURL(blob);

    //creiamo un anchor temporaneo
    const tempA = document.createElement('a')
    tempA.href = urlBlob;
    tempA.download = 'notes_backup.json'; //nome del file di download

    //aggiungiamo l'anchor al documento, triggera un click per il download e poi lo rimuoviamo
    document.body.appendChild(tempA);
    tempA.click();
    document.body.removeChild(tempA);

    // puliamo revocando l'url del BLOB
    URL.revokeObjectURL(urlBlob);
  }

  //funzionalità di import delle note
  const handleImportNotes = (event) => {
    const file = event.target.files[0];

    if (file) {
      //l'oggetto FileReader() permette di leggere asincronamente il contenuto dei file sul PC dell'utente
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          //abbiamo accesso al contenuto del file tramite "e.target.result" che ci aspettiamo sia file JSON
          const importedNotes = JSON.parse(e.target.result);
          // controlliamo se le note importate sono un array
          if (Array.isArray(importedNotes)) {
            setNotes(importedNotes);
            localStorage.setItem('notes', JSON.stringify(importedNotes));
          } else {
            throw new Error("Invalid file format");
          }
        } catch (error) {
          throw new Error("Error parsing the imported file: " + error.message)
        }
      };
      //inizia a leggere il file, appena finito si triggera l'evento onload sopra
      reader.readAsText(file);
    }
  };

  // per cliccare l'elemento input nascosto per l'import
  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  // stato per funzionalità sort
  const [sortType, setSortType] = useState('creation');

  // guarda componente SortSelect.js
  // questa funzione aggiorna lo stato delle note, con quello delle note ordinate che riceviamo dal componente SortSelect.js
  const updateSortedNotes = (sortedNotes) => {
    setNotes(sortedNotes);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* don't repeat yourself tua madre */}
      <h1 className="mt-3 flex items-evenly justify-center font-bold text-black dark:text-white font-mono text-2xl">Reactive Notes</h1>
      <div className="flex items-center justify-center">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <button className="my-3 me-3 cursor-pointer">
          <img src={importlogo} width={40} height={40} onClick={triggerFileInput} alt="Import Notes" title="Import Notes" />
        </button>
        <button className="my-3 cursor-pointer" onClick={handleExportNotes}>
          <img src={exportlogo} width={40} height={40} alt="Export Notes" title="Export Notes" />
        </button>

        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleImportNotes}
        />
      </div>

      {/* quando renderiamo SortSelect passiamo questa lista di props:
      - notes: lista di note
      - onSort: la funzione di callback che aggiorna lo stato delle note con quelle ordinate dall'utente
      - sortType e setSortType: il metodo di sorting selezionato e la funzione che ne gestisce le logiche
      */}
      <SortSelect notes={notes} onSort={updateSortedNotes} sortType={sortType} setSortType={setSortType} />

      {error ?
        <div className="bg-red-500 text-white p-2 rounded mt-2">
          {error}
          <button onClick={() => setError(null)} className="ml-2">X</button>
        </div> : null
      }

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