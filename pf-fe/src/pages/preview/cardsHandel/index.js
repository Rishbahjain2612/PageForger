import React, { useEffect, useState } from 'react';
import CardComponent from '../../cards/cardComponent';


function CardHandeler() {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        const storedCards = JSON.parse(localStorage.getItem('cards'));
        if (storedCards && storedCards.length > 0)
        {
            setCards(storedCards);
        }
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
                {cards.map((card, index) => (
                    <div key={index} className="relative">
                        <CardComponent {...card} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default CardHandeler;