import React, { useState, useCallback, memo } from 'react';

// ─── TodoItem (memo để tránh re-render khi props không đổi) ───
const TodoItem = memo(function TodoItem({ id, text, done, onToggle, onDelete }) {
  console.log('render item', id);

  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(id)}
      />
      <span style={{ textDecoration: done ? 'line-through' : 'none', flex: 1 }}>
        {text}
      </span>
      <button onClick={() => onDelete(id)}>Xoá</button>
    </li>
  );
});

// ─── TodoList ───
function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

// ─── TodoInput ───
function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập todo..."
        style={{ flex: 1, padding: 6 }}
      />
      <button type="submit">Thêm</button>
    </form>
  );
}

// ─── TodoApp ───
function TodoApp() {
  const [todos, setTodos] = useState([]);

  const handleAdd = useCallback((text) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, done: false },
    ]);
  }, []);

  const handleToggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div style={{ maxWidth: 480, margin: '24px auto' }}>
      <h2>Todo List Performance</h2>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default TodoApp;
