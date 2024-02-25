import React from "react";
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

    return (
        <div className="preview-container p-2 m-2 border-gray-400 border-2">
            {elements.length === 0 ? (
                <div className="text-center items-center text-red-600">
                    <h2>Add Something</h2>
                </div>
            ) : (
                elements.map((element, index) => (
                    <div id={element} key={index}>
                        {element === 'Navbar' && <NavbarHandel />}
                        {element === 'Cards' && <CardHandeler />}
                        {element === 'Carousel' && <CarouselHandeler />}
                        {element === 'Footer' && <FooterHandeler />}
                    </div>
                ))
            )}
        </div>
    );
}

export default Preview;



// import React from 'react';
// import NavBarComponent from '../navbar';

// export default function AnotherPage() {
//   // Retrieve data from localStorage
//   const navigation = JSON.parse(localStorage.getItem('navigation'));
//   const logoSrc = JSON.parse(localStorage.getItem('navigationLogo')).logoSrc;
//   const showImages = JSON.parse(localStorage.getItem('navigationLogo')).showImages;
//   const profileImgSrc = JSON.parse(localStorage.getItem('navigationProfile')).profileImgSrc;
//   const showProfileImages = JSON.parse(localStorage.getItem('navigationProfile')).showProfileImages;

//   return (
//     <NavBarComponent
//       navigation={navigation}
//       logoSrc={logoSrc}
//       showImages={showImages}
//       profileImgSrc={profileImgSrc}
//       showProfileImages={showProfileImages}
//       showForms={false} // Pass a prop to indicate that forms should not be rendered
//     />
//   );
// }
