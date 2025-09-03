import { Link } from "react-router-dom";
export default function PaymentCancel() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold">Payment Canceled</h2>
      <p className="mt-2">No worries, your cart is saved.</p>
      <Link className="text-blue-600 underline mt-4 inline-block" to="/cart">
        Back to Cart
      </Link>
    </div>
  );
}
