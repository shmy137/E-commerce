
import { Link } from "react-router-dom";
import ProductCard from "../components/productcard.jsx";
import useProducts from "../hooks/useProducts.js";
import { useState, useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter.jsx";
import PriceFilter from "../components/PriceFilter.jsx";
import SearchBar from "../components/SearchBar.jsx";

function Products() {
  const { data: products = [], error, isLoading } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortOrder]);

  // Category and search filtering
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Price sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    }

    if (sortOrder === "high-to-low") {
      return b.price - a.price;
    }

    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

        {/* Search */}
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        {/* Filters and Sorting */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <PriceFilter
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />

        </div>

        {/* Loading */}
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
            <h2 className="text-xl font-bold">
              We couldn’t load the sneakers
            </h2>
            <p className="mt-2 text-sm text-primary/60">
              {error.message}
            </p>
          </div>

        ) : products.length === 0 ? (

          <div className="border border-primary/10 bg-white px-6 py-12 text-center">
            <h2 className="text-xl font-bold">
              No sneakers to show yet
            </h2>
            <p className="mt-2 text-sm text-primary/60">
              Check back soon for the next drop.
            </p>
          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="border border-primary/10 bg-white px-6 py-12 text-center">
            <h2 className="text-xl font-bold">
              No sneakers found
            </h2>
            <p className="mt-2 text-sm text-primary/60">
              No products match your search or selected category.
            </p>
          </div>

        ) : (

          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">

                {/* Previous */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border border-primary/20 px-4 py-2 text-sm font-medium transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-primary"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`h-10 w-10 border text-sm font-semibold transition ${
                        currentPage === pageNumber
                          ? "border-primary bg-primary text-white"
                          : "border-primary/20 hover:bg-primary hover:text-white"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border border-primary/20 px-4 py-2 text-sm font-medium transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-primary"
                >
                  Next
                </button>

              </div>
            )}

            {/* Product count */}
            <p className="mt-5 text-center text-sm text-primary/50">
              Showing {indexOfFirstProduct + 1} -{" "}
              {Math.min(indexOfLastProduct, sortedProducts.length)} of{" "}
              {sortedProducts.length} products
            </p>
          </>
        )}

      </div>
    </main>
  );
}

export default Products;
