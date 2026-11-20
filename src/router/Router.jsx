import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Navbar from "../components/Navbar.jsx";
import About from "../pages/About.jsx";
import Products from "../pages/Products.jsx";
import Footer from "../pages/Footer.jsx";
import FeaturedProducts from "../pages/FeaturedProducts.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";

function Router() {
  useEffect(() => {
    window.history.replaceState(null, "", "/");
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar />
      <main className="pt-12">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <FeaturedProducts />
                <Footer />
              </>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default Router;
