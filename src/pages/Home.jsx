import React from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../hooks/CartContext";
import { Link } from "react-router-dom";

const Home = () => {
    const { products, addToCart } = useCart();
    const featured = products.slice(0, 4);

    return (
        <main className="app-container">
            <div className="hero card">
                <h2>Welcome to Dolce Store</h2>
                <p className="small">Discover sleek deals and timeless style — shop your favorites, add to cart, and make every click count.</p>
                <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                    <Link to="/products" className="btn">Browse Products</Link>
                    <Link to="/cart" className="btn ghost">Go to Cart</Link>
                </div>
            </div>

            <h3 style={{ marginTop: 12 }}>Featured</h3>
            <div className="products-grid" style={{ marginTop: 12 }}>
                {featured.map(p => (
                    <ProductCard key={p.id} product={p} onAdd={addToCart} />
                ))}
            </div>
        </main>
    );
};

export default Home;