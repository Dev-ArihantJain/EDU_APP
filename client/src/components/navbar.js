import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../assets/logo.png'; 
import {getAuth,signOut} from "firebase/auth";
import {app} from "../firebase.js";
import { Link , useNavigate , useLocation} from 'react-router-dom';
import { set } from 'firebase/database';

const auth = getAuth(app);

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const smoothScroll = (targetPosition, duration) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
  
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
  
    requestAnimationFrame(animation);
  };

  const handleNavClick = (section) => {
    console.log(section);
    if (location.pathname === '/cart' || location.pathname === '/buy') {
      navigate('/');
      setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            const elementRect = element.getBoundingClientRect();
            const offset = -64; // Adjust as needed
            const duration = 500; // Duration in milliseconds
            const targetPosition = elementRect.top + window.scrollY + offset;
        
            smoothScroll(targetPosition, duration);
          } else {
              console.error(`Element with id "${section}" not found.`);
          }
      }, 500); // Delay to ensure page loads before scrolling
  } 
  };

  const handleLogoClick = () => {
    navigate('/');
      setTimeout(() => {
          const element = document.getElementById('home');
          if (element) {
            const elementRect = element.getBoundingClientRect();
            const offset = -64; // Adjust as needed
            const duration = 500; // Duration in milliseconds
            const targetPosition = elementRect.top + window.scrollY + offset;
        
            smoothScroll(targetPosition, duration);
          } else {
              console.error(`Element with id "${'home'}" not found.`);
          }
      }, );
  };


  return (
    <nav className="bg-blue-800 text-white shadow-md fixed w-full top-0 z-50 ">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <div onClick={() => handleLogoClick()} className="flex items-center cursor-pointer">
          <img src={logo} alt="Logo" className="h-12 w-12 mr-3" />
          <span className="text-2xl font-bold">EdTech</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <ScrollLink onClick={() => handleNavClick('home')} to="home" smooth={true} duration={500} offset={-64} className="hover:text-gray-300 cursor-pointer">
            Home
          </ScrollLink>
          <ScrollLink onClick={() => handleNavClick('courses')} to="courses" smooth={true} duration={500} offset={-64} className="hover:text-gray-300 cursor-pointer">
            Courses
          </ScrollLink>
          <ScrollLink onClick={() => handleNavClick('about')} to="about" smooth={true} duration={500} offset={-64} className="hover:text-gray-300 cursor-pointer">
            About Us
          </ScrollLink>
          <ScrollLink onClick={() => handleNavClick('contact')} to="contact" smooth={true} duration={500} className="hover:text-gray-300 cursor-pointer ">
            Contact
          </ScrollLink>
          <Link to="/cart">Cart</Link> {/* Cart Link */}
          <form className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 text-gray-700 rounded-l-lg border border-gray-300 focus:outline-none"
            />
            <button type="submit" onClick={(e) => { e.preventDefault(); alert('Search functionality goes here') }} className="bg-blue-600 px-4 py-2 rounded-r-lg text-white hover:bg-blue-700">
              Search
            </button>
          </form>
          <button
            onClick={() => signOut(auth)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex items-center focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-blue-800`}>
        <div className="flex flex-col items-center py-4">
          <ScrollLink onClick={() => {toggleMenu(); handleNavClick('home')}} to="home" smooth={true} duration={500} offset={-64} className="text-white py-2 hover:text-gray-300 cursor-pointer">
            Home
          </ScrollLink>
          <ScrollLink onClick={() => {toggleMenu();handleNavClick('courses')}} to="courses" smooth={true} duration={500} offset={-64} className="text-white py-2 hover:text-gray-300 cursor-pointer">
            Courses
          </ScrollLink>
          <ScrollLink onClick={() => {toggleMenu();handleNavClick('about')}} to="about" smooth={true} duration={500} offset={-64} className="text-white py-2 hover:text-gray-300 cursor-pointer">
            About Us
          </ScrollLink>
          <ScrollLink onClick={() => {toggleMenu();handleNavClick('contact')}} to="contact" smooth={true} duration={500} offset={-64} className="text-white py-2 hover:text-gray-300 cursor-pointer">
            Contact
          </ScrollLink>
          <Link onClick={() => {toggleMenu();}} to="/cart">Cart</Link> {/* Cart Link */}
          <form className="flex flex-col items-center mt-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none mb-2"
            />
            <button type="submit" onClick={(e) => { e.preventDefault(); alert('Search functionality goes here') }} className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700">
              Search
            </button>
          </form>
          <button
            onClick={() => signOut(auth)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg mt-4"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
