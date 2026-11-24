import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function ProductCard({ product, className = "" }) {
  return (
    <div className={twMerge(
      "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300",
      className
    )}>

      {/* Shoe Image */}
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover cursor-pointer"
        />
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h2 className="text-lg font-bold hover:text-accent">
            {product.name}
          </h2>
        </Link>

        <p className="text-gray-500 text-sm mt-1">
          {product.description}
        </p>

        {/* <p className="text-sm mt-2">
          Sizes: {product.sizes?.join(", ")}
        </p> */}

        <div className="flex justify-between items-center mt-4">
          <h2 className="text-xl font-bold">₹{product.price}</h2>

          <button className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;