import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, createApiUrl, API_ENDPOINTS } from '../config/api';
import './EVList.css';

const EVList = () => {
  const [evs, setEvs] = useState([]);
  const [filteredEvs, setFilteredEvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewStats, setReviewStats] = useState({});
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    minRange: ''
  });
  const [sortBy, setSortBy] = useState('model');
  const navigate = useNavigate();

  // For demo purposes, using user ID 2 (customer)
  const userId = 2;

  useEffect(() => {
    fetchEVs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [evs, filters, sortBy]);

  const fetchEVs = async () => {
    try {
      const response = await axios.get(createApiUrl(API_ENDPOINTS.EVS));
      setEvs(response.data);
      
      // Fetch review stats for each EV
      const statsPromises = response.data.map(ev => 
        axios.get(createApiUrl(`${API_ENDPOINTS.REVIEWS}/ev/${ev.id}/stats`))
          .then(res => ({ [ev.id]: res.data }))
          .catch(() => ({ [ev.id]: { averageRating: 0, reviewCount: 0 } }))
      );
      
      const statsResults = await Promise.all(statsPromises);
      const stats = statsResults.reduce((acc, stat) => ({ ...acc, ...stat }), {});
      setReviewStats(stats);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch electric vehicles');
      setLoading(false);
    }
  };

  const addToCart = async (evId) => {
    try {
      await axios.post(createApiUrl(`${API_ENDPOINTS.CART}/${userId}/add`), {
        evId: evId,
        quantity: 1
      });
      alert('Added to cart successfully!');
    } catch (err) {
      alert('Failed to add to cart: ' + (err.response?.data?.error || err.message));
    }
  };

  const applyFilters = () => {
    let filtered = [...evs];

    // Apply brand filter
    if (filters.brand) {
      filtered = filtered.filter(ev => ev.brand.toLowerCase().includes(filters.brand.toLowerCase()));
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(ev => ev.category === filters.category);
    }

    // Apply price filters
    if (filters.minPrice) {
      filtered = filtered.filter(ev => ev.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(ev => ev.price <= parseFloat(filters.maxPrice));
    }

    // Apply range filter
    if (filters.minRange) {
      filtered = filtered.filter(ev => ev.rangeKm >= parseInt(filters.minRange));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'range':
          return b.rangeKm - a.rangeKm;
        case 'brand': {
          const aBrand = a.brand || '';
          const bBrand = b.brand || '';
          return aBrand.localeCompare(bBrand);
        }
        default: {
          const aModel = a.model || '';
          const bModel = b.model || '';
          return aModel.localeCompare(bModel);
        }
      }
    });

    setFilteredEvs(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      minRange: ''
    });
  };

  if (loading) return <div className="loading">Loading electric vehicles...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="ev-list">
      <div className="ev-list-header">
        <h2>Electric Vehicles</h2>
        <div className="header-actions">
          <Link to="/compare" className="compare-link">
            🔍 Compare EVs
          </Link>
          <Link to="/loan-calculator" className="loan-calc-link">
            💰 Loan Calculator
          </Link>
        </div>
      </div>
      
      {/* Filters */}
      <div className="filters">
        <h3>Filters</h3>
        <div className="filter-row">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={filters.brand}
            onChange={handleFilterChange}
          />
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="COMPACT">Compact</option>
            <option value="SEDAN">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="LUXURY">Luxury</option>
            <option value="SPORTS">Sports</option>
          </select>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="minRange"
            placeholder="Min Range (km)"
            value={filters.minRange}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-actions">
          <button onClick={clearFilters}>Clear Filters</button>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="model">Sort by Model</option>
            <option value="brand">Sort by Brand</option>
            <option value="price">Sort by Price (Low to High)</option>
            <option value="range">Sort by Range (High to Low)</option>
          </select>
        </div>
      </div>

      {/* EV Grid */}
      <div className="ev-grid">
        {filteredEvs.map(ev => (
          <div key={ev.id} className="ev-card">
            <div className="ev-image">
              {ev.imageUrl ? (
                <img src={ev.imageUrl} alt={ev.model} />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
            </div>
            <div className="ev-info">
              <h3>{ev.brand} {ev.model}</h3>
              <p className="price">{ev.price != null ? `$${ev.price.toLocaleString()}` : 'N/A'}</p>
              <p className="range">Range: {ev.rangeKm} km</p>
              <p className="battery">Battery: {ev.batteryCapacityKwh} kWh</p>
              <p className="charging">Charging: {ev.chargingTimeHours} hours</p>
              <p className="category">{ev.category}</p>
              <div className="ev-actions">
                <Link to={`/evs/${ev.id}`} className="btn btn-primary">View Details</Link>
                <button className="btn btn-secondary" onClick={() => addToCart(ev.id)}>Add to Cart</button>
                <button 
                  className="btn btn-tertiary" 
                  onClick={() => navigate(`/compare?ev1=${ev.id}`)}
                  title="Compare this vehicle"
                >
                  Compare
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvs.length === 0 && (
        <div className="no-results">
          <p>No electric vehicles found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EVList; 