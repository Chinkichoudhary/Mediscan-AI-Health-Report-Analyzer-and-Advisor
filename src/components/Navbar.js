import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style.css';

function Navbar() {
  return (
    <header className="navbar-full">
      <div className="navbar-left">
        <img src="/mediscan-logo.png" alt="Mediscan logo" className="navbar-logo" />
        <span className="navbar-brand">Mediscan AI</span>
      </div>
      <nav className="navbar-right">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/analyze">Analyze</NavLink>
        <NavLink to="/how-it-works">How it works</NavLink>
        <NavLink to="/signin" className="navbar-login">Login / Sign Up</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
