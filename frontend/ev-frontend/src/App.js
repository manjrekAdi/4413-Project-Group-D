import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import EVList from './components/EVList';
import EVDetail from './components/EVDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import LoanCalculator from './components/LoanCalculator';
import LoanCalculatorPage from './components/LoanCalculatorPage';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
          <h1>EV E-Commerce Platform</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/evs">Electric Vehicles</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/loan-calculator">Loan Calculator</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
      </header>
        
        <main>
          <Routes>
            <Route path="/" element={<EVList />} />
            <Route path="/evs" element={<EVList />} />
            <Route path="/evs/:id" element={<EVDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
