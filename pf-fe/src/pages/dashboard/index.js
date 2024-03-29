import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [componentList, setComponentList] = useState([]);

  useEffect(() => {
    const tempList = [];
    for (let j = 0; j < localStorage.length; j++) {
      let component = localStorage.key(j);

      if (component === "navigation") {
        tempList.push("Navbar");
      } else if (component === "footerFormData") {
        tempList.push("Footer");
      } else if (component === "carouselFormData") {
        tempList.push("Carousel");
      } else if (component === "cards") {
        tempList.push("Cards");
      }
    }

    setComponentList(tempList);
  }, []);

  const clearAll = () => {
    let data = localStorage.getItem("userId");
    let token = localStorage.getItem("token");
    localStorage.clear();
    localStorage.setItem("userId", data);
    localStorage.setItem("token", token);
    setSelectedItems([]);
    setComponentList([]);
  };

  useEffect(() => {
    const storedElements = [];
    const count = parseInt(localStorage.getItem("count") || "0");

    for (let i = 1; i <= count; i++) {
      const element = localStorage.getItem(`el_order(${i})`);
      if (element) {
        storedElements.push(element);
      }
    }
    setSelectedItems(storedElements);
  }, []);

  return (
    <div className="relative m-5 p-4 h-[90%] w-[90%] self-center">
      <div className="absolute h-full w-full opacity-40 bg-gray-200 rounded-2xl p-3"></div>

      <div className="absolute h-full w-full inner-main p-4">
        <h1 className="text-3xl text-bold text-slate-50 text-center">
          Dashboard
        </h1>

        <div className="sub-inner-main h-4/5 grid mt-10 grid-cols-6 gap-4 m-4">
          <div className="positioning text-center rounded-2xl border-2 border-black overflow-hidden h-full">
            <h3 className="pt-4 pb-4 text-xl font-semibold">Positioning</h3>

            {/* Positioning card */}
            {selectedItems.map((item, index) => (
              <div
                key={index}
                className="p-2 m-2 border border-gray-400 border-alternatives-border text-purple text-sm font-semibold focus:outline-none flex justify-between"
              >
                <button className="focus:outline-none"></button>
                <div className="text-center w-full">{item}</div>
              </div>
            ))}
          </div>

          <div className="components text-center rounded-2xl col-span-5 border-2 border-black overflow-hidden h-full">
            <h4 className="pt-4 pb-4 text-xl font-semibold">Components</h4>
            <div
              className="pl-10 pr-10 h-5/6 grid grid-cols-5 gap-3"
              id="componentConatiner"
            >
              {/* Render components */}

              {componentList.map((component, index) => (
                <div
                  key={index}
                  className="bg-gray-400 h-40 flex justify-center rounded-xl items-center border-2 border-gray-500"
                >
                  {component}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-6 h-12 grid grid-cols-3 gap-4">
          <button
            className="bg-red-600 h-full w-full rounded-xl border-2 border-red-800"
            onClick={clearAll}
          >
            Clear All
          </button>
          <Link to="/preview">
            <button className="bg-lime-400 h-full w-full rounded-xl border-2 border-lime-800">
              Preview Page
            </button>
          </Link>
          <Link to="/positioning">
            <button className="bg-orange-400 h-full w-full rounded-xl border-2 border-orange-700">
              EDIT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
