import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl, API_ENDPOINTS } from '../config/api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    creditCardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    phoneNumber: ''
  });

  // For demo purposes, using user ID 2 (customer)
  const userId = 2;

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(createApiUrl(`${API_ENDPOINTS.CART}/${userId}`));
      setCartItems(response.data);
      calculateTotal(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cart items');
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.13; // 13% tax
    const total = subtotal + tax;
    setTotal(total);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCreditCard = (value) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCreditCardChange = (e) => {
    const formatted = formatCreditCard(e.target.value);
    setFormData(prev => ({
      ...prev,
      creditCardNumber: formatted
    }));
  };

  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({
      ...prev,
      expiryDate: formatted
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.creditCardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      errors.push('Credit card number must be 16 digits');
    }
    if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      errors.push('Expiry date must be in MM/YY format');
    }
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      errors.push('CVV must be 3 or 4 digits');
    }
    if (!formData.billingAddress.trim()) errors.push('Billing address is required');
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join(', '));
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Prepare checkout data
      const checkoutData = {
        name: formData.name,
        email: formData.email,
        creditCardNumber: formData.creditCardNumber.replace(/\s/g, ''),
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        billingAddress: formData.billingAddress,
        phoneNumber: formData.phoneNumber
      };

      const response = await axios.post(createApiUrl(`/api/checkout/${userId}`), checkoutData);
      
      setOrderConfirmation(response.data);
      setProcessing(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process checkout');
      setProcessing(false);
    }
  };

  if (loading) return <div className="loading">Loading checkout...</div>;
  if (error && !processing) return <div className="error">{error}</div>;

  if (orderConfirmation) {
    return (
      <div className="checkout-success">
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h2>Order Confirmed!</h2>
          <div className="order-details">
            <p><strong>Order Number:</strong> {orderConfirmation.orderNumber}</p>
            <p><strong>Customer:</strong> {orderConfirmation.customerName}</p>
            <p><strong>Email:</strong> {orderConfirmation.customerEmail}</p>
            <p><strong>Total Amount:</strong> ${orderConfirmation.totalAmount.toLocaleString()}</p>
            <p><strong>Status:</strong> {orderConfirmation.status}</p>
            <p><strong>Order Date:</strong> {new Date(orderConfirmation.orderDate).toLocaleDateString()}</p>
          </div>
          <div className="success-message">
            <p>Thank you for your purchase! You will receive a confirmation email shortly.</p>
            <p>Your order has been processed and will be shipped to your billing address.</p>
          </div>
          <div className="success-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/evs')}
            >
              Continue Shopping
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/cart')}
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="btn btn-primary" onClick={() => navigate('/evs')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="checkout-container">
          <div className="checkout-form">
            <h3>Customer Information</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="billingAddress">Billing Address *</label>
                <textarea
                  id="billingAddress"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  required
                  rows="3"
                />
              </div>

              <h3>Payment Information</h3>
              
              <div className="form-group">
                <label htmlFor="creditCardNumber">Credit Card Number *</label>
                <input
                  type="text"
                  id="creditCardNumber"
                  name="creditCardNumber"
                  value={formData.creditCardNumber}
                  onChange={handleCreditCardChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => navigate('/cart')}
                  disabled={processing}
                >
                  Back to Cart
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={processing}
                >
                  {processing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="item-info">
                    <h4>{item.ev.brand} {item.ev.model}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${(total / 1.13).toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (13%):</span>
                <span>${(total - (total / 1.13)).toFixed(2)}</span>
              </div>
              <div className="total-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout; 