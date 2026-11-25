import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-3xl font-bold">
        Order Placed Successfully!
      </h1>

      <p className="mt-3 text-primary/60">
        Thank you for shopping with us.
      </p>

      <Link
        to="/products"
        className="mt-6 bg-accent px-6 py-3 font-semibold"
      >
        Continue Shopping
      </Link>
    </main>
  );
}

export default OrderSuccess;