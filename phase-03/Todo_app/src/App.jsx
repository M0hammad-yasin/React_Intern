import React, { useState } from 'react';
import TodoList from './TodoList';
import './App.css';

// TodoInput Component - Handles new todo creation
const TodoInput = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
      />
      <button type="submit" className="add-btn">
        Add Todo
      </button>
    </form>
  );
};

// TodoStats Component - Displays statistics
const TodoStats = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const remaining = total - completed;

  return (
    <div className="todo-stats">
      <span>Total: {total}</span>
      <span>Completed: {completed}</span>
      <span>Remaining: {remaining}</span>
    </div>
  );
};

// Main App Component - Container component with state management
export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React components', completed: false },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Master props and state', completed: false }
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">📝 My Todo List</h1>

        <TodoInput onAdd={addTodo} />

        <TodoStats todos={todos} />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}