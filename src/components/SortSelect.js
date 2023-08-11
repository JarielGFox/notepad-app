import React from "react";

const SortSelect = ({ sortType, setSortType, notes, onSort }) => {
    // logica per ordinare le note, passiamo "sortType" come parametro per rendere la funzione dinamica
    const getSortedNotes = (sortType) => {
        // creiamo una copia di notes che abbiamo passato come prop per non modificare lo stato originale
        let sortedNotes = [...notes];

        switch (sortType) {
            case 'alphabetical':
                sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'creation':
                sortedNotes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'edited':
                sortedNotes.sort((b, a) => new Date(a.lastEditedAt) - new Date(b.lastEditedAt));
                break;
            default:
                break;
        }

        return sortedNotes;
    }

    // questa funzione viene triggerata quando si cambia il value nel dropdown "value={sortType}"
    const handleSortChange = (e) => {
        // prende il value selezionato dal dropdown
        const newSortType = e.target.value;
        // ordina le note in base al metodo selezionato
        const sortedNotes = getSortedNotes(newSortType);
        //chiamiamo la callback passando il metodo di sort selezionato e tramite onSort spediamo il dato al componente padre (App.js)
        onSort(sortedNotes);
        // aggiorna lo stato sortType in App.js, riflettendo il metodo di sort attualmente selezionato
        setSortType(newSortType);
    }

    return (
        <div>
            <label htmlFor="sorting" className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order your notes by:</label>
            <select
                id="sorting"
                value={sortType}
                onChange={handleSortChange}
                className="block mx-auto w-1/2 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value="alphabetical">Alphabetical</option>
                <option value="creation">Creation Date</option>
                <option value="edited">Last Edited</option>
            </select>
        </div>

    );
}

export default SortSelect;