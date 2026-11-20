import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProdcut.js"

function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error
  } = useProduct(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-xl"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-4">
            {product.description}
          </p>

          <h2 className="text-2xl font-bold mt-6">
            ₹{product.price}
          </h2>

          <p className="mt-4">
            Available Sizes: {product.sizes?.join(", ")}
          </p>

          <button className="bg-accent text-white px-6 py-3 rounded-lg mt-6 w-fit">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;