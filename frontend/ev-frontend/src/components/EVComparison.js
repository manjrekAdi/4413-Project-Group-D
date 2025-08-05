import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl, API_ENDPOINTS } from '../config/api';
import './EVComparison.css';

const EVComparison = () => {
  const [evs, setEvs] = useState([]);
  const [selectedEV1, setSelectedEV1] = useState(null);
  const [selectedEV2, setSelectedEV2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewStats1, setReviewStats1] = useState({});
  const [reviewStats2, setReviewStats2] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchEVs();
  }, []);

  useEffect(() => {
    // Check for URL parameters to pre-select vehicles
    const params = new URLSearchParams(location.search);
    const ev1Id = params.get('ev1');
    const ev2Id = params.get('ev2');
    
    if (evs.length > 0) {
      if (ev1Id) {
        const ev1 = evs.find(e => e.id === parseInt(ev1Id));
        if (ev1) setSelectedEV1(ev1);
      }
      if (ev2Id) {
        const ev2 = evs.find(e => e.id === parseInt(ev2Id));
        if (ev2) setSelectedEV2(ev2);
      }
    }
  }, [evs, location.search]);

  useEffect(() => {
    if (selectedEV1) {
      fetchReviewStats(selectedEV1.id, setReviewStats1);
    }
  }, [selectedEV1]);

  useEffect(() => {
    if (selectedEV2) {
      fetchReviewStats(selectedEV2.id, setReviewStats2);
    }
  }, [selectedEV2]);

  const fetchEVs = async () => {
    try {
      const response = await axios.get(createApiUrl(API_ENDPOINTS.EVS));
      setEvs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch electric vehicles');
      setLoading(false);
    }
  };

  const fetchReviewStats = async (evId, setStats) => {
    try {
      const response = await axios.get(createApiUrl(`${API_ENDPOINTS.REVIEWS}/ev/${evId}/stats`));
      setStats(response.data);
    } catch (err) {
      setStats({ averageRating: 0, reviewCount: 0 });
    }
  };

  const handleEV1Change = (evId) => {
    const ev = evs.find(e => e.id === parseInt(evId));
    setSelectedEV1(ev);
  };

  const handleEV2Change = (evId) => {
    const ev = evs.find(e => e.id === parseInt(evId));
    setSelectedEV2(ev);
  };

  const addToCart = async (evId) => {
    try {
      const userId = 2; // For demo purposes
      await axios.post(createApiUrl(`${API_ENDPOINTS.CART}/${userId}/add`), {
        evId: evId,
        quantity: 1
      });
      alert('Added to cart successfully!');
    } catch (err) {
      alert('Failed to add to cart: ' + (err.response?.data?.error || err.message));
    }
  };

  const calculateMonthlyPayment = (price, years = 5, rate = 0.05) => {
    const principal = price;
    const monthlyRate = rate / 12;
    const numberOfPayments = years * 12;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };

  const renderSpecification = (label, value1, value2, unit = '', isPrice = false, isRange = false) => {
    const formatValue = (value) => {
      if (value === null || value === undefined) return 'N/A';
      if (isPrice) return `$${value.toLocaleString()}`;
      if (isRange) return `${value} km`;
      return `${value}${unit}`;
    };

    const getComparison = () => {
      if (!value1 || !value2) return null;
      if (isPrice) {
        const diff = value1 - value2;
        const percentage = ((diff / value2) * 100).toFixed(1);
        return diff > 0 ? `+$${diff.toLocaleString()} (+${percentage}%)` : `-$${Math.abs(diff).toLocaleString()} (-${Math.abs(percentage)}%)`;
      }
      if (isRange) {
        const diff = value1 - value2;
        const percentage = ((diff / value2) * 100).toFixed(1);
        return diff > 0 ? `+${diff} km (+${percentage}%)` : `${diff} km (${percentage}%)`;
      }
      return null;
    };

    const comparison = getComparison();

    return (
      <div className="spec-row">
        <div className="spec-label">{label}</div>
        <div className="spec-value ev1">{formatValue(value1)}</div>
        <div className="spec-value ev2">{formatValue(value2)}</div>
        {comparison && (
          <div className={`spec-comparison ${value1 > value2 ? 'better' : value1 < value2 ? 'worse' : 'equal'}`}>
            {comparison}
          </div>
        )}
      </div>
    );
  };

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : 'empty'}`}>
          ★
        </span>
      );
    }
    return <div className="star-rating">{stars}</div>;
  };

  if (loading) return <div className="loading">Loading electric vehicles...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="ev-comparison">
      <div className="comparison-header">
        <button className="back-button" onClick={() => navigate('/evs')}>
          ← Back to Electric Vehicles
        </button>
        <h1>Compare Electric Vehicles</h1>
        <p>Select two vehicles to compare their specifications side by side</p>
      </div>

      {/* Vehicle Selection */}
      <div className="vehicle-selection">
        <div className="selection-group">
          <label htmlFor="ev1-select">Select First Vehicle:</label>
          <select 
            id="ev1-select" 
            value={selectedEV1?.id || ''} 
            onChange={(e) => handleEV1Change(e.target.value)}
          >
            <option value="">Choose a vehicle...</option>
            {evs.map(ev => (
              <option key={ev.id} value={ev.id}>
                {ev.brand} {ev.model}
              </option>
            ))}
          </select>
        </div>

        <div className="selection-group">
          <label htmlFor="ev2-select">Select Second Vehicle:</label>
          <select 
            id="ev2-select" 
            value={selectedEV2?.id || ''} 
            onChange={(e) => handleEV2Change(e.target.value)}
          >
            <option value="">Choose a vehicle...</option>
            {evs.map(ev => (
              <option key={ev.id} value={ev.id}>
                {ev.brand} {ev.model}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      {selectedEV1 && selectedEV2 && (
        <div className="comparison-container">
          <div className="comparison-header-row">
            <div className="vehicle-header">
              <h2>{selectedEV1.brand} {selectedEV1.model}</h2>
              {selectedEV1.imageUrl ? (
                <img src={selectedEV1.imageUrl} alt={selectedEV1.model} className="vehicle-image" />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
              <div className="vehicle-actions">
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate(`/evs/${selectedEV1.id}`)}
                >
                  View Details
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => addToCart(selectedEV1.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="vehicle-header">
              <h2>{selectedEV2.brand} {selectedEV2.model}</h2>
              {selectedEV2.imageUrl ? (
                <img src={selectedEV2.imageUrl} alt={selectedEV2.model} className="vehicle-image" />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
              <div className="vehicle-actions">
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate(`/evs/${selectedEV2.id}`)}
                >
                  View Details
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => addToCart(selectedEV2.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="comparison-table">
            {/* Basic Information */}
            <div className="comparison-section">
              <h3>Basic Information</h3>
              {renderSpecification('Brand', selectedEV1.brand, selectedEV2.brand)}
              {renderSpecification('Model', selectedEV1.model, selectedEV2.model)}
              {renderSpecification('Category', selectedEV1.category, selectedEV2.category)}
            </div>

            {/* Pricing */}
            <div className="comparison-section">
              <h3>Pricing</h3>
              {renderSpecification('Price', selectedEV1.price, selectedEV2.price, '', true)}
              {renderSpecification('Monthly Payment (5yr loan)', 
                calculateMonthlyPayment(selectedEV1.price), 
                calculateMonthlyPayment(selectedEV2.price), 
                '', true)}
            </div>

            {/* Performance */}
            <div className="comparison-section">
              <h3>Performance & Range</h3>
              {renderSpecification('Range', selectedEV1.rangeKm, selectedEV2.rangeKm, '', false, true)}
              {renderSpecification('Battery Capacity', selectedEV1.batteryCapacityKwh, selectedEV2.batteryCapacityKwh, ' kWh')}
              {renderSpecification('Charging Time', selectedEV1.chargingTimeHours, selectedEV2.chargingTimeHours, ' hours')}
            </div>

            {/* Reviews */}
            <div className="comparison-section">
              <h3>Customer Reviews</h3>
              <div className="spec-row">
                <div className="spec-label">Average Rating</div>
                <div className="spec-value ev1">
                  {reviewStats1.averageRating ? (
                    <>
                      {reviewStats1.averageRating.toFixed(1)}/5
                      {renderStarRating(Math.round(reviewStats1.averageRating))}
                    </>
                  ) : 'No reviews'}
                </div>
                <div className="spec-value ev2">
                  {reviewStats2.averageRating ? (
                    <>
                      {reviewStats2.averageRating.toFixed(1)}/5
                      {renderStarRating(Math.round(reviewStats2.averageRating))}
                    </>
                  ) : 'No reviews'}
                </div>
              </div>
              <div className="spec-row">
                <div className="spec-label">Number of Reviews</div>
                <div className="spec-value ev1">{reviewStats1.reviewCount || 0}</div>
                <div className="spec-value ev2">{reviewStats2.reviewCount || 0}</div>
              </div>
            </div>

            {/* Description */}
            <div className="comparison-section">
              <h3>Description</h3>
              <div className="spec-row description-row">
                <div className="spec-label">Description</div>
                <div className="spec-value ev1">{selectedEV1.description}</div>
                <div className="spec-value ev2">{selectedEV2.description}</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="comparison-summary">
            <h3>Comparison Summary</h3>
            <div className="summary-points">
              {selectedEV1.price < selectedEV2.price && (
                <div className="summary-point better">
                  <strong>{selectedEV1.brand} {selectedEV1.model}</strong> is ${(selectedEV2.price - selectedEV1.price).toLocaleString()} cheaper
                </div>
              )}
              {selectedEV1.rangeKm > selectedEV2.rangeKm && (
                <div className="summary-point better">
                  <strong>{selectedEV1.brand} {selectedEV1.model}</strong> has {(selectedEV1.rangeKm - selectedEV2.rangeKm)} km more range
                </div>
              )}
              {selectedEV1.chargingTimeHours < selectedEV2.chargingTimeHours && (
                <div className="summary-point better">
                  <strong>{selectedEV1.brand} {selectedEV1.model}</strong> charges {(selectedEV2.chargingTimeHours - selectedEV1.chargingTimeHours)} hours faster
                </div>
              )}
              {reviewStats1.averageRating > reviewStats2.averageRating && (
                <div className="summary-point better">
                  <strong>{selectedEV1.brand} {selectedEV1.model}</strong> has better customer reviews
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {(!selectedEV1 || !selectedEV2) && (
        <div className="comparison-placeholder">
          <p>Please select two vehicles to compare</p>
        </div>
      )}
    </div>
  );
};

export default EVComparison; 