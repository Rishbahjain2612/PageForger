import React, { useState } from 'react';

function HandleTiles({ tiles, setTiles }, logo, profile) {
    const [formData, setFormData] = useState({ name: '', href: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddTile = () => {
        // Add new tile to the tiles array
        if (formData.name.trim() !== '' && formData.href.trim() !== '')
        {
            const newTile = { name: formData.name, href: formData.href };
            setFormData({ name: '', href: '' });
            setTiles((prevTiles) => [...prevTiles, newTile]);
        }
    };

    const handleDeleteTile = (index) => {
        // Delete tile from the tiles array
        const updatedTiles = tiles.filter((_, i) => i !== index);
        setTiles(updatedTiles);
    };

    return (
        <div className="max-w-[80%] mx-auto mt-4">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name:
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="href">
                        Href:
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="href"
                            type="text"
                            name="href"
                            value={formData.href}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleAddTile}
                    >
                        Add Tile
                    </button>
                </div>
            </form>
            <ul className="divide-y divide-gray-200">
                {tiles.map((tile, index) => (
                    <li key={index} className="flex items-center py-4">
                        <span className="text-gray-900">{tile.name}</span>
                        <button
                            className="ml-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
                            type="button"
                            onClick={() => handleDeleteTile(index)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default HandleTiles;
