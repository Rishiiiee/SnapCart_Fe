import { useCart } from "../context/CartProvider";
import axios from "axios";
import { useState } from "react";

export default function CartPage() {
  const { cart, updateCart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}order/razorpay/create`,
        {},
        { withCredentials: true }
      );

      const { razorpayOrder, key, order } = res.data;

      const options = {
        key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Snapcart",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}order/razorpay/verify`,
              response,
              { withCredentials: true }
            );
            alert("Payment successful!");
            clearCart();
          } catch (err) {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          email: "test@example.com",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to start checkout");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return <p className="p-6">Loading cart...</p>;
  if (cart.products.length === 0)
    return <p className="p-6">Your cart is empty</p>;

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6">Your Shopping Cart</h2>

      <div className="space-y-6">
        {cart.products.map((item) => (
          <div
            key={item.productId._id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.productId.name}</h3>
                <p className="text-zinc-600">₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateCart(item.productId._id, item.quantity - 1)
                }
                className="px-2 bg-gray-300 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateCart(item.productId._id, item.quantity + 1)
                }
                className="px-2 bg-gray-300 rounded"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-bold">₹{item.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.productId._id)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow">
        <h3 className="text-xl font-semibold">Total: ₹{cart.totalAmount}</h3>
        <div className="flex gap-4 mt-4">
          <button
            onClick={clearCart}
            className="px-6 py-2 bg-red-600 text-white rounded-lg"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
