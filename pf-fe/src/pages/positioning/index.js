import React, { useState, useEffect } from 'react';
import ElementButton from './addComponents';
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

function Positioning() {
  const [addedElements, setAddedElements] = useState([]);

  useEffect(() => {
    const storedElements = [];
    const count = parseInt(localStorage.getItem('count') || '0');

    for (let i = 1; i <= count; i++) {
      const element = localStorage.getItem(`el_order(${i})`);
      if (element) {
        storedElements.push(element);
      }
    }

    setAddedElements(storedElements);
  }, []);

  const addElement = (text) => {
    const maxCount = getMaxCount(text);
    if (addedElements.filter(el => el === text).length >= maxCount) {
      alert(`Maximum ${maxCount} ${text} allowed.`);
      return;
    }

    const newElements = [...addedElements, text];
    setAddedElements(newElements);
    localStorage.setItem('count', newElements.length.toString());
    localStorage.setItem(`el_order(${newElements.length})`, text);
  };

  const removeElement = (text) => {
    const newElements = addedElements.filter(el => el !== text);
    setAddedElements(newElements);
    localStorage.setItem('count', newElements.length.toString());

    // Update the order in localStorage
    for (let i = 1; i <= newElements.length; i++) {
      localStorage.setItem(`el_order(${i})`, newElements[i - 1]);
    }
  };

  const getMaxCount = (text) => {
    switch (text) {
      case 'Navbar':
        return 1;
      case 'Cards':
        return 1;
      case 'Carousel':
        return 1;
      case 'Footer':
        return 1;
      default:
        return 0;
    }
  };

  const elements = ["Navbar", "Cards", "Carousel", "Footer"];

  return (
    <div className='flex justify-center items-center h-screen bg-emerald-300'>
      <div className='bg-emerald-100 h-4/5 w-4/5 rounded-lg flex items-center justify-around'>
        <div className='h-[75%] w-[25%] bg-gray-300 rounded-lg border-2 border-black pt-3'>
          <h3 className="text-black text-center text-lg font-semibold border-b-2 border-black pb-2">Select your Elements</h3>
          {elements.map((element, index) => (
            <ElementButton key={index} icon={PlusIcon} text={element} onClick={() => addElement(element)} />
          ))}
        </div>
        <div className='h-[75%] w-[25%] bg-gray-300 rounded-lg border-2 border-black pt-3'>
          <h3 className="text-black text-center text-lg font-semibold border-b-2 border-black pb-2">Added Elements</h3>
          {addedElements.map((element, index) => (
            <ElementButton key={index} icon={MinusIcon} text={element} onClick={() => removeElement(element)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Positioning;
