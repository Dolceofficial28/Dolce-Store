import React, { useState } from "react";

const ProductCard = ({ product, onAdd }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Product Card */}
            <div className="product-card" title={product.title}>
                <img
                    src={product.image}
                    alt={`image-${product.title}`}
                    className="product-image"
                />
                <h4 className="product-title">{product.title}</h4>
                <p className="product-description">
                    {product.description.slice(0, 60)}...
                </p>
                <p className="product-price">${product.price.toFixed(2)}</p>

                <div className="card-actions">
                    <button className="view-btn" onClick={() => setOpen(true)}>
                        View Details
                    </button>
                    <button className="add-btn" onClick={() => onAdd(product)}>
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                        title={product.title}
                    >
                        <img
                            src={product.image}
                            alt={`image-${product.title}`}
                            className="modal-image"
                        />
                        <h3>{product.title}</h3>
                        <p className="modal-description">{product.description}</p>
                        <h4>${product.price.toFixed(2)}</h4>
                        <div className="modal-actions">
                            <button className="add-btn" onClick={() => onAdd(product)}>
                                Add to Cart
                            </button>
                            <button className="close-btn" onClick={() => setOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
