import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import EVList from './components/EVList';
import EVDetail from './components/EVDetail';
import EVComparison from './components/EVComparison';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import LoanCalculator from './components/LoanCalculator';
import LoanCalculatorPage from './components/LoanCalculatorPage';
import Chatbot from './components/Chatbot';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // Redirect to home page after logout
    window.location.href = '/';
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
    <div className="App">
      <header className="App-header">
          <h1>EV E-Commerce Platform</h1>
          
          {/* Welcome message for logged in users */}
          {user && (
            <div className="welcome-message">
              Hello, <strong>{user.username}</strong>! 👋
            </div>
          )}
          
          <nav>
            <Link to="/">Home</Link>
            <Link to="/evs">Electric Vehicles</Link>
            <Link to="/compare">Compare EVs</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/loan-calculator">Loan Calculator</Link>
            
            {/* Show Login/Register only if user is not logged in */}
            {!user ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              /* Show Logout if user is logged in */
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            )}
          </nav>
      </header>
        
        <main>
          <Routes>
            <Route path="/" element={<EVList />} />
            <Route path="/evs" element={<EVList />} />
            <Route path="/evs/:id" element={<EVDetail />} />
            <Route path="/compare" element={<EVComparison />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
          </Routes>
        </main>
        
        <footer>
          <p>&copy; 2025 EV E-Commerce Platform. EECS4413 Team Project.</p>
        </footer>

        {/* Chatbot - appears on all pages */}
        <Chatbot />
    </div>
    </Router>
  );
}

export default App;
