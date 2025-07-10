import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Footer from "./Footer";
import CafeCardList from "./CafeCardList";
// import VendorList from "./VendorList";
import CafeteriaMenu from "./CafeteriaMenu";
import { useState, useEffect } from "react";
import OfferBanner from "./OfferBanner";

function App() {
  const [city, setCity] = useState(() => {
    // Get city from localStorage or default to "Delhi"
    return localStorage.getItem("selectedCity") || "Delhi";
  });

  useEffect(() => {
    // Update localStorage whenever city changes
    localStorage.setItem("selectedCity", city);
  }, [city]);

  return (
    <div className="app-container">
      <Router>
        <Navbar city={city} setCity={setCity} />
        <OfferBanner />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home city={city} />
                  {city ? <CafeCardList city={city} /> : <p>Loading...</p>}
                </>
              }
            />
            <Route path="/cafeteria/:id" element={<CafeteriaMenu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
