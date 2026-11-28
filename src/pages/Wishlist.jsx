
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "../components/productcard.jsx";
import useAuth from "../hooks/useAuth";
import { readWishlist } from "../utils/wishlist";

function Wishlist() {
  const { user, loading } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // Update the page whenever a product is added or removed
  useEffect(() => {
    setWishlist(readWishlist(user?.id));

    const updateWishlist = (event) => {
      setWishlist(event.detail);
    };

    window.addEventListener("wishlistUpdated", updateWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlist);
    };
  }, [user?.id]);

  if (loading) {
    return <main className="min-h-screen bg-background px-4 py-12">Loading...</main>;
  }

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
        <Heart size={44} className="mb-4 text-primary/25" />
        <h1 className="text-2xl font-bold text-primary">Log in to view your wishlist</h1>
        <p className="mt-2 text-primary/60">Your saved products are private to your account.</p>
        <Link to="/login" className="mt-6 bg-primary px-6 py-3 font-semibold text-background transition hover:bg-accent hover:text-primary">
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <Heart className="text-red-500" />
            <p className="text-sm font-semibold uppercase tracking-widest text-primary/50">
              Your favourites
            </p>
          </div>

          <h1 className="text-3xl font-bold text-primary sm:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-2 text-primary/60">
            {wishlist.length} {wishlist.length === 1 ? "product" : "products"} saved
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
            <Heart size={48} className="mb-4 text-primary/20" />

            <h2 className="text-xl font-bold text-primary">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-primary/60">
              Save your favourite shoes and find them here.
            </p>

            <Link
              to="/products"
              className="mt-6 bg-primary px-6 py-3 font-semibold text-background transition hover:bg-accent hover:text-primary"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Wishlist;
