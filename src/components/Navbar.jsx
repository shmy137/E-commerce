import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { ShoppingCart } from "lucide-react";  

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const { cartCount } = useCart();

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

        <Link to="/cart" className="relative flex items-center">
          <ShoppingCart size={24} />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Desktop Login and Register */}
        <div className="hidden md:flex items-center gap-5 mr-8">
          {user ? (
            <>
              <span>{user.name}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

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
          <Link to="/#home" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/#about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/#featredkicks" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link to="/#footer" onClick={() => setMenuOpen(false)}>
            Footer
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            {user ? (
              <>
                <span>{user.name}</span>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
