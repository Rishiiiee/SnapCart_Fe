import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}order/my-orders`, { withCredentials: true });
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  if (!orders.length) return <p className="p-6">No orders yet.</p>;

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="border p-4 rounded-lg shadow">
            <h3 className="font-bold">Order #{order._id}</h3>
            <p>Total: ₹{order.totalAmount}</p>
            <div className="grid grid-cols-2 gap-4 mt-3">
              {order.products.map(item => (
                <div key={item.productId._id} className="flex gap-3 items-center">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p>{item.productId.name}</p>
                    <p>₹{item.price} × {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
