import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserOrders, updateOrderStatus } from "../services/orderService";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch logged-in user's orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUserOrders(user.id);

        setOrders(
          data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)),
        );
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  const handleCancelOrder = async (orderId) => {
    try {
      setCancellingId(orderId);

      await updateOrderStatus(orderId, "Cancelled");

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Cancelled" } : order,
        ),
      );
    } catch (err) {
      console.error("Cancel order failed:", err);
      setError("Unable to cancel order. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  // Login check
  if (!user) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 text-primary">
        <h2 className="text-2xl font-semibold">Please Login</h2>

        <p className="mt-2 text-sm text-primary/60">
          Login to view your orders.
        </p>

        <Link to="/login" className="mt-5 bg-accent px-6 py-3 font-semibold">
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-9 text-primary sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h1 className="mb-6 border-b border-primary/15 pb-5 text-3xl font-semibold">
          My Orders
        </h1>

        {loading ? (
          <p className="py-16 text-center text-primary/60">
            Loading your orders...
          </p>
        ) : error ? (
          <p className="py-16 text-center text-red-600">{error}</p>
        ) : orders.length === 0 ? (
          /* Empty Orders */
          <section className="flex min-h-72 flex-col items-center justify-center border border-primary/10 bg-white px-6 py-12 text-center">
            <h2 className="text-xl font-semibold">No orders yet</h2>

            <p className="mt-2 text-sm text-primary/60">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/products"
              className="mt-6 bg-accent px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-background"
            >
              Explore Products
            </Link>
          </section>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => (
              <section
                key={order.id}
                className="border border-primary/10 bg-white px-5 sm:px-7"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 py-5">
                  <div>
                    <h2 className="font-semibold">Order #{order.id}</h2>

                    <p className="mt-1 text-xs text-primary/50">
                      {new Date(order.orderDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Status and Cancel Button */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold ${
                        order.status === "Cancelled"
                          ? "bg-red-50 text-red-600"
                          : order.status === "Delivered"
                            ? "bg-green-50 text-green-700"
                            : order.status === "Shipped"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>

                    {order.status === "Pending" && (
                      <button
                        type="button"
                        disabled={cancellingId === order.id}
                        onClick={() => handleCancelOrder(order.id)}
                        className="border border-red-500 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {cancellingId === order.id
                          ? "Cancelling..."
                          : "Cancel Order"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Products */}
                <div>
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size}-${index}`}
                      className="flex items-center gap-4 border-b border-primary/10 py-5 last:border-b-0"
                    >
                      {/* Product Image */}
                      <div className="h-20 w-20 shrink-0 border border-primary/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold">{item.name}</h3>

                        <p className="mt-1 text-xs text-primary/55">
                          Size: {item.size}
                        </p>

                        <p className="mt-1 text-xs text-primary/55">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-2 text-sm font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary/10 py-5">
                  <span className="text-sm text-primary/60">Total Amount</span>

                  <span className="text-lg font-bold">
                    {formatPrice(order.total)}
                  </span>
                </div>

                {/* Delivery Details */}
                <div className="border-t border-primary/10 py-4 text-xs text-primary/55">
                  <p>Delivery Address: {order.address}</p>

                  <p className="mt-1">Phone: {order.phone}</p>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Orders;
