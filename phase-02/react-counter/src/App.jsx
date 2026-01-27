// App.js
import React, { useState } from 'react';
import CounterDisplay from './CounterDisplay';
import CounterControls from './CounterControls';
import './App.css';

function App() {
  // STATE MANAGEMENT: Single source of truth for counter value
  const [count, setCount] = useState(0);

  // Handler functions that update state
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="app-container">
      <h1>React Counter Application</h1>
      
      {/* PROPS USAGE: Passing state and callbacks to child components */}
      <CounterDisplay 
        count={count} 
        isNegative={count < 0}
      />
      
      <CounterControls 
        onIncrement={increment}
        onDecrement={decrement}
        onReset={reset}
        canDecrement={count > -10} // Business logic example
        canIncrement={count < 10}
      />
      
      <div className="info-box">
        <p>State lives in <code>App</code> component</p>
        <p>Props flow: Parent → Children (unidirectional data flow)</p>
      </div>
    </div>
  );
}

export default App;