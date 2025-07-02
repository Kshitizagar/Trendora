
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Offers from './components/Offers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch product data from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); // Show all by default
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  // 🔍 Handle search filtering
  const handleSearch = (searchTerm) => {
    if (!searchTerm || typeof searchTerm !== 'string' || !searchTerm.trim()) {
      setFilteredProducts(products); // Reset to all if input is empty
      return;
    }

    const term = searchTerm.toLowerCase();

    const matched = products.filter(p =>
      p.name?.toLowerCase().includes(term)
    );

    const unmatched = products.filter(p =>
      !p.name?.toLowerCase().includes(term)
    );

    setFilteredProducts([...matched, ...unmatched]); // Match first
  };

  return (
    <Router>
      <Header products={products} onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <h1>Product Catalog</h1>
              <div className="product-grid">
                {filteredProducts.map((product, index) => (
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
          }
        />
        <Route
          path="/offers"
          element={<Offers products={products} />}
        />
      </Routes>
    </Router>
  );
}

export default App;