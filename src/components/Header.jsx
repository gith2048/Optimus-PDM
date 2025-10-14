import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
     <Link to="/" className="flex items-center space-x-2">
  <img
    src="/assets/logo.png"
    alt="Optimus-PdM Logo"
    className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-transform duration-300 transform hover:scale-110 hover:rotate-3"
  />
  <span className="text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-300 hover:text-yellow-300">
    Optimus-PdM
  </span>
</Link>


        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/products" className="hover:text-yellow-300 transition">Products</Link>
         
          <Link to="/about" className="hover:text-yellow-300 transition">About Us</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
              <Link to="/logout" className="hover:text-yellow-300 transition">Logout</Link>
            </>
          ) : (
            <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-blue-600 px-4 pb-4 space-y-2 transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <Link to="/" className="block py-2 hover:text-yellow-300 transition">Home</Link>
        <Link to="/products" className="block py-2 hover:text-yellow-300 transition">Products</Link>
        <Link to="/projects" className="block py-2 hover:text-yellow-300 transition">Projects</Link>
        <Link to="/about" className="block py-2 hover:text-yellow-300 transition">About Us</Link>
        <Link to="/contact" className="block py-2 hover:text-yellow-300 transition">Contact</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="block py-2 hover:text-yellow-300 transition">Dashboard</Link>
            <Link to="/logout" className="block py-2 hover:text-yellow-300 transition">Logout</Link>
          </>
        ) : (
          <Link to="/login" className="block py-2 hover:text-yellow-300 transition">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
