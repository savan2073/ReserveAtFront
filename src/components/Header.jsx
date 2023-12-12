// Header.js

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import '../styles/Header.css'; // Upewnij się, że ścieżka do pliku CSS jest prawidłowa
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/ReserveAtLogoText.png';

function Header() {
  const userLoggedIn = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();


  const handleLogoClick = () => {
    navigate('/');
  }
  const handleLoginClick = () => {
    navigate('/login');
  }
  const handleBizClick = () => {
    navigate('/biz');
  }
  const handleUserProfileClick = () => {
    navigate(`/user-profile/${userId}`)
  }

  return (
      <header className="header">
        <div className="header-top">
          <div className="header-logo">
            <img src={logo} alt="ReserveAt Logo" className='logo' onClick={handleLogoClick}/>
          </div>
          <div className="header-user-actions">
            {userLoggedIn ? (
                <button className="profile-button" onClick={handleUserProfileClick}>
                  Profil
                </button>
            ) : (
                <button className="login-button" onClick={handleLoginClick}>
                  Zaloguj się / Załóż konto
                </button>
            )}
            <button className="add-business-button" onClick={handleBizClick}>DODAJ SWÓJ BIZNES</button>
          </div>
        </div>
        <div className="header-search-container">
          <div className="header-search">
            <input type="text" placeholder="Znajdź usługę" />
            <input type="text" placeholder="Gdzie?" />
            <button type="submit" className="search-button">Szukaj</button>
          </div>
          <div className="header-categories">
            <button className="category-button">Fryzjer</button>
            <button className="category-button">Barber shop</button>
            {/* ...dodaj resztę kategorii */}
          </div>
        </div>
      </header>
  );
}

export default Header;
