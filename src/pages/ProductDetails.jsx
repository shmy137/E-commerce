import { useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProdcut.js";
import useCart from "../hooks/useCart.js";

function ProductDetails() {
  const { id } = useParams();

  const { data: product, isLoading, error } = useProduct(id);

  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [message, setMessage] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setMessage("Please select a size");
      return;
    }

    const added = addToCart(product, selectedSize);
    setMessage(added ? "Product added to cart!" : " Out of Stock");
  };

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
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-4">{product.description}</p>

          <h2 className="text-2xl font-bold mt-6">₹{product.price}</h2>

          <p className="mt-6 font-semibold">Select Size</p>

          <div className="flex gap-3 mt-3 flex-wrap">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setMessage("");
                }}
                className={`border px-4 py-2 rounded-lg ${
                  selectedSize === size
                    ? "bg-accent text-white"
                    : "border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-8 inline-flex w-full max-w-sm self-start items-center justify-center rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-background transition-colors hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
          >
            Add to Cart
          </button>

          {message && <p className="mt-3 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
