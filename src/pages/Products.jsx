import { Link } from "react-router-dom";
import ProductCard from "../components/productcard.jsx";
import useProducts from "../hooks/useProducts.js";
import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter.jsx";

function Products() {
  const { data: products = [], error, isLoading } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background px-4 pb-16 pt-8 text-primary sm:px-6 sm:pt-10">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/#home"
          className="text-sm font-medium text-primary/55 transition hover:text-primary"
        >
          Home
        </Link>

        <header className="mb-8 mt-7 flex flex-col gap-4 border-b border-primary/10 pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary/55">
              KICKHOUSE COLLECTION
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
              All sneakers
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary/65 sm:text-base">
              Find your next everyday pair, from timeless classics to fresh new
              styles.
            </p>
          </div>

          {!isLoading && !error && (
            <p className="pb-1 text-sm font-medium text-primary/55">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "style" : "styles"}
            </p>
          )}
        </header>

        {!isLoading && !error && products.length > 0 && (
          <div className="mb-7 flex justify-end">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/3] bg-primary/5" />
                <div className="mt-4 h-4 w-2/3 bg-primary/10" />
                <div className="mt-3 h-3 w-1/2 bg-primary/5" />
                <div className="mt-5 h-4 w-1/3 bg-primary/10" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="border border-primary/10 bg-white px-6 py-12 text-center"
          >
            <h2 className="text-xl font-bold">We couldn’t load the sneakers</h2>
            <p className="mt-2 text-sm text-primary/60">{error.message}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="border border-primary/10 bg-white px-6 py-12 text-center">
            <h2 className="text-xl font-bold">No sneakers to show yet</h2>
            <p className="mt-2 text-sm text-primary/60">
              Check back soon for the next drop.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="border border-primary/10 bg-white px-6 py-12 text-center">
            <h2 className="text-xl font-bold">No sneakers found</h2>
            <p className="mt-2 text-sm text-primary/60">
              No products available in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Products;
