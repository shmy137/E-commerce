import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import useCart from "../hooks/useCart";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const total = subtotal;
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background px-4 py-9 text-primary sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
       

        {/* Heading */}
        <h1 className="mb-6 border-b border-primary/15 pb-5 text-3xl font-semibold">
          My Cart
        </h1>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <section className="flex min-h-72 flex-col items-center justify-center border border-primary/10 bg-white px-6 py-12 text-center">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>

            <p className="mt-2 text-sm text-primary/60">
              Add a pair from the collection to get started.
            </p>

            <Link
              to="/#featredkicks"
              className="mt-6 bg-accent px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-background"
            >
              Browse Shoes
            </Link>
          </section>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(290px,0.9fr)] xl:gap-8">
            {/* Cart Items */}
            <section
              aria-label="Cart items"
              className="border border-primary/10 bg-white px-5 sm:px-7"
            >
              <h2 className="border-b border-primary/15 py-5 text-base font-semibold">
                My Cart ({cartCount})
              </h2>

              <div>
                {cartItems.map((item) => {
                  const quantityForOtherSizes = cartItems
                    .filter(
                      (other) =>
                        other.id === item.id && other.size !== item.size,
                    )
                    .reduce((total, other) => total + other.quantity, 0);

                  const stock = item.stock ?? item.quantity;

                  const canIncrease =
                    item.quantity + quantityForOtherSizes < stock;

                  return (
                    <article
                      key={`${item.id}-${item.size}`}
                      className="grid grid-cols-[90px_minmax(0,1fr)] gap-4 border-b border-primary/10 py-6 last:border-b-0 sm:grid-cols-[100px_minmax(0,1fr)_auto] sm:items-center sm:gap-5"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/products/${item.id}`}
                        className="row-span-2 block h-[90px] w-[90px] overflow-hidden border border-primary/10 bg-white sm:row-span-1 sm:h-[100px] sm:w-[100px]"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-2"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="min-w-0 self-center">
                        <Link
                          to={`/products/${item.id}`}
                          className="text-sm font-semibold leading-snug hover:underline"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-1 text-xs text-primary/55">
                          {item.brand}
                        </p>

                        {item.color && (
                          <p className="mt-1 text-xs text-primary/55">
                            Color: {item.color}
                          </p>
                        )}

                        <p className="mt-1 text-xs text-primary/55">
                          Size: {item.size}
                        </p>

                     
                        <span className="text-sm font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="col-span-2 mt-3 flex min-w-0 items-center justify-between gap-3 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:mt-0 sm:flex-col sm:items-end">
                        {/* Quantity */}
                        <div className="flex h-8 items-center border border-primary/15">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity - 1,
                              )
                            }
                            className="flex h-full w-8 items-center justify-center transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="min-w-7 text-center text-sm">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            aria-label="Increase quantity"
                            disabled={!canIncrease}
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity + 1,
                              )
                            }
                            className="flex h-full w-8 items-center justify-center bg-primary text-background transition hover:bg-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Item Total and Remove */}
                        <div className="flex items-center gap-3">
                          

                          <button
                            type="button"
                            aria-label={`Remove ${item.name}`}
                            title={`Remove ${item.name}`}
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="flex min-h-10 shrink-0 items-center justify-center gap-1 rounded-sm px-2 text-xs text-primary/60 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          >
                            <X size={13} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Order Summary */}
            <aside className="border border-primary/10 bg-white px-5 py-5 sm:px-6">
              <h2 className="border-b border-primary/15 pb-4 text-lg font-semibold">
                Your Order
              </h2>

              {/* Subtotal */}
              <div className="flex justify-between gap-4 py-5 text-sm">
                <span className="text-primary/65">
                  Subtotal ({cartCount} items)
                </span>

                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>

             

              {/* Total */}
              <div className="flex justify-between border-t border-primary/10 py-5 text-base font-semibold">
                <span>Total Payable</span>

                <span>{formatPrice(total)}</span>
              </div>

              <p className="text-xs leading-relaxed text-primary/50">
                Shipping and payment details will be added at checkout.
              </p>

              {/* Checkout */}
              <button
                type="button"
                disabled
                title="Checkout is not available yet"
                className="mt-6 w-full cursor-not-allowed bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-primary/55"
              >
                Checkout Coming Soon
              </button>

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="mt-4 block text-center text-sm text-primary/60 underline underline-offset-4 transition hover:text-primary"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;
