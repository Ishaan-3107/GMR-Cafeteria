import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Footer from './Footer';
import CafeCardList from './CafeCardList';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState("Delhi");

  return (
    <Router>

      <Navbar city={city} setCity={setCity} />
      <Routes>
        <Route path="/" element={
          <>
            <Home city={city}/>
            <CafeCardList />
          </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />

    </Router>

  );
}

export default App;
