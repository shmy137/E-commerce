// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <div className=" fixed top-0 w-full h-12 bg-accent">
//       <div className="relative flex items-center justify-between h-full px-6">
//         <h2>ONline Store</h2>
//         <div className="absolute left-1/2 -translate-x-1/2 flex gap-10">
//           <a href="#home">Home</a>
//           <a href="#about">About</a>
//           <a href="#products">Products</a>
//           <a href="#footer">Footer</a>
//         </div>
//         <button className="mr-8">Login</button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;



import React, { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-12 bg-accent z-50">
      <div className="relative flex items-center justify-between h-full px-4 md:px-6">

        {/* Logo */}
        <h2 className="font-bold">ONline Store</h2>

        {/* Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10">
          <a href="#home">Home</a>
          <a href="#featredkicks">Products</a>
          <a href="#footer">Footer</a>
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
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#footer" onClick={() => setMenuOpen(false)}>Footer</a>
          <button>Login</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
