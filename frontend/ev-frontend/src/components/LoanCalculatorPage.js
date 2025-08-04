import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoanCalculatorPage.css';

const LoanCalculatorPage = () => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [downPayment, setDownPayment] = useState(10000);
  const [interestRate, setInterestRate] = useState(5.0);
  const [loanTerm, setLoanTerm] = useState(60);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  const calculateLoan = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm;

    if (principal <= 0 || monthlyRate <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      return;
    }

    // Monthly payment calculation using the loan payment formula
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                   (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const total = payment * numberOfPayments;
    const interest = total - principal;

    setMonthlyPayment(payment);
    setTotalPayment(total);
    setTotalInterest(interest);
  };

  const handleDownPaymentChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setDownPayment(value);
  };

  const handleLoanAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setLoanAmount(value);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const resetCalculator = () => {
    setLoanAmount(50000);
    setDownPayment(10000);
    setInterestRate(5.0);
    setLoanTerm(60);
  };

  return (
    <div className="loan-calculator-page">
      <div className="loan-calculator-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>EV Loan Calculator</h1>
        <p>Calculate your monthly payments for electric vehicle financing</p>
      </div>

      <div className="loan-calculator-container">
        <div className="calculator-section">
          <div className="input-section">
            <h2>Loan Details</h2>
            
            <div className="input-group">
              <label htmlFor="loan-amount">Vehicle Price / Loan Amount:</label>
              <input
                type="number"
                id="loan-amount"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                min="0"
                step="1000"
                className="input-field"
                placeholder="Enter vehicle price"
              />
            </div>

            <div className="input-group">
              <label htmlFor="down-payment">Down Payment:</label>
              <input
                type="number"
                id="down-payment"
                value={downPayment}
                onChange={handleDownPaymentChange}
                min="0"
                max={loanAmount}
                step="1000"
                className="input-field"
                placeholder="Enter down payment"
              />
            </div>

            <div className="input-group">
              <label htmlFor="interest-rate">Interest Rate (%):</label>
              <input
                type="number"
                id="interest-rate"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                min="0"
                max="20"
                step="0.1"
                className="input-field"
                placeholder="Enter interest rate"
              />
            </div>

            <div className="input-group">
              <label htmlFor="loan-term">Loan Term:</label>
              <select
                id="loan-term"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                className="input-field"
              >
                <option value={36}>36 months (3 years)</option>
                <option value={48}>48 months (4 years)</option>
                <option value={60}>60 months (5 years)</option>
                <option value={72}>72 months (6 years)</option>
                <option value={84}>84 months (7 years)</option>
              </select>
            </div>

            <button className="reset-btn" onClick={resetCalculator}>
              Reset Calculator
            </button>
          </div>

          <div className="results-section">
            <h2>Loan Summary</h2>
            <div className="result-item">
              <span className="result-label">Monthly Payment:</span>
              <span className="result-value">{formatCurrency(monthlyPayment)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Principal Amount:</span>
              <span className="result-value">{formatCurrency(loanAmount - downPayment)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Total Interest:</span>
              <span className="result-value">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Total Payment:</span>
              <span className="result-value">{formatCurrency(totalPayment)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Loan Term:</span>
              <span className="result-value">{loanTerm} months</span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>About EV Financing</h3>
          <div className="info-card">
            <h4>Why Choose EV Financing?</h4>
            <ul>
              <li>Lower operating costs compared to gas vehicles</li>
              <li>Potential tax incentives and rebates</li>
              <li>Reduced maintenance costs</li>
              <li>Environmental benefits</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>Factors Affecting Your Rate</h4>
            <ul>
              <li>Credit score and history</li>
              <li>Down payment amount</li>
              <li>Loan term length</li>
              <li>Vehicle type and model</li>
              <li>Current market rates</li>
            </ul>
          </div>

          <div className="disclaimer">
            <h4>Important Disclaimer</h4>
            <p>
              This calculator provides estimates only. Actual loan terms and rates may vary based on 
              credit score, lender requirements, and other factors. Please consult with a financial 
              advisor or lender for actual loan terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculatorPage; 