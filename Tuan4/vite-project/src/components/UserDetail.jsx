import { useState, useEffect } from "react";

export default function UserDetail() {
  const [inputId, setInputId] = useState("");
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (userId === null) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) {
          throw new Error(`Lỗi HTTP! Status: ${response.status}`);
        }
        const json = await response.json();
        if (!json || Object.keys(json).length === 0) {
          throw new Error("not_found");
        }
        setData(json);
      } catch (err) {
        setError(err.message === "not_found" ? "not_found" : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSearch = () => {
    const id = parseInt(inputId, 10);
    if (!inputId.trim()) {
      setValidationError("Vui lòng nhập userId.");
      return;
    }
    if (isNaN(id) || id < 1 || id > 10) {
      setValidationError("userId phải là số nguyên từ 1 đến 10.");
      return;
    }
    setValidationError("");
    setUserId(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Bài 3 – Fetch theo tham số</h2>

      {/* INPUT ROW */}
      <div style={styles.inputRow}>
        <input
          type="number"
          min={1}
          max={10}
          value={inputId}
          onChange={(e) => {
            setInputId(e.target.value);
            setValidationError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder="Nhập userId (1 – 10)"
          style={{
            ...styles.input,
            borderColor: validationError ? "#ef4444" : "#d1d5db",
          }}
        />
        <button style={styles.btn} onClick={handleSearch} disabled={loading}>
          {loading ? "Đang tìm..." : "Tìm kiếm"}
        </button>
      </div>

      {/* VALIDATION ERROR */}
      {validationError && <p style={styles.validationMsg}>{validationError}</p>}

      {/* LOADING */}
      {loading && (
        <div style={styles.loadingBox}>
          <div style={styles.spinner} />
          <span style={styles.loadingText}>Đang tải dữ liệu...</span>
        </div>
      )}

      {/* API ERROR */}
      {!loading && error && error !== "not_found" && (
        <div style={styles.errorBox}>
          <strong>Lỗi:</strong> {error}
        </div>
      )}

      {/* NOT FOUND */}
      {!loading && error === "not_found" && (
        <div style={styles.notFoundBox}>
          🔍 <strong>User not found.</strong> Không tìm thấy người dùng với ID này.
        </div>
      )}

      {/* USER CARD */}
      {!loading && !error && data && (
        <div style={styles.card}>
          <h3 style={styles.userName}>{data.name}</h3>
          <div style={styles.infoRow}>
            <span style={styles.label}>📞 Phone</span>
            <span>{data.phone}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>🌐 Website</span>
            <a
              href={`https://${data.website}`}
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              {data.website}
            </a>
          </div>
        </div>
      )}

      {/* PLACEHOLDER when no search yet */}
      {!loading && !error && !data && userId === null && (
        <p style={styles.placeholder}>Nhập userId và nhấn <strong>Tìm kiếm</strong> để xem thông tin người dùng.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "520px",
    margin: "30px auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "20px",
    fontSize: "1.4rem",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "6px",
  },
  input: {
    flex: 1,
    padding: "9px 12px",
    fontSize: "0.95rem",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    outline: "none",
  },
  btn: {
    padding: "9px 18px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem",
    whiteSpace: "nowrap",
  },
  validationMsg: {
    margin: "4px 0 12px",
    color: "#ef4444",
    fontSize: "0.85rem",
  },
  loadingBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    marginTop: "14px",
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
  },
  loadingText: {
    color: "#1d4ed8",
    fontSize: "0.9rem",
  },
  errorBox: {
    marginTop: "14px",
    padding: "14px 16px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fca5a5",
    borderRadius: "8px",
    color: "#b91c1c",
  },
  notFoundBox: {
    marginTop: "14px",
    padding: "14px 16px",
    backgroundColor: "#fefce8",
    border: "1px solid #fde047",
    borderRadius: "8px",
    color: "#854d0e",
  },
  card: {
    marginTop: "16px",
    padding: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    backgroundColor: "#f9fafb",
  },
  userName: {
    margin: "0 0 14px",
    fontSize: "1.2rem",
    color: "#111827",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
    fontSize: "0.95rem",
    color: "#374151",
  },
  label: {
    minWidth: "90px",
    fontWeight: "bold",
    color: "#6b7280",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
  },
  placeholder: {
    marginTop: "16px",
    color: "#9ca3af",
    fontSize: "0.9rem",
  },
};
