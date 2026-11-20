
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-12 bg-accent z-50">
      <div className="relative flex items-center justify-between h-full px-4 md:px-6">

        {/* Logo */}
        <Link to="/" className="font-bold">
          KICK HOUSE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10">
          <Link to="/#home">Home</Link>
          <Link to="/#featredkicks">Products</Link>
          <Link to="/#footer">Footer</Link>
        </div>

        {/* Desktop Login */}
        <button className="hidden md:block mr-8">
          Login
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-5 py-5 bg-accent shadow-lg">
          <Link to="/#home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/#about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/#featredkicks" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/#footer" onClick={() => setMenuOpen(false)}>Footer</Link>
          <button onClick={() => setMenuOpen(false)}>Login</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
