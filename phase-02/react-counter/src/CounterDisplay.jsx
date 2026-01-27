// CounterDisplay.jsx
import React from 'react';
import './CounterDisplay.css';

function CounterDisplay({ count, isNegative }) {
  return (
    <div className={`counter-display ${isNegative ? 'negative' : ''}`}>
      <span className="counter-value">
        {count}
      </span>
      <span className="counter-label">
        {isNegative ? 'Negative Value' : 'Current Count'}
      </span>
    </div>
  );
}

export default CounterDisplay;