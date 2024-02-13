import React, { useState, useEffect } from 'react';
import CardComponent from './cardComponent'; // Assuming CardComponent is in a separate file

const CardForm = () => {
    const [cards, setCards] = useState([]);
    const [formData, setFormData] = useState({
        imgLink: '',
        header: '',
        desc: '',
        buttonText: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCard = {
            imgLink: formData.imgLink,
            header: formData.header,
            desc: formData.desc,
            buttonText: formData.buttonText
        };
        setCards([...cards, newCard]);
        setFormData({
            imgLink: '',
            header: '',
            desc: '',
            buttonText: ''
        });
    };

    const handleDelete = (index) => {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1);
        setCards(updatedCards);
    };

    useEffect(() => {
        const storedCards = JSON.parse(localStorage.getItem('cards'));
        if (storedCards)
        {
            setCards(storedCards);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards));
    }, [cards]);

    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="mt-4 p-4 border-2 rounded">
                <label className="block mb-2">Image Link:</label>
                <input type="text" name="imgLink" value={formData.imgLink} onChange={handleChange} className="border border-gray-400 px-3 py-2 rounded-lg mb-4 w-full" />

                <label className="block mb-2">Header:</label>
                <input type="text" name="header" value={formData.header} onChange={handleChange} className="border border-gray-400 px-3 py-2 rounded-lg mb-4 w-full" />

                <label className="block mb-2">Description:</label>
                <input type="text" name="desc" value={formData.desc} onChange={handleChange} className="border border-gray-400 px-3 py-2 rounded-lg mb-4 w-full" />

                <label className="block mb-2">Button Text:</label>
                <input type="text" name="buttonText" value={formData.buttonText} onChange={handleChange} className="border border-gray-400 px-3 py-2 rounded-lg mb-4 w-full" />

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Card</button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
                {cards.map((card, index) => (
                    <div key={index} className="relative">
                        <CardComponent {...card} />
                        <button onClick={() => handleDelete(index)} className="absolute bottom-5 right-0 m-2 p-2 bg-red-500 text-white rounded">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardForm;
