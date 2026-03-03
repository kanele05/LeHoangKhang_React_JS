import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete }) {
  if (todos.length === 0) {
    return <p style={{ color: "#9ca3af", fontStyle: "italic" }}>Chưa có công việc nào.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TodoList;
