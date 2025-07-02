import React, { useEffect, useState } from 'react';
import './Offers.css';

function Offers({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [offerActive, setOfferActive] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const start = new Date();
      const end = new Date();

      start.setHours(0, 0, 0, 0);   // 8:00 AM
      end.setHours(22, 0, 0, 0);    // 2:00 PM

      if (now >= start && now < end) {
        setOfferActive(true);
        const diff = end - now;
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setOfferActive(false);
        setTimeLeft('');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // 💡 Local search filtering within offers only
  const categoryAProducts = products.filter(p => p.category === 'A');
  const filteredProducts = categoryAProducts.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="offer-container">
      <h1>🔥 Limited Time Offer (8:00 AM - 2:00 PM)</h1>
      {offerActive ? (
        <>
          <p className="timer">Offer ends in: <strong>{timeLeft}</strong></p>

          {/* Independent Search Bar for Offers */}
          <input
            type="text"
            placeholder="Search offers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="offer-search-bar"
          />

          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <div className="product-box" key={product._id}>
                <div className="id-category">
                  <p><strong>ID:</strong> {index + 1}</p>
                  <p>{product.category}</p>
                </div>
                <img src={product.image_link} alt={product.name} className="product-image" />
                <p>{product.description.split(" ").slice(0, 7).join(" ")}...</p>
                <p>Price: ₹{product.price}</p>
                <button className="buy-button" onClick={() => window.open(product.product_link, '_blank')}>
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="timer ended">
          Offers are available only from <strong>8:00 AM to 2:00 PM</strong>. Please check back later!
        </p>
      )}
    </div>
  );
}

export default Offers;