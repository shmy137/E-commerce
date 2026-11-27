
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import {
  createOrder,
  getUserAddress,
  updateUserAddress,
} from "../services/orderService";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(true);

  // Calculate total price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Load previously saved address
  useEffect(() => {
    if (!user) {
      setAddressLoading(false);
      return;
    }

    const loadAddress = async () => {
      try {
        const userData = await getUserAddress(user.id);

        setAddress(userData.address || "");
        setPhone(userData.phone || "");
      } catch (error) {
        console.error("Address loading failed:", error);
      } finally {
        setAddressLoading(false);
      }
    };

    loadAddress();
  }, [user?.id]);

  // Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      // Save latest address and phone
      await updateUserAddress(user.id, address, phone);

      // Prepare order details
      const orderData = {
        userId: user.id,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          size: item.size,
          quantity: item.quantity,
        })),
        address,
        phone,
        total,
        status: "Pending",
        orderDate: new Date().toISOString(),
      };

      // Create order
      await createOrder(orderData);

      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Unable to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Login check
  if (!user) {
    return (
      <div className="p-10 text-center">
        <h2>Please login to continue</h2>
        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-primary">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 border-b pb-5 text-3xl font-semibold">
          Checkout
        </h1>

        {addressLoading ? (
          <p className="py-10 text-center">
            Loading delivery details...
          </p>
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="space-y-5 border border-primary/10 bg-white p-6"
          >
            <h2 className="text-xl font-semibold">
              Delivery Details
            </h2>

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={user.name || ""}
                disabled
                className="w-full border p-3"
              />
            </div>

            {/* Address */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Delivery Address
              </label>
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your complete address"
                rows={4}
                className="w-full border p-3"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full border p-3"
              />
            </div>

            {/* Total */}
            <div className="border-t pt-5">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Place Order */}
            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="w-full bg-accent p-3 font-bold uppercase transition hover:bg-primary hover:text-background disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

export default Checkout;
