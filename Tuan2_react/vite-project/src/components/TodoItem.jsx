function TodoItem({ todo, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 12px",
        marginBottom: 6,
        backgroundColor: "#f9fafb",
        borderRadius: 4,
        border: "1px solid #e5e7eb",
      }}
    >
      <span>{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          padding: "4px 10px",
          backgroundColor: "#ef4444",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        Xóa
      </button>
    </li>
  );
}

export default TodoItem;
