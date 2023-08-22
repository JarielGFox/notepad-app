import React from 'react';

// funzionalità per esportare le note
const ExportNotes = ({ notes, exportlogo }) => {
    const handleExportNotes = () => {
        //convertiamo le note in JSON
        const notesJSON = JSON.stringify(notes);
        //creiamo un file di raw data Binary Large OBject dalla stringa JSON
        const blob = new Blob([notesJSON], { type: 'application/json' });
        //creiamo un URL per il Blob
        const urlBlob = URL.createObjectURL(blob);

        //creiamo un anchor temporaneo
        const tempA = document.createElement('a');
        tempA.href = urlBlob;
        tempA.download = 'notes_backup.json'; //nome del file di download

        //aggiungiamo l'anchor al documento, triggera un click per il download e poi lo rimuoviamo
        document.body.appendChild(tempA);
        tempA.click();
        document.body.removeChild(tempA);

        // puliamo revocando l'url del BLOB
        URL.revokeObjectURL(urlBlob);
    };

    return (
        <button className="my-3 cursor-pointer" onClick={handleExportNotes}>
            <img src={exportlogo} width={40} height={40} alt="Export Notes" title="Export Notes" />
        </button>
    );
};

export default ExportNotes;
