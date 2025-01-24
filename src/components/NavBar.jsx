import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaCartPlus, FaUser, FaReceipt } from 'react-icons/fa';

function NavBar() {
  const [activeIcon, setActiveIcon] = useState('');

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <div>
      <nav className="navBar">
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <h1 className="navLogo">RealMart-Shopping</h1>
        </Link>
        <div className="navbarrightside">
          <NavLink
            to="/info/orders"
            style={{ textDecoration: 'none' }}
            onClick={() => handleIconClick('orders')}
            className={({ isActive }) => {
              return (
                'iconoutline ' + (activeIcon === 'orders' ? 'selected' : '')
              );
            }}
          >
            <FaReceipt className="icon" />
          </NavLink>
          <NavLink
            to="/info/cart"
            style={{ textDecoration: 'none' }}
            onClick={() => handleIconClick('cart')}
            className={({ isActive }) => {
              return (
                'iconoutline ' + (activeIcon === 'cart' ? 'selected' : '')
              );
            }}
          >
            <FaCartPlus className="icon" />
          </NavLink>
          <NavLink
            to="/info/profile"
            style={{ textDecoration: 'none' }}
            onClick={() => handleIconClick('profile')}
            className={({ isActive }) => {
              return (
                'iconoutline ' + (activeIcon === 'profile' ? 'selected' : '')
              );
            }}
          >
            <FaUser className="icon" />
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
