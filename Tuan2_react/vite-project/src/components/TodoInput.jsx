import { useState } from "react";

function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập công việc..."
        style={{ flex: 1, padding: 8, fontSize: 14, borderRadius: 4, border: "1px solid #ccc" }}
      />
      <button
        type="submit"
        style={{ padding: "8px 16px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
      >
        Thêm
      </button>
    </form>
  );
}

export default TodoInput;
