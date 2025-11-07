import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../hooks/CartContext";

const Header = () => {
    const { cartCount } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    // Apply theme to document body
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);
    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <header className="header app-container">
            <div className="brand">
                <div className="logo">DG</div>
                <div>
                    <div style={{ fontWeight: 700 }}>Dolce Store</div>
                    <div className="small">Your vibe. Your cart. Your Dolce.</div>
                </div>
            </div>

            <button className="menu-toggle" onClick={toggleMenu}>
                {menuOpen ? "✕" : "☰"}
            </button>

            <nav className={`nav ${menuOpen ? "open" : ""}`}>
                <NavLink to="/" end onClick={closeMenu}>
                    Home
                </NavLink>
                <NavLink to="/products" onClick={closeMenu}>
                    Products
                </NavLink>
                <NavLink to="/about" onClick={closeMenu}>
                    About
                </NavLink>
                <NavLink to="/contact" onClick={closeMenu}>
                    Contact
                </NavLink>
                <NavLink to="/cart" onClick={closeMenu}>
                🛒 Cart <span className="cart-count">{cartCount}</span>
                </NavLink>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    style={{
                        marginLeft: "10px",
                        border: "none",
                        background: "transparent",
                        color: "var(--accent)",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                    }}
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </nav>
        </header>
    );
};

export default Header;
