// src/components/MensClothing.js
import React from 'react';

function MensClothing({ products }) {
  const mensProducts = products.filter(p => p.category?.toLowerCase() === 'd');

  return (
    <div className="container">
      <h1>Men's Clothing</h1>
      <div className="product-grid">
        {mensProducts.map((product, index) => (
          <div className="product-box" key={product._id}>
            <div className="id-category">
              <p><strong>ID:</strong> {index + 1}</p>
              <p>{product.category}</p>
            </div>
            <img
              src={product.image_link}
              alt={product.name}
              className="product-image"
            />
            <p>{product.description.split(" ").slice(0, 7).join(" ")}...</p>
            <p>Price: ₹{product.price}</p>
            <button
              className="buy-button"
              onClick={() => window.open(product.product_link, '_blank')}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MensClothing;
