import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}cart/getcart`, {
        withCredentials: true,
      });
      setCart(res.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}cart/addcart`,
        { productId, quantity },
        { withCredentials: true }
      );
      setCart(res.data.cart);

      // ✅ Toast success
      if (res.status === 201) {
        toast.success("Product added to cart!");
      } else {
        toast.success("Cart updated successfully!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      toast.error("Failed to add product to cart!");
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        return removeFromCart(productId); // ✅ remove instead of sending 0
      }
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}cart/update/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      setCart(res.data.cart);
      toast.success("Cart updated!");
    } catch (error) {
      console.error("Error updating cart:", error.message);
      toast.error("Failed to update cart!");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}cart/remove/${productId}`,
        { withCredentials: true }
      );
      setCart(res.data.cart);
      toast.success("Product removed!");
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
      toast.error("Failed to remove product!");
    }
  };

  const clearCart = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}cart/clear`,
        { withCredentials: true }
      );
      setCart(res.data.cart);
      toast.success("Cart cleared!");
    } catch (error) {
      console.error("Error clearing cart:", error.message);
      toast.error("Failed to clear cart!");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
