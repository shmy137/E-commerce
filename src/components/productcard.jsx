
import { useEffect, useState } from "react";
import { ArrowUpRight, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import formatPrice from "../utils/formatPrice";
import useAuth from "../hooks/useAuth";
import { readWishlist, saveWishlist } from "../utils/wishlist";

function ProductCard({ product, className = "" }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(
      readWishlist(user?.id).some((item) => item.id === product.id),
    );

    const updateWishlist = (event) => {
      setIsWishlisted(event.detail.some((item) => item.id === product.id));
    };

    window.addEventListener("wishlistUpdated", updateWishlist);
    return () => window.removeEventListener("wishlistUpdated", updateWishlist);
  }, [product.id, user?.id]);

  const toggleWishlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const wishlist = readWishlist(user.id);

    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    saveWishlist(user.id, updatedWishlist);

    setIsWishlisted(!isWishlisted);
  };

  return (
    <article
      className={twMerge(
        "group flex h-full flex-col overflow-hidden border border-primary/10 bg-white",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-background">
        <Link
          to={`/products/${product.id}`}
          className="block h-full w-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={isWishlisted}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
        >
          <Heart
            size={20}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-primary"
            }
          />
        </button>

        {product.quantity <= 0 && (
          <span className="absolute left-3 top-3 bg-primary px-3 py-1 text-xs font-semibold text-background">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Product Name and Category */}
        <Link
          to={`/products/${product.id}`}
          className="mt-2 text-lg font-bold leading-snug text-primary"
        >
          {product.name}

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/50">
            {product.category ? product.category : ""}
          </p>
        </Link>

        {/* Price and View Details */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          <Link
            to={`/products/${product.id}`}
            className="inline-flex shrink-0 items-center gap-1.5 bg-primary px-3.5 py-2.5 text-sm font-semibold text-background transition hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            View details
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
