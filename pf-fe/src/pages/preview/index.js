import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarHandel from "./navbarHanndeler";
import CardHandeler from "./cardsHandel";
import CarouselHandeler from "./carouselHandel"
import FooterHandeler from "./footerHandel";

function Preview() {
    const elements = [];
    for (let i = 1; i <= localStorage.count; i++)
    {
        const key = `el_order(${i})`;
        const value = localStorage.getItem(key);
        if (value)
        {
            elements.push(value);
        }
    }
    const navigate = useNavigate();

    const handleSave = () => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken)
        {
            navigate("/login");
            return;
        }


        const data = {};
        for (let i = 1; i <= localStorage.count; i++)
        {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            if (value)
            {
                data[key] = value;
            }
        }
        console.log(data); // You can use the 'data' object as needed
    }

    return (
        <>
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="m-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Save Changes
                </button>
            </div>
            <div className="preview-container p-2 m-2 border-gray-400 border-2">
                {elements.length === 0 ? (
                    <div className="text-center items-center text-red-600">
                        <h2>Add Something</h2>
                    </div>
                ) : (
                    elements.map((element, index) => (
                        <div id={element} key={index}>
                            {element === "Navbar" && <NavbarHandel />}
                            {element === "Cards" && <CardHandeler />}
                            {element === "Carousel" && <CarouselHandeler />}
                            {element === "Footer" && <FooterHandeler />}
                        </div>
                    ))
                )}
            </div>
        </>
    );

}

export default Preview;
