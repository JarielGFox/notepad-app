import React, { createContext, useState, useEffect, useContext } from 'react';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
    // settiamo lo stato della darkMode nel localStorage
    const [darkMode, setDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem('dark-mode');
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });

    //settiamo l'effect della darkMode nel localStorage
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

    return (
        //questo componente wrappa l'alberatura degli altri componenti che devono accedere allo stato della darkMode
        //gli passa lo stato e la funzione di toggle come valori tramite oggetto
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

//custom hook per accedere allo stato della darkMode
const useDarkMode = () => {
    return useContext(DarkModeContext);
};

export { DarkModeProvider, useDarkMode };
