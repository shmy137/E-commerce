import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Menu, ShoppingCart, X } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import ConfirmModal from "./ConfirmModal";
import Wishlist from "../pages/Wishlist";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const closeMenu = () => setMenuOpen(false);


   const [wishlistCount, setWishlistCount] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist") || "[]").length;
  });

  const linkClass =
    "rounded px-2 py-1 text-sm font-medium text-primary transition-colors hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

  // Open confirmation modal
  const handleLogout = () => {
    setShowConfirm(true);
  };

  // Logout after confirmation
  const confirmLogout = () => {
    logout();
    closeMenu();
    setShowConfirm(false);
  };

 

  useEffect(() => {
  const updateWishlistCount = (event) => {
    setWishlistCount(event.detail.length);
  };

  window.addEventListener("wishlistUpdated", updateWishlistCount);

  return () => {
    window.removeEventListener("wishlistUpdated", updateWishlistCount);
  };
}, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white text-primary shadow-sm">
      {/* Main Navbar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-lg font-black tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          KICK<span className="font-medium">HOUSE</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          <Link
            to="/#home"
            className={`${linkClass} inline-block transition-transform duration-200 hover:scale-105`}
          >
            Home
          </Link>

          <Link
            to="/#featredkicks"
            className={`${linkClass} inline-block transition-transform duration-200 hover:scale-105`}
          >
            Products
          </Link>

          <Link
            to="/profile"
            className={`${linkClass} inline-block transition-transform duration-200 hover:scale-105`}
          >
            My Profile
          </Link>

          <Link
            to="/orders"
            className={`${linkClass} inline-block transition-transform duration-200 hover:scale-105`}
          >
            Orders
          </Link>
        </div>

        {/* Cart, Login and Mobile Menu */}
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
          <Link
            to="/wishlist"
            className="relative rounded p-2 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Desktop Login / Logout */}
          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Logout
                </button>

                <span
                  className="max-w-36 truncate text-sm font-medium"
                  title={user.name}
                >
                  {user.name}
                </span>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded p-2 transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
          >
            {menuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 z-40 md:hidden ${
          menuOpen ? "visible" : "invisible"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        {/* Background Overlay */}
        <button
          type="button"
          aria-label="Close navigation menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
          className={`absolute inset-0 h-full w-full bg-primary/40 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sidebar */}
        <aside
          id="mobile-navigation"
          role="dialog"
          aria-modal={menuOpen}
          aria-label="Mobile navigation"
          className={`absolute bottom-0 right-0 top-0 flex w-[min(88vw,22rem)] flex-col bg-background p-6 text-primary shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-1 flex-col gap-2 py-2">
            <Link
              to="/#home"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-lg font-semibold transition hover:bg-accent/30"
            >
              Home
            </Link>

            <Link
              to="/#featredkicks"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-lg font-semibold transition hover:bg-accent/30"
            >
              Products
            </Link>

            <Link
              to="/profile"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-lg font-semibold transition hover:bg-accent/30"
            >
              My Profile
            </Link>

            <Link
              to="/orders"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-lg font-semibold transition hover:bg-accent/30"
            >
              Orders
            </Link>
          </div>

          {/* Mobile Login / Logout */}
          <div className="border-t border-primary/10 pt-5">
            {user ? (
              <div className="flex items-center justify-between gap-4">
                <span
                  className="min-w-0 truncate text-sm font-medium"
                  title={user.name}
                >
                  {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="shrink-0 rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold transition hover:bg-primary hover:text-background"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-background transition hover:bg-accent hover:text-primary"
              >
                Login
              </Link>
            )}
          </div>
        </aside>
      </div>

      {/* Reusable Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Logout?"
        message="Are you sure you want to logout? You will need to login again to access your account."
        confirmText="Yes, Logout"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={() => setShowConfirm(false)}
      />
    </nav>
  );
}

export default Navbar;
