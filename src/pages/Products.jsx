import React from "react";
import { useCart } from "../hooks/CartContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { products, loading, error, addToCart } = useCart();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="products-page">
      <h2 className="page-title">All Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
