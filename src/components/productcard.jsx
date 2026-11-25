import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function ProductCard({ product, className = "" }) {
  return (
    <article
      className={twMerge(
        "group flex h-full flex-col overflow-hidden border border-primary/10 bg-white",
        className,
      )}
    >
      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-background"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {product.quantity <= 0 && (
          <span className="absolute left-3 top-3 bg-primary px-3 py-1 text-xs font-semibold text-background">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Product Name and Category */}
        <Link
          to={`/products/${product.id}`}
          className="mt-2 text-lg font-bold leading-snug text-primary"
        >
          {product.name}

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/50">
            {product.category ? ` ${product.category}` : ""}
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
