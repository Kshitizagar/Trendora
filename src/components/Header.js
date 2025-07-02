import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom'; // ✅ useLocation imported

function Header({ products, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation(); // ✅ define location

  // ✅ Clear search when route changes (Offers/Home etc.)
  useEffect(() => {
    setSearchTerm('');
    setSuggestions([]);
  }, [location.pathname]);

  useEffect(() => {
    const term = typeof searchTerm === 'string' ? searchTerm.trim().toLowerCase() : '';
    onSearch(term);

    if (!term) {
      setSuggestions([]);
      return;
    }

    const matches = products.filter(p =>
      p.name?.toLowerCase().includes(term)
    );

    setSuggestions(matches.slice(0, 5));
  }, [searchTerm, products, onSearch]);

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
  };

  return (
    <header className="header">
      <h2 className="logo">MyShop</h2>

      <nav>
        <button className="nav-link" onClick={() => window.location.href = '/'}>Home</button>
        {/* <Link to="/" className="nav-link">Home</Link> */}
        {/* <Link to="/offers" className="nav-link">Offers</Link> */}
        <button className="nav-link" onClick={() => window.location.href = '/offers'}>Offers</button>
      </nav>

      <div className="search-box">
        <i className="fas fa-search search-icon" />
       <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // ⛔ stop form submission
              onSearch(searchTerm); // trigger search
              setSearchTerm(''); // optional: clear box after search
            }
          }}
        />


        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map(product => (
              <li
                key={product._id}
                onClick={() => handleSuggestionClick(product.name)}
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
