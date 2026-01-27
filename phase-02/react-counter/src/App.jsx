import React, { useState } from 'react';
import Counter from './Counter';

function App() {
  // 1. Use State to manage counter value
  const [count, setCount] = useState(0);

  // Handler functions to update state
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React State & Props Demo</h1>
      
      {/* 2. Use Props to pass data and functions from Parent to Child */}
      <Counter 
        count={count} 
        onIncrement={handleIncrement} 
        onDecrement={handleDecrement} 
      />
      
    </div>
  );
}

export default App;