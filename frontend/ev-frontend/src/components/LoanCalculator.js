import React, { useState, useEffect } from 'react';
import './LoanCalculator.css';

const LoanCalculator = ({ vehiclePrice = 0, onClose }) => {
  const [loanAmount, setLoanAmount] = useState(vehiclePrice);
  const [downPayment, setDownPayment] = useState(0);
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

  return (
    <div className="loan-calculator-overlay">
      <div className="loan-calculator-modal">
        <div className="loan-calculator-header">
          <h2>Loan Calculator</h2>
          {onClose && (
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          )}
        </div>

        <div className="loan-calculator-content">
          <div className="input-section">
            <div className="input-group">
              <label htmlFor="vehicle-price">Vehicle Price:</label>
              <input
                type="number"
                id="vehicle-price"
                value={vehiclePrice}
                disabled
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label htmlFor="loan-amount">Loan Amount:</label>
              <input
                type="number"
                id="loan-amount"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                min="0"
                step="1000"
                className="input-field"
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
              />
            </div>

            <div className="input-group">
              <label htmlFor="loan-term">Loan Term (months):</label>
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
          </div>

          <div className="results-section">
            <h3>Loan Summary</h3>
            <div className="result-item">
              <span className="result-label">Monthly Payment:</span>
              <span className="result-value">{formatCurrency(monthlyPayment)}</span>
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
              <span className="result-label">Principal Amount:</span>
              <span className="result-value">{formatCurrency(loanAmount - downPayment)}</span>
            </div>
          </div>

          <div className="loan-calculator-footer">
            <p className="disclaimer">
              * This is an estimate. Actual loan terms and rates may vary based on credit score, 
              lender requirements, and other factors. Please consult with a financial advisor or lender 
              for actual loan terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator; 