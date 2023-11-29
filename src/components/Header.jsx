// Header.js

import React, { useState, useEffect } from 'react';
import '../styles/Header.css'; // Upewnij się, że ścieżka do pliku CSS jest prawidłowa

function Header() {
  // Logika dla zmiany stylów po przewinięciu
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-top">
        <div className="header-logo">
          <img src="/path-to-your-logo.png" alt="Logo" />
        </div>
        <div className="header-user-actions">
              
          <button className="login-button">Zaloguj się / Załóż konto</button>
          <button className="add-business-button">DODAJ SWÓJ BIZNES</button>
        </div>
      </div>
      {!isScrolled && (
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
      )}
    </header>
  );
}

export default Header;
