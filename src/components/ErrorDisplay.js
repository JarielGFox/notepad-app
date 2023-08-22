// passiamo la prop error al componente
const ErrorDisplay = ({ error, clearError }) => {
    //se non c'è alcun messaggio di errore, il componente ritorna null e non farà il render di niente
    if (!error) return null;

    return (
        // se c'è un messaggio di errore, verrà mostrato in un div in rosso
        <div className="text-red-700 fw-700 my-3">
            {error}
            <div>
                <button onClick={clearError} className="ml-2">Clear</button>
            </div>
        </div>
    );
}

export default ErrorDisplay;