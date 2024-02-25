import React, { useState, useEffect } from 'react'
import CarouselComponent from '../../carousel/carouselComponent';

function CarouselHandeler() {

    const [formData, setFormData] = useState({
        imgLink1: '',
        imgLink2: '',
        imgLink3: ''
    });

    useEffect(() => {
        const storedFormData = JSON.parse(localStorage.getItem('carouselFormData'));
        if (storedFormData)
        {
            setFormData(storedFormData);
        }
    }, []);

    const hasImageLinks = Object.values(formData).some(link => link.trim() !== '');

    return (
        <div>
            {hasImageLinks && <CarouselComponent imgLink1={formData.imgLink1} imgLink2={formData.imgLink2} imgLink3={formData.imgLink3} />}
        </div>
    )
}

export default CarouselHandeler;