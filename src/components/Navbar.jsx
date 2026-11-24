import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const closeMenu = () => setMenuOpen(false);
  const linkClass =
    "rounded px-2 py-1 text-sm font-medium text-primary transition-colors hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white text-primary shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-lg font-black tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          KICK<span className="font-medium">HOUSE</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <Link to="/#home" className={linkClass}>Home</Link>
          <Link to="/#featredkicks" className={linkClass}>Products</Link>
          <Link to="/#footer" className={linkClass}>Footer</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            onClick={closeMenu}
            className="relative rounded p-2 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ShoppingCart size={21} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <>
                <button onClick={handleLogout} className="text-sm font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  Logout
                </button>
                <span className="max-w-36 truncate text-sm font-medium" title={user.name}>{user.name}</span>
              </>
            ) : (
              <Link to="/login" className="rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                Login
              </Link>
            )}
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded p-2 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="border-t border-black/10 bg-accent px-4 pb-5 pt-3 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link to="/#home" onClick={closeMenu} className={linkClass}>Home</Link>
            <Link to="/#featredkicks" onClick={closeMenu} className={linkClass}>Products</Link>
            <Link to="/#footer" onClick={closeMenu} className={linkClass}>Footer</Link>
            {user ? (
              <>
                <span className="px-2 py-2 text-sm text-primary/70">Signed in as {user.name}</span>
                <button onClick={handleLogout} className="self-start rounded px-2 py-1 text-sm font-semibold hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu} className="rounded px-2 py-1 text-sm font-medium hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
