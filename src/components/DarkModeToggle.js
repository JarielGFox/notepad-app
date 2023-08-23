import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import lightbulb from '../lightbulb.png';

const DarkModeToggle = () => {
    const { toggleDarkMode } = useDarkMode(); // usa il context

    return (
        <div className="flex items-center justify-center">
            <button className="my-3 me-3 cursor-pointer" onClick={toggleDarkMode}>
                <img src={lightbulb} width={40} height={40} alt="DarkMode" title="Dark Mode" />
            </button>
        </div>
    );
}

export default DarkModeToggle;