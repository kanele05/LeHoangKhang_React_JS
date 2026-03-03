import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

function TodoApp() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: 450, margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>Bài tập 05 – Todo List</h2>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} />
    </div>
  );
}

export default TodoApp;
