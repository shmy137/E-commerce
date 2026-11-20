import React from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useCarousel from "../hooks/scroll.js";
import ProductCard from "../components/productcard";
import Button from "../components/button";

function FeaturedProducts() {
  const navigate = useNavigate();

  const { data: products = [] } = useProducts();

  const { carouselRef, scroll } = useCarousel();

  const featuredProducts = products.filter(
    (product) => product.featured === true,
  );

  return (
    <section id="featredkicks" className="min-h-screen bg-background py-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Products
      </h2>

      <div className="relative mx-10">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3"
        >
          &#10094;
        </button>

        <div
          ref={carouselRef}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
        >
          {featuredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              className="min-w-[280px] sm:min-w-[320px] snap-start"
            />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3"
        >
          &#10095;
        </button>
      </div>

      <div className="flex justify-center mt-10">
        <Button onClick={() => navigate("/products")}>View All Products</Button>
      </div>
    </section>
  );
}

export default FeaturedProducts;
