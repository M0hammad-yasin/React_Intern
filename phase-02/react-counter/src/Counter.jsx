import React from 'react';

const Counter = ({ count, onIncrement, onDecrement }) => {
  return (
    <div style={styles.counterContainer}>
      <h2>Current Count: {count}</h2>
      <div style={styles.buttonGroup}>
        <button onClick={onDecrement} style={styles.button}>
          - Decrease
        </button>
        <button onClick={onIncrement} style={styles.button}>
          + Increase
        </button>
      </div>
    </div>
  );
};

// Simple inline styles for better presentation
const styles = {
  counterContainer: {
    border: '2px solid #333',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    maxWidth: '300px',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  }
};

export default Counter;