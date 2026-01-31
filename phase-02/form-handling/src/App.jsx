import React, { useState } from 'react';

// ==========================================
// Component 1: Simple Counter
// ==========================================
const Counter = () => {
  // Initialize state with a default value of 0
  const [count, setCount] = useState(0);

  // Handler to increment the count
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Handler to decrement the count
  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div style={styles.card}>
      <h2>Counter Component</h2>
      <div style={styles.counterDisplay}>
        <span style={styles.countValue}>{count}</span>
      </div>
      <div style={styles.buttonGroup}>
        <button onClick={decrement} style={styles.button}>Decrement</button>
        <button onClick={increment} style={styles.button}>Increment</button>
      </div>
    </div>
  );
};

// ==========================================
// Component 2: Form Handling
// ==========================================
const SimpleForm = () => {
  // State to manage the input field value
  const [inputValue, setInputValue] = useState('');
  
  // State to store the submitted data
  const [submittedData, setSubmittedData] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    // Prevent the default browser form submission behavior (page reload)
    e.preventDefault();
    
    // Save the input value to state
    setSubmittedData(inputValue);
    
    // Optional: Clear the input after submission
    // setInputValue(''); 
  };

  return (
    <div style={styles.card}>
      <h2>Form Component</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="userInput" style={styles.label}>Enter Text:</label>
          <input
            id="userInput"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type something..."
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>

      {/* Display submitted data if it exists */}
      {submittedData && (
        <div style={styles.resultBox}>
          <strong>Last Submitted:</strong> {submittedData}
        </div>
      )}
    </div>
  );
};

// ==========================================
// Main App Component
// ==========================================
const App = () => {
  return (
    <div style={styles.appContainer}>
      <h1 style={styles.header}>React Hooks Demo</h1>
      <div style={styles.componentWrapper}>
        <Counter />
        <SimpleForm />
      </div>
    </div>
  );
};

// ==========================================
// Simple Inline Styles (for presentation)
// ==========================================
const styles = {
  appContainer: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
  },
  header: {
    color: '#333',
  },
  componentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  // Counter Styles
  counterDisplay: {
    margin: '20px 0',
    fontSize: '24px',
  },
  countValue: {
    fontWeight: 'bold',
    fontSize: '48px',
    color: '#007bff',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
  },
  // Form Styles
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'flex-start',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textAlign: 'left',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  resultBox: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
    color: '#333',
  }
};

export default App;