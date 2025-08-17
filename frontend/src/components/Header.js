import React from 'react';
import Logo from './Logo';
import { FiHome } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <Logo />
        <nav className="main-nav">
          <ul>
            <li className="active">
              <FiHome className="nav-icon" />
              <span>Home</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
