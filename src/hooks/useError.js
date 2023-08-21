import { useState } from "react";

const useError = () => {
    //creiamo lo stato error con l'hook useState
    const [error, setError] = useState(null);

    //questa funzione quando richiamata, aggiorna lo stato "error" con il messaggio fornito
    const setErrorMessage = (message) => {
        setError(message);
    }

    //permette al componente di pulire il messaggio d'errore, impostando il suo stato nuovamente su null
    const clearError = () => {
        setError(null);
    }

    // l'hook ritorna un array che contiene lo stato dell'errore e le due funzioni di cui sopra
    return [error, setErrorMessage, clearError];
}

export default useError;