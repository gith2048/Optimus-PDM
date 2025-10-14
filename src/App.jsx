import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home';

import Products from './pages/Products';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Auth from './pages/Auth';
import Dashboard from './components/Dashboard';
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) setCurrentUser(savedUser);
  }, []);

  return (
    <>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
      
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Login / Signup */}
          <Route
            path="/login"
            element={
              currentUser ? <Navigate to="/dashboard" /> : <Auth setCurrentUser={setCurrentUser} />
            }
          />
          <Route
            path="/signup"
            element={
              currentUser ? <Navigate to="/dashboard" /> : <Auth setCurrentUser={setCurrentUser} />
            }
          />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={currentUser ? <Dashboard currentUser={currentUser} /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
