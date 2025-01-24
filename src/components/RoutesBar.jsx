import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AllCategories } from '../services/ProductService';

const RoutesBar = () => {
  const [categories, setCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(6); // Default value for large screens

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await AllCategories();
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 480) {
        setItemsToShow(2); // Smaller screens
      } else if (screenWidth <= 768) {
        setItemsToShow(4); // Medium screens
      } else {
        setItemsToShow(6); // Larger screens
      }
    };

    handleResize(); // Set initial state based on screen size
    window.addEventListener('resize', handleResize); // Listen for window resize
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < categories.length - itemsToShow) {
      setStartIndex(startIndex + 1);
    }
  };

  const displayedItems = categories.slice(startIndex, startIndex + itemsToShow);

  return (
    <div className="routesbar">
      <button className="shiftBtn" onClick={handlePrevious} disabled={startIndex === 0}>
        Previous
      </button>
      {displayedItems.map((category, index) => (
        <li className="routeitem" key={index}>
          <NavLink
            to={`/home/${category.toLowerCase()}`}
            style={{ textDecoration: 'none' }}
            className={({ isActive }) => {
              return 'routeitem' + (isActive ? ' clicked' : '');
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </NavLink>
        </li>
      ))}
      <button className="shiftBtn" onClick={handleNext} disabled={startIndex >= categories.length - itemsToShow}>
        Next
      </button>
    </div>
  );
};

export default RoutesBar;
