import React from 'react';

function ElementButton({ icon: Icon, text, onClick }) {

    return (
        <div className="p-2 border border-gray-400 border-alternatives-border text-sm font-semibold focus:outline-none flex justify-between">
            <button className="add focus:outline-none" onClick={onClick}>
                <Icon className="h-5 w-5 text-black" />
            </button>
            <div className="text-center w-full">{text}</div>
        </div>
    );
}

export default ElementButton;

