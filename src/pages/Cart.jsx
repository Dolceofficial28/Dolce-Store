// src/pages/Cart.jsx
import React from "react";
import { useCart } from "../hooks/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    // destructure exactly what CartContext provides
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
        cartCount,
    } = useCart();

    // If the context is not provided correctly, guard fallback
    if (!cartItems) return <div className="app-container">Loading cart...</div>;

    return (
        <main className="app-container">
            <h2>Your Cart</h2>

            {cartItems.length === 0 ? (
                <div className="card" style={{ marginTop: 12 }}>
                    <h3 style={{ margin: 0 }}>Your cart is empty</h3>
                    <p className="small">Add items from the products page.</p>
                    <div style={{ marginTop: 12 }}>
                        <Link to="/products" className="btn">Browse Products</Link>
                    </div>
                </div>
            ) : (
                <div className="card" style={{ marginTop: 12 }}>
                    <div className="cart-list">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title || item.name} className="cart-thumb" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <div style={{ fontWeight: 700 }}>{item.title || item.name}</div>
                                            <div className="small">${(item.price || 0).toLocaleString()}</div>
                                        </div>

                                        <div style={{ textAlign: "right" }}>
                                            <div style={{ fontWeight: 700 }}>${((item.price || 0) * (item.quantity || 1)).toLocaleString()}</div>
                                            <div className="small">Subtotal</div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div className="qty-control">
                                            <button className="btn ghost" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                            <div style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb" }}>{item.quantity}</div>
                                            <button className="btn ghost" onClick={() => updateQuantity(item.id, +1)}>+</button>
                                        </div>

                                        <div style={{ display: "flex", gap: 8 }}>
                                            <button className="btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="total-row">
                        <div>
                            <div className="small">Items</div>
                            <div style={{ fontWeight: 700, fontSize: 20 }}>{cartCount}</div>
                        </div>

                        <div>
                            <div className="small">Total</div>
                            <div style={{ fontWeight: 700, fontSize: 20 }}>${(total || 0).toLocaleString()}</div>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                        <button className="btn ghost" onClick={clearCart}>Clear</button>
                        <Link to="/checkout">
                            <button className="btn">Proceed to Checkout</button>
                        </Link>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Cart;
