import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar";
import Preview from "./pages/preview";
import NavBarComponent from "./pages/navbar";
import Cards from "./pages/cards";
import Carousel from "./pages/carousel";
import Footer from "./pages/footer";
import Positioning from "./pages/positioning";
import Register from "./components/user_auth/Register";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      {/* <div className="bg-lime-400 w-full"> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/navbars" element={<NavBarComponent />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/positioning" element={<Positioning />} />
        <Route path="/register" element={<Register />} />

        {/* Add other routes here */}
      </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;

// import Dashboard from "./pages/dashboard";
// import Navbar from "./components/navbar";
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Preview from "./pages/preview"

// function App() {

//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Dashboard />,
//       errorElement: <div>404 Not Found</div>
//     },
//     {
//       path: '/preview',
//       element: <Preview />,
//     }

//   ])

//   return (
//     <>
//       <Navbar />
//       <div className="bg-lime-400 w-full">
//         <RouterProvider router={router} />
//       </div>
//     </>
//   );
// }

// export default App;
