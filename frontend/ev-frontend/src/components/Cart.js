import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl, API_ENDPOINTS } from '../config/api';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

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
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCart(cartItemId);
        return;
      }

      await axios.put(createApiUrl(`${API_ENDPOINTS.CART}/${cartItemId}/quantity`), {
        quantity: newQuantity
      });
      
      // Update local state
      setCartItems(prev => prev.map(item => 
        item.id === cartItemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
      
      // Recalculate total
      const updatedItems = cartItems.map(item => 
        item.id === cartItemId 
          ? { ...item, quantity: newQuantity }
          : item
      );
      calculateTotal(updatedItems);
    } catch (err) {
      alert('Failed to update quantity');
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(createApiUrl(`${API_ENDPOINTS.CART}/${cartItemId}`));
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      calculateTotal(cartItems.filter(item => item.id !== cartItemId));
    } catch (err) {
      alert('Failed to remove item from cart');
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(createApiUrl(`${API_ENDPOINTS.CART}/${userId}/clear`));
      setCartItems([]);
      setTotal(0);
    } catch (err) {
      alert('Failed to clear cart');
    }
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    alert('Checkout functionality would be implemented here');
  };

  if (loading) return <div className="loading">Loading cart...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="btn btn-primary" onClick={() => navigate('/evs')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  {item.ev.imageUrl ? (
                    <img src={item.ev.imageUrl} alt={item.ev.model} />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                </div>
                
                <div className="item-details">
                  <h3>{item.ev.brand} {item.ev.model}</h3>
                  <p className="item-price">{item.price != null ? `$${item.price.toLocaleString()}` : 'N/A'}</p>
                  <p className="item-specs">
                    Range: {item.ev.rangeKm} km | Battery: {item.ev.batteryCapacityKwh} kWh
                  </p>
                </div>
                
                <div className="item-quantity">
                  <label>Quantity:</label>
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
                
                <div className="item-total">
                  <span>{(item.price != null && item.quantity != null) ? `$${(item.price * item.quantity).toLocaleString()}` : 'N/A'}</span>
                </div>
                
                <div className="item-actions">
                  <button 
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{total != null ? `$${total.toLocaleString()}` : 'N/A'}</span>
            </div>
            <div className="summary-row">
              <span>Tax (13%):</span>
              <span>${(total * 0.13).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(total * 1.13).toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <button className="btn btn-secondary" onClick={() => navigate('/evs')}>
                Continue Shopping
              </button>
              <button className="btn btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="btn btn-primary" onClick={proceedToCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 