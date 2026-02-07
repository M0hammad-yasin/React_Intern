import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span onClick={() => onToggle(todo.id)} style={{ cursor: 'pointer' }}>
                {todo.text}
            </span>
            <button className="delete-btn" onClick={() => onDelete(todo.id)}>
                Delete
            </button>
        </li>
    );
};

export default TodoItem;