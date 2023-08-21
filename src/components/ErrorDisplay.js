// passiamo la prop errorMessage al componente
const ErrorDisplay = ({ errorMessage }) => {
    //se non c'è alcun messaggio di errore, il componente ritorna null e non farà il render di niente
    if (!errorMessage) return null;

    return (
        // se c'è un messaggio di errore, verrà mostrato in un div in rosso
        <div className="text-red-500">
            {errorMessage}
        </div>
    );
}

export default ErrorDisplay;