import React, { useState, useEffect } from 'react';
import CarouselComponent from './carouselComponent';

function Carousel() {
    const [formData, setFormData] = useState({
        imgLink1: '',
        imgLink2: '',
        imgLink3: ''
    });

    useEffect(() => {
        const storedFormData = JSON.parse(localStorage.getItem('carouselFormData'));
        if (storedFormData) {
            setFormData(storedFormData);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('carouselFormData', JSON.stringify(formData));
    };

    const hasImageLinks = Object.values(formData).some(link => link.trim() !== '');

    return (
        <div className="container mx-auto py-8">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-md mx-auto  my-4 border-2 p-4 rounded">
                <label className="text-lg font-bold">Image Link 1:</label>
                <input type="text" name="imgLink1" value={formData.imgLink1} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                <label className="text-lg font-bold">Image Link 2:</label>
                <input type="text" name="imgLink2" value={formData.imgLink2} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                <label className="text-lg font-bold">Image Link 3:</label>
                <input type="text" name="imgLink3" value={formData.imgLink3} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
            </form>

            {hasImageLinks && <CarouselComponent imgLink1={formData.imgLink1} imgLink2={formData.imgLink2} imgLink3={formData.imgLink3} />}
        </div>
    );
}

export default Carousel;
