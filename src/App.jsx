import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./hooks/CartContext";

function App() {
  return (
    <div>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>

      <footer className="footer">
        <div className="app-container">
          Engineered with ⚙️ precision and ❤️ by Dolce-Tech — empowering the future with smart innovation.
        </div>
      </footer>
    </div>
  );
}

export default App;