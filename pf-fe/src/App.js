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
import Login from "./components/user_auth/Login";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/navbars" element={<NavBarComponent />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/positioning" element={<Positioning />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

