import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './CreditCardStyles.css'; 

const CreditCard = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const [cardType, setCardType] = useState('');

  const formatCardNumber = (value) => value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  const formatExpiry = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    let month = cleanedValue.slice(0, 2);
    let year = cleanedValue.slice(2, 4);

    if (parseInt(month, 10) > 12) {
      month = '12';
    }
    return `${month}${year ? '/' + year : ''}`;
  };
  const formatName = (value) => value.replace(/[^a-zA-Z\s]/g, '');

  return (
    <div className="credit-card-container">
      <Cards
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
        brand={cardType}
      />

      <form className="credit-card-form">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="cardType">Card Type</label>
            <select
              className="form-control modern-input"
              name="cardType"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option value="">Select Card Type</option>
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
              <option value="amex">American Express</option>
              <option value="discover">Discover</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="number">Card Number</label>
            <input
              type="text"
              className="form-control modern-input"
              name="number"
              value={number}
              onChange={(e) => setNumber(formatCardNumber(e.target.value))}
              onFocus={(e) => setFocus(e.target.name)}
              maxLength="19"
              placeholder="1234 5678 9101 1121"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="name">Cardholder Name</label>
            <input
              type="text"
              className="form-control modern-input"
              name="name"
              value={name}
              onChange={(e) => setName(formatName(e.target.value))}
              onFocus={(e) => setFocus(e.target.name)}
              placeholder="Your Name"
            />
          </div>
        </div>

      {/* Expiry Date and CVV on the same row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="expiry">Expiration Date (MM/YY)</label>
          <input
            type="text"
            name="expiry"
            className="form-control"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            onFocus={(e) => setFocus(e.target.name)}
            maxLength="5"
            placeholder="MM/YY"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cvc">CVV</label>
          <input
            type="tel"
            className="form-control"
            name="cvc"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
            onFocus={(e) => setFocus(e.target.name)}
            maxLength="3"
            placeholder="123"
          />
        </div>
      </div>

      </form>
    </div>
  );
};

export default CreditCard;
