// passiamo la prop error al componente
const ErrorDisplay = ({ error }) => {
    //se non c'è alcun messaggio di errore, il componente ritorna null e non farà il render di niente
    if (!error) return null;

    return (
        // se c'è un messaggio di errore, verrà mostrato in un div in rosso
        <div className="text-red-700 fw-700 my-3">
            {error}
        </div>
    );
}

export default ErrorDisplay;