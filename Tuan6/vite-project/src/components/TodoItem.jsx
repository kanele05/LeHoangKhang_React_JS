export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={onToggle}
        aria-label="Toggle todo"
      >
        {todo.completed ? '✓' : ''}
      </button>

      <span className="todo-text">{todo.text}</span>

      <button
        className="btn-delete"
        onClick={onDelete}
        aria-label="Delete todo"
      >
        ✕
      </button>
    </li>
  );
}
