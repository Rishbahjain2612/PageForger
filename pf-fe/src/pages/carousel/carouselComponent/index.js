import React from 'react';
import { Carousel } from "@material-tailwind/react";

function CarouselComponent({ imgLink1, imgLink2, imgLink3 }) {
    return (
        <Carousel loop={true} className="rounded-xl w-full h-1/3 overflow-hidden">
            <img
                src={imgLink1}
                alt=""
                className="h-full w-full object-cover"
            />
            <img
                src={imgLink2}
                alt=""
                className="h-full w-full object-cover"
            />
            <img
                src={imgLink3}
                alt=""
                className="h-full w-full object-cover"
            />
        </Carousel>
    );
}

export default CarouselComponent;
