import { useState, useEffect } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";
const BAD_URL = "https://jsonplaceholder.typicode.com/bad-endpoint";

export default function UserListV2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useErrorUrl, setUseErrorUrl] = useState(false);

  const fetchUsers = async (url) => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Status: ${response.status}`);
      }
      const json = await response.json();
      if (!Array.isArray(json) || json.length === 0) {
        throw new Error("Dữ liệu trả về không hợp lệ hoặc rỗng.");
      }
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(useErrorUrl ? BAD_URL : API_URL);
  }, []);

  const handleRetry = () => fetchUsers(API_URL);
  const handleSimulateError = () => fetchUsers(BAD_URL);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Bài 2 – Loading & Error State</h2>

      <div style={styles.buttonGroup}>
        <button style={styles.btnPrimary} onClick={handleRetry} disabled={loading}>
          {loading ? "Đang tải..." : "Fetch Users"}
        </button>
        <button style={styles.btnDanger} onClick={handleSimulateError} disabled={loading}>
          Giả lập lỗi API
        </button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div style={styles.loadingBox}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Đang tải dữ liệu, vui lòng chờ...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {!loading && error && (
        <div style={styles.errorBox}>
          <strong>Có lỗi xảy ra:</strong>
          <p style={{ margin: "6px 0 0" }}>{error}</p>
          <button style={styles.btnRetry} onClick={handleRetry}>
            Thử lại
          </button>
        </div>
      )}

      {/* DATA STATE */}
      {!loading && !error && data.length > 0 && (
        <ul style={styles.list}>
          {data.map((user) => (
            <li key={user.id} style={styles.listItem}>
              <strong>{user.name}</strong>
              <br />
              <span style={styles.email}>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "30px auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "16px",
    fontSize: "1.4rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  btnPrimary: {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  btnDanger: {
    padding: "8px 16px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  btnRetry: {
    marginTop: "10px",
    padding: "6px 14px",
    backgroundColor: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
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
    width: "20px",
    height: "20px",
    border: "3px solid #93c5fd",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    margin: 0,
    color: "#1d4ed8",
  },
  errorBox: {
    padding: "14px 16px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fca5a5",
    borderRadius: "8px",
    color: "#b91c1c",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: "12px 16px",
    marginBottom: "8px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
  },
  email: {
    color: "#6b7280",
    fontSize: "0.9rem",
  },
};
