"use client"

import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to handle scrolling behavior
    const handleScroll = () => {
      // Check if page is scrolled down by 100px or more
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add event listener to handle scroll
    window.addEventListener('scroll', handleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll behavior
    });
  };

  return (
    // Render the button conditionally based on visibility state
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      Scroll to Top
    </button>
  );
};

export default ScrollToTopButton;
