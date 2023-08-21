import React from "react";

const NoteEdit = ({ onSave, onCancel, title, setTitle, content, setContent, category, setCategory, charCount, setCharCount, errorMessage, darkMode }) => {
    return (
        <div className={`mt-1 flex items-center justify-center font-mono ${darkMode ? '' : 'bg-gray-100'}`}>
            <form onSubmit={onSave} className={`w-1/2 p-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} rounded shadow`}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full text-center p-2 mb-4 border ${darkMode ? 'dark:border-gray-400 bg-gray-600' : ''} rounded`}
                    placeholder="Note Title"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full text-center p-2 mb-4 border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} rounded`}
                    placeholder="Note Category"
                />
                <textarea
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        setCharCount(e.target.value.length);
                    }}
                    className={`w-full text-center p-2 mb-4 border ${darkMode ? 'dark:border-gray-400 bg-gray-600' : ''} rounded`}
                    placeholder="Note Content"
                ></textarea>
                <center>
                    {errorMessage ? <p className="text-red-500 fw-700 my-3">{errorMessage}</p> : null}
                </center>
                <p className="mb-2 text-center">
                    Characters: {charCount}
                </p>
                <div className="flex items-center justify-center">
                    <button type="submit" className={`bg-blue-500 font-mono ${darkMode ? 'dark:bg-blue-300 dark:text-black' : 'text-white'} rounded`}>Update Note</button>
                    <button type="button" onClick={onCancel} className="ml-2 bg-red-500 font-mono text-white rounded">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default NoteEdit
