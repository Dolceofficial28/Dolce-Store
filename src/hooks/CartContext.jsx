import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 👇 Using Vite environment variable (like your example)
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Async fetch function like your "getQuotes"
  async function getProducts() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
      return data;
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Fetch products once when app starts
  useEffect(() => {
    getProducts();
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart actions
  const addToCart = (product) => {
    if (!product || !product.id) return; // skip invalid data
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id, amount) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      )
    );

  const clearCart = () => setCart([]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        products,
        loading,
        error,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        cartCount,
        getProducts, // exported if needed elsewhere
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;