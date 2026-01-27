// CounterControls.js
import React from 'react';
import './CounterControls.css';

// PRESENTATIONAL COMPONENT: UI controls only
function CounterControls({ 
  onIncrement, 
  onDecrement, 
  onReset,
  canDecrement,
  canIncrement 
}) {
  return (
    <div className="controls-container">
      <button 
        onClick={onDecrement}
        disabled={!canDecrement}
        className="btn decrement"
        aria-label="Decrement counter"
      >
        -
      </button>
      
      <button 
        onClick={onReset}
        className="btn reset"
        aria-label="Reset counter"
      >
        Reset
      </button>
      
      <button 
        onClick={onIncrement}
        disabled={!canIncrement}
        className="btn increment"
        aria-label="Increment counter"
      >
        +
      </button>
    </div>
  );
}

export default CounterControls;