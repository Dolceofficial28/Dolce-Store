import React, { useState } from "react";
import { useCart } from "../hooks/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cartItems, total, clearCart } = useCart();
    const [formData, setFormData] = useState({ name: "", email: "", address: "" });
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        clearCart();

        // Simulate small delay before redirect
        setTimeout(() => {
            navigate("/");
        }, 4000);
    };

    if (submitted) {
        return (
            <div className="app-container">
                <h2>🎉 Order Successful!</h2>
                <p>Thank you <strong>{formData.name || "Customer"}</strong> for your purchase.</p>
                <p>Your items will be shipped to:</p>
                <p style={{ fontWeight: 500 }}>{formData.address}</p>
                <p style={{ color: "var(--muted)", marginTop: "10px" }}>
                    Redirecting you back to Home...
                </p>
            </div>
        );
    }

    return (
        <div className="app-container">
            <h2>Checkout</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty. Go back to <a href="/products">products</a>.</p>
            ) : (
                <div className="grid" style={{ gap: "24px" }}>
                    <div>
                        <h3>Order Summary</h3>
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-thumb" />
                                <div>
                                    <div>{item.name}</div>
                                    <div className="small">
                                        {item.quantity} × ₦{item.price.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="total-row">
                            <strong>Total</strong>
                            <strong>₦{total.toLocaleString()}</strong>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <h3>Shipping Details</h3>
                        <input
                            className="input"
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="input"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            className="input"
                            name="address"
                            placeholder="Delivery Address"
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <button type="submit" className="btn">
                            Confirm Order
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Checkout;
