import { useState, useEffect } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export default function TodoCRUD() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Đang xoá id nào (để disable nút đúng item)
  const [deletingIds, setDeletingIds] = useState(new Set());

  // ─── GET ─────────────────────────────────────────────
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(`${BASE_URL}?_limit=10`);
        if (!res.ok) throw new Error(`Lỗi HTTP! Status: ${res.status}`);
        const json = await res.json();
        setTodos(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // ─── POST ────────────────────────────────────────────
  const handleAdd = async (e) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    setSubmitting(true);
    setSubmitError(null);

    // Optimistic UI: thêm ngay lên màn hình với id tạm
    const tempId = `temp-${Date.now()}`;
    const optimisticTodo = { id: tempId, title, completed: false, _optimistic: true };
    setTodos((prev) => [optimisticTodo, ...prev]);
    setNewTitle("");

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false, userId: 1 }),
      });
      if (!res.ok) throw new Error(`Lỗi HTTP! Status: ${res.status}`);
      const created = await res.json();

      // Thay thế item tạm bằng dữ liệu thực từ server
      setTodos((prev) =>
        prev.map((t) => (t.id === tempId ? { ...created, title } : t))
      );
    } catch (err) {
      // Rollback: xoá item tạm nếu lỗi
      setTodos((prev) => prev.filter((t) => t.id !== tempId));
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ─── DELETE ──────────────────────────────────────────
  const handleDelete = async (id) => {
    setDeletingIds((prev) => new Set(prev).add(id));

    // Optimistic UI: ẩn item ngay
    const snapshot = todos;
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Lỗi HTTP! Status: ${res.status}`);
    } catch (err) {
      // Rollback: khôi phục lại nếu lỗi
      setTodos(snapshot);
      setError(`Xoá thất bại: ${err.message}`);
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // ─── TOGGLE COMPLETE (bonus) ──────────────────────────
  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // ─── RENDER ──────────────────────────────────────────
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Bài 5 – CRUD với Fetch API</h2>

      {/* ADD FORM */}
      <form onSubmit={handleAdd} style={styles.form}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nhập tiêu đề todo mới..."
          style={styles.input}
          disabled={submitting}
        />
        <button type="submit" style={styles.btnAdd} disabled={submitting || !newTitle.trim()}>
          {submitting ? (
            <span style={styles.btnInner}>
              <span style={styles.spinnerSm} /> Đang thêm...
            </span>
          ) : (
            "+ Thêm"
          )}
        </button>
      </form>

      {submitError && <p style={styles.submitError}>⚠ {submitError}</p>}

      {/* GLOBAL ERROR */}
      {error && (
        <div style={styles.errorBox}>
          <strong>Lỗi:</strong> {error}
          <button style={styles.dismissBtn} onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={styles.loadingBox}>
          <div style={styles.spinner} />
          <span style={styles.loadingText}>Đang tải danh sách...</span>
        </div>
      )}

      {/* STATS */}
      {!loading && (
        <p style={styles.stats}>
          <strong>{todos.filter((t) => t.completed).length}</strong> hoàn thành /{" "}
          <strong>{todos.length}</strong> tổng
        </p>
      )}

      {/* TODO LIST */}
      {!loading && (
        <ul style={styles.list}>
          {todos.length === 0 && (
            <li style={styles.emptyMsg}>Danh sách trống. Hãy thêm todo mới!</li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                ...styles.item,
                opacity: todo._optimistic ? 0.6 : 1,
                borderLeft: todo.completed
                  ? "4px solid #22c55e"
                  : "4px solid #e5e7eb",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                style={styles.checkbox}
                disabled={!!todo._optimistic}
              />
              <span
                style={{
                  ...styles.itemTitle,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#9ca3af" : "#111827",
                }}
              >
                {todo.title}
                {todo._optimistic && (
                  <span style={styles.savingBadge}>đang lưu...</span>
                )}
              </span>
              <button
                style={{
                  ...styles.btnDelete,
                  opacity: deletingIds.has(todo.id) ? 0.5 : 1,
                }}
                onClick={() => handleDelete(todo.id)}
                disabled={deletingIds.has(todo.id) || !!todo._optimistic}
                title="Xoá"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "620px",
    margin: "30px auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "20px",
    fontSize: "1.4rem",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "8px",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    fontSize: "0.95rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
  },
  btnAdd: {
    padding: "10px 18px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    whiteSpace: "nowrap",
    minWidth: "110px",
  },
  btnInner: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  spinnerSm: {
    display: "inline-block",
    width: "13px",
    height: "13px",
    border: "2px solid rgba(255,255,255,0.4)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  submitError: {
    margin: "4px 0 10px",
    color: "#ef4444",
    fontSize: "0.85rem",
  },
  errorBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    marginBottom: "12px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fca5a5",
    borderRadius: "8px",
    color: "#b91c1c",
    fontSize: "0.9rem",
  },
  dismissBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#b91c1c",
    fontSize: "1rem",
    padding: "0 4px",
  },
  loadingBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    backgroundColor: "#eff6ff",
    border: "1px solid #93c5fd",
    borderRadius: "8px",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "3px solid #93c5fd",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    flexShrink: 0,
  },
  loadingText: {
    color: "#1d4ed8",
    fontSize: "0.9rem",
  },
  stats: {
    margin: "0 0 10px",
    fontSize: "0.85rem",
    color: "#6b7280",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  emptyMsg: {
    textAlign: "center",
    color: "#9ca3af",
    padding: "20px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    transition: "opacity 0.2s",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
    flexShrink: 0,
  },
  itemTitle: {
    flex: 1,
    fontSize: "0.9rem",
    lineHeight: 1.4,
  },
  savingBadge: {
    marginLeft: "8px",
    fontSize: "0.75rem",
    color: "#f59e0b",
    fontStyle: "italic",
  },
  btnDelete: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    padding: "2px 6px",
    borderRadius: "4px",
    transition: "opacity 0.2s",
    flexShrink: 0,
  },
};
