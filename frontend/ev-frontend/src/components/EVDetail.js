import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl, API_ENDPOINTS } from '../config/api';
import './EVDetail.css';
import LoanCalculator from './LoanCalculator';
import ReviewSection from './ReviewSection';

const EVDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ev, setEv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoanCalculator, setShowLoanCalculator] = useState(false);

  useEffect(() => {
    fetchEVDetail();
  }, [id]);

  const fetchEVDetail = async () => {
    try {
      const response = await axios.get(createApiUrl(`${API_ENDPOINTS.EVS}/${id}`));
      setEv(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch electric vehicle details');
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      // For demo purposes, using user ID 2 (customer)
      const userId = 2;
      await axios.post(createApiUrl(`${API_ENDPOINTS.CART}/${userId}/add`), {
        evId: parseInt(id),
        quantity: quantity
      });
      alert('Added to cart successfully!');
    } catch (err) {
      alert('Failed to add to cart');
    }
  };

  const calculateLoanPayment = () => {
    if (!ev) return 0;
    const principal = ev.price;
    const annualRate = 0.05; // 5% annual interest rate
    const years = 5; // 5-year loan
    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };

  if (loading) return <div className="loading">Loading electric vehicle details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!ev) return <div className="error">Electric vehicle not found</div>;

  const monthlyPayment = calculateLoanPayment();

  return (
    <div className="ev-detail">
      <button className="back-button" onClick={() => navigate('/evs')}>
        ← Back to Electric Vehicles
      </button>

      <div className="ev-detail-container">
        <div className="ev-image-section">
          {ev.imageUrl ? (
            <img src={ev.imageUrl} alt={ev.model} className="ev-detail-image" />
          ) : (
            <div className="placeholder-image-large">No Image Available</div>
          )}
        </div>

        <div className="ev-info-section">
          <h1>{ev.brand} {ev.model}</h1>
          <p className="ev-description">{ev.description}</p>
          
          <div className="ev-specs">
            <div className="spec-item">
              <span className="spec-label">Price:</span>
              <span className="spec-value">{ev.price != null ? `$${ev.price.toLocaleString()}` : 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Range:</span>
              <span className="spec-value">{ev.rangeKm} km</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Battery Capacity:</span>
              <span className="spec-value">{ev.batteryCapacityKwh} kWh</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Charging Time:</span>
              <span className="spec-value">{ev.chargingTimeHours} hours</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Category:</span>
              <span className="spec-value">{ev.category}</span>
            </div>
          </div>

          <div className="loan-calculator">
            <h3>Loan Calculator</h3>
            <p>Estimated monthly payment (5-year loan at 5% APR):</p>
            <p className="monthly-payment">${monthlyPayment.toFixed(2)}/month</p>
            <button 
              className="btn btn-secondary loan-calc-btn"
              onClick={() => setShowLoanCalculator(true)}
            >
              Calculate Custom Loan
            </button>
          </div>

          <div className="purchase-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>

            <div className="total-price">
              <span>Total: {(ev.price != null && quantity != null) ? `$${(ev.price * quantity).toLocaleString()}` : 'N/A'}</span>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary" onClick={addToCart}>
                Add to Cart
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/cart')}>
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="ev-features">
        <h3>Key Features</h3>
        <ul>
          <li>Electric powertrain with zero emissions</li>
          <li>Advanced battery technology for extended range</li>
          <li>Fast charging capabilities</li>
          <li>Smart connectivity features</li>
          <li>Advanced safety systems</li>
          <li>Regenerative braking</li>
        </ul>
      </div>
      
      {showLoanCalculator && (
        <LoanCalculator 
          vehiclePrice={ev.price} 
          onClose={() => setShowLoanCalculator(false)}
        />
      )}

      {/* Reviews Section */}
      <ReviewSection 
        evId={ev.id} 
        currentUser={{ id: 2, role: 'CUSTOMER' }} // For demo purposes
      />
    </div>
  );
};

export default EVDetail; 