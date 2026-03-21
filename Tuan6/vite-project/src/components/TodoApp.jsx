import { useReducer, useState } from 'react';
import TodoItem from './TodoItem';
import './TodoApp.css';

// ─── Action Types ────────────────────────────────────────────────────────────
const ADD_TODO    = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';

// ─── Initial State ───────────────────────────────────────────────────────────
const initialState = {
  todos: [],
  nextId: 1,
};

// ─── Pure Reducer Function ───────────────────────────────────────────────────
function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: state.nextId, text: action.payload, completed: false },
        ],
        nextId: state.nextId + 1,
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    dispatch({ type: ADD_TODO, payload: trimmed });
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const completedCount = state.todos.filter((t) => t.completed).length;
  const totalCount     = state.todos.length;

  return (
    <div className="todo-wrapper">
      <div className="todo-card">
        {/* Header */}
        <div className="todo-header">
          <h1 className="todo-title">📝 Todo App</h1>
          {totalCount > 0 && (
            <span className="todo-counter">
              {completedCount}/{totalCount} hoàn thành
            </span>
          )}
        </div>

        {/* Input */}
        <div className="todo-input-row">
          <input
            className="todo-input"
            type="text"
            placeholder="Nhập công việc..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn-add" onClick={handleAdd}>
            Thêm
          </button>
        </div>

        {/* List */}
        <ul className="todo-list">
          {state.todos.length === 0 ? (
            <li className="todo-empty">Chưa có công việc nào. Hãy thêm mới!</li>
          ) : (
            state.todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => dispatch({ type: TOGGLE_TODO, payload: todo.id })}
                onDelete={() => dispatch({ type: DELETE_TODO, payload: todo.id })}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
