// PositioningPage.js
import React, { useState, useEffect } from 'react';

const PositioningPage = () => {
  const [count, setCount] = useState(parseInt(localStorage.getItem('count')) || 0);
  const [selectedElements, setSelectedElements] = useState([]);

  useEffect(() => {
    // Retrieving elements from localStorage on component mount
    let storedElements = [];
    for (let i = 0; i < count; i++) {
      const elID = `el_ordered${i}`;
      const storedValue = localStorage.getItem(elID);
      if (storedValue) {
        storedElements = [...storedElements, storedValue];
      }
    }
    setSelectedElements(storedElements);
  }, [count]);

//   const handleAddElement = (value, maxNum) => {
//     if (maxNum === 0) {
//       alert('Max number reached');
//     } else {
//       const edit = `el_ordered${count}`;
//       maxNum--; // Decrement the max number
//       const updatedElements = [...selectedElements, value];
//       localStorage.setItem(edit, value);
//       setCount(count + 1);
//       localStorage.setItem('count', count + 1);
//       setSelectedElements(updatedElements);
//     }
//   };

//   const handleRemoveElement = (value) => {
//     const maxNumParent = parseInt(document.getElementById(value).getAttribute('data-maxnum')) + 1;
//     document.getElementById(value).setAttribute('data-maxnum', maxNumParent);

//     const updatedElements = selectedElements.filter((el) => el !== value);

//     // Remove from localStorage
//     localStorage.removeItem(value);

//     setCount(count - 1);
//     localStorage.setItem('count', count - 1);
//     setSelectedElements(updatedElements);
//   };

  const handleRemoveElement = (value) => {
    const element = document.getElementById(value);
    
    if (element) {
        const maxNumParent = parseInt(element.getAttribute('data-maxnum')) + 1;
        document.getElementById(value).setAttribute('data-maxnum', maxNumParent);

    const updatedElements = selectedElements.filter((el) => el !== value);

    // Remove from localStorage
    localStorage.removeItem(value);

    setCount(count - 1);
    localStorage.setItem('count', count - 1);
    setSelectedElements(updatedElements);
    } else {
        console.error(`Element with id ${value} not found`);
    }
};

  return (
    <div className="main-container flex h-screen w-screen bg-orange-300 bg-cover bg-center bg-no-repeat">
      <div className="relative main m-5 h-5/6 w-5/6 self-center ">
        <div className="absolute h-full w-full opacity-60 bg-gray-400 rounded-3xl"></div>
        <div className="absolute h-full w-full inner-main">
          <div className="sub-inner-main h-5/6 grid mt-10 grid-cols-2 gap-8 place-items-center">
            <div className="positioning w-[20vw] text-center rounded-2xl border-2 border-black overflow-auto scrollbar-hide">
              <h3 className="pt-4 pb-12 text-xl font-semibold">Select Your Elements</h3>
              {/* Element card */}
              <div className="p-2 border border-gray-400 border-alternatives-border text-sm font-semibold focus:outline-none flex justify-between">
                <button className="add focus:outline-none" data-value="navbar" data-maxnum={1} id="navbar">
                  <i className="material-icons">add</i>
                </button>
                <div className="text-center w-full">
                  Navbar
                </div>
              </div>
              {/* Cards */}
              <div className="p-2 border-b border-gray-400 border-alternatives-border text-purple text-sm font-semibold focus:outline-none flex justify-between">
                <button className="add focus:outline-none" data-value="cards" data-maxnum={4} id="cards">
                  <i className="material-icons">add</i>
                </button>
                <div className="text-center w-full">
                  Cards
                </div>
              </div>
              {/* Carousel */}
              <div className="p-2 border-b border-gray-400 border-alternatives-border text-purple text-sm font-semibold focus:outline-none flex justify-between">
                <button className="add focus:outline-none" data-value="carousel" data-maxnum={2} id="carousel">
                  <i className="material-icons">add</i>
                </button>
                <div className="text-center w-full">
                  Carousel
                </div>
              </div>
              {/* Testimonial */}
              <div className="p-2 border-b border-gray-400 border-alternatives-border text-purple text-sm font-semibold focus:outline-none flex justify-between">
                <button className="add focus:outline-none" data-value="testimonial" data-maxnum={1} id="testimonial">
                  <i className="material-icons">add</i>
                </button>
                <div className="text-center w-full">
                  Testimonials
                </div>
              </div>
              {/* Pricing */}
              <div className="p-2 border-b border-gray-400 border-alternatives-border text-purple text-sm font-semibold focus:outline-none flex justify-between">
                <button className="add focus:outline-none" data-value="pricing" data-maxnum={1} id="pricing">
                  <i className="material-icons">add</i>
                </button>
                <div className="text-center w-full">
                  Pricing
                </div>
              </div>
              {/* Footer */}
              <div className="p-2 border-b border-gray-400 border-alternatives-border text-purple text-sm font-semibold focus:outline-none flex justify-between">
                <button className="add focus:outline-none" data-value="footer" data-maxnum={1} id="footer">
                  <i className="material-icons">add</i>
                </button>
                <div className="text-center w-full">
                  Footer
                </div>
              </div>
            </div>
            <div className="positioning text-center w-[20vw] rounded-2xl border-2 border-black overflow-auto scrollbar-hide" id="selected-order">
              <h3 className="pt-4 pb-4 text-xl font-semibold">Selected Order</h3>
              {selectedElements.map((value, index) => (
                <div key={index} className="p-2 m-1 border border-gray-400 border-alternatives-border text-sm font-semibold focus:outline-none flex justify-between" value={`el_ordered${index}`}>
                  <button className="focus:outline-none remove" onClick={() => handleRemoveElement(`el_ordered${index}`)}>
                    <i className="material-icons" data-parent={value}>remove</i>
                  </button>
                  <div className="text-center w-full">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositioningPage;
