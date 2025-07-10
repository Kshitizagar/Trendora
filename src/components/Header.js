import React, { useState, useEffect } from 'react';
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Header({ products, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [visitCount, setVisitCount] = useState(0); // 👈 New state for visits
  const [uniqueVisitorCount, setUniqueVisitorCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  // Reset search on route change
  useEffect(() => {
    setSearchTerm('');
    setSuggestions([]);
  }, [location.pathname]);

  // Fetch visit count from backend
  useEffect(() => {
    fetch('https://appbackend-qmsw.onrender.com/api/stats') // 👈 https://appbackend-qmsw.onrender.com/  Use your backend URL
      .then(res => res.json())
      .then(data => {
        setVisitCount(data.totalVisits || 0);
        setUniqueVisitorCount(data.totalUniqueVisitors || 0);
      })
      .catch(err => console.error("Error fetching visit count:", err));
  }, []);

  // Handle search filtering
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setSuggestions([]);
      return;
    }

    const matches = products.filter(p =>
      p.name?.toLowerCase().includes(term)
    );
    setSuggestions(matches.slice(0, 5));
  }, [searchTerm, products]);

  const triggerSearch = (term) => {
    onSearch(term.trim().toLowerCase());
    setSuggestions([]);
  };

  const handleSuggestionClick = (name) => {
    setSearchTerm('');
    triggerSearch(name);
  };

  return (
    <header className="header">
      <div className="header-top">
        <h2 className="logo" onClick={() => navigate('/')}>King Deals</h2>
        <nav className="scroll-nav">
          <button className="nav-link" onClick={() => navigate('/')}>Home</button>
          <button className="nav-link" onClick={() => navigate('/offers')}>Offers</button>
          <button className="nav-link" onClick={() => navigate('/mens')}>Men</button>
          <button className="nav-link" onClick={() => navigate('/womens')}>Women</button>
        </nav>
      </div>

      <div className="search-box">
        <i className="fas fa-search search-icon" />
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              triggerSearch(searchTerm);
              setSearchTerm('');
            }
          }}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map(product => (
              <li key={product._id} onClick={() => handleSuggestionClick(product.name)}>
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="visit-counter">
        👁️ Total Visits: <strong>{visitCount}</strong>
        🧍 <strong>{uniqueVisitorCount}</strong> unique visitors
      </div>
    </header>

  );
}

export default Header;
