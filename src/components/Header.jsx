import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header className="header">
      <div className="logo">
        <span style={{color:"black", fontSize:"30px"}}>F</span>un <span style={{color:"black", fontSize:"30px"}}>Q</span>uiz
      </div>
      
      <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
        <ul>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/take" onClick={() => setIsOpen(false)}>Take Quiz</Link></li>
          <li><Link to="/create" onClick={() => setIsOpen(false)}>Create Quiz</Link></li>
          <li><Link to="/result" onClick={() => setIsOpen(false)}>Results</Link></li>
        </ul>
      </nav>

      <div className="menu-toggle" onClick={toggleMenu}>
        {/* Hamburger icon */}
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>
    </header>
  );
}

export default Header;
