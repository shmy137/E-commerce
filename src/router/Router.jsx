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
import ScrolltoTop from "../components/scrolltoTop.jsx";
import About from "../pages/About.jsx";
import NotFound from "../pages/NotFound.jsx";
import Checkout from "../pages/Checkout.jsx";
import OrderSuccess from "../pages/OrderSuccess.jsx";
import Orders from "../pages/Order.jsx";

function Router() {
  return (
    <div>
      <ScrolltoTop />
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <FeaturedProducts />
                <Category />
                <Footer />
              </>
            }
          />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default Router;
