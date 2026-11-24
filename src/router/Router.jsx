import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Navbar from "../components/Navbar.jsx";
import Products from "../pages/Products.jsx";
import Footer from "../pages/Footer.jsx";
import FeaturedProducts from "../pages/FeaturedProducts.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Cart from "../pages/Cart.jsx";
import Profile from "../pages/Profile.jsx";
import Category from "../pages/Category.jsx";

function Router() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Category />
                <FeaturedProducts />
                <Footer />
              </>
            }
          />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/cart" element={<Cart />}/>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default Router;
