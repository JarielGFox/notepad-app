import React from 'react';


//funzionalità di import delle note
const ImportNotes = ({ setNotes, importlogo }) => {
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
                    throw new Error("Error parsing the imported file: " + error.message);
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

    return (
        <div>
            <button className="my-3 me-3 cursor-pointer">
                <img src={importlogo} width={40} height={40} onClick={triggerFileInput} alt="Import Notes" title="Import Notes" />
            </button>
            <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleImportNotes}
            />
        </div>
    );
};

export default ImportNotes;
