import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarHandel from "./navbarHanndeler";
import CardHandeler from "./cardsHandel";
import CarouselHandeler from "./carouselHandel";
import FooterHandeler from "./footerHandel";
import axios from "axios";

function Preview() {
  const elements = [];
  for (let i = 1; i <= localStorage.count; i++) {
    const key = `el_order(${i})`;
    const value = localStorage.getItem(key);
    if (value) {
      elements.push(value);
    }
  }
  const navigate = useNavigate();

  const handleSave = async () => {
    const jwtToken = localStorage.getItem("Token");
    if (!jwtToken) {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key == "token" || key == "userId") continue;
        const value = localStorage.getItem(key);
        if (value) {
          data[key] = value;
        }
      }
      let variable = JSON.stringify(data);

      console.log(variable);
      console.log(JSON.parse(variable));
      if (
        localStorage.getItem("userId") === null ||
        localStorage.getItem("userId") === ""
      ) {
        alert("!please login first");
        navigate("/login");
      }
      try {
        const result = await axios.post(
          "https://pageforger.onrender.com/api/users/post",
          {
            userId: localStorage.getItem("userId"),
            data: variable,
          }
        );
        // console.log(result.data.foundItem);
        alert("user data is saved successfully!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      return;
    }

    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      if (value) {
        data[key] = value;
      }
    }
    console.log(data); // You can use the 'data' object as needed
  };

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
