import useCart from "../hooks/useCart";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
        <p className="text-gray-500 mt-4">Add some shoes to your cart!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartCount})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex flex-col sm:flex-row gap-5 border rounded-xl p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-36 h-36 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>

                <p className="text-gray-500 mt-2">Size: {item.size}</p>

                <p className="font-semibold mt-2">₹{item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity - 1)
                    }
                    className="border px-3 py-1 rounded disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity + 1)
                    }
                    className="border px-3 py-1 rounded"
                    disabled={
                      item.quantity >=
                      (item.stock ?? item.quantity) -
                        cartItems
                          .filter(
                            (otherItem) =>
                              otherItem.id === item.id &&
                              otherItem.size !== item.size,
                          )
                          .reduce((total, otherItem) => total + otherItem.quantity, 0)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-red-500 mt-4"
                >
                  Remove
                </button>
              </div>

              <div className="font-bold">₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="flex justify-between mb-4">
            <span>Total Items</span>
            <span>{cartCount}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button className="bg-accent text-white w-full py-3 rounded-lg mt-6">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
