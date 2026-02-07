// TodoList Component - Renders a list of todos
import TodoItem from './TodoItem';
const TodoList = ({ todos, onToggle, onDelete }) => {
    if (todos.length === 0) {
        return <p className="empty-state">No todos yet. Add one above!</p>;
    }

    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TodoList;