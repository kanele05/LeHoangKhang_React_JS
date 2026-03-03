import { useState, useEffect } from "react";

export default function PostSearch() {
  const [allPosts, setAllPosts] = useState([]);   // dữ liệu gốc – không mutate
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch 1 lần duy nhất
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error(`Lỗi HTTP! Status: ${res.status}`);
        const json = await res.json();
        setAllPosts(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // [] → chỉ chạy 1 lần, search KHÔNG gọi lại API

  // Filter client-side – tạo mảng mới, không thay đổi allPosts
  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Bài 4 – Fetch + Search + Filter</h2>

      {/* SEARCH BAR */}
      <div style={styles.searchRow}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm theo tiêu đề..."
          style={styles.input}
          disabled={loading}
        />
        {query && (
          <button style={styles.clearBtn} onClick={() => setQuery("")}>
            ✕
          </button>
        )}
      </div>

      {/* STATS */}
      {!loading && !error && (
        <p style={styles.stats}>
          Hiển thị{" "}
          <strong>{filteredPosts.length}</strong> /{" "}
          <strong>{allPosts.length}</strong> bài viết
          {query && (
            <span style={styles.queryBadge}>
              từ khoá: "{query}"
            </span>
          )}
        </p>
      )}

      {/* LOADING */}
      {loading && (
        <div style={styles.loadingBox}>
          <div style={styles.spinner} />
          <span style={styles.loadingText}>Đang tải danh sách bài viết...</span>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div style={styles.errorBox}>
          <strong>Lỗi:</strong> {error}
        </div>
      )}

      {/* EMPTY RESULT */}
      {!loading && !error && filteredPosts.length === 0 && (
        <div style={styles.emptyBox}>
          Không tìm thấy bài viết nào khớp với <strong>"{query}"</strong>.
        </div>
      )}

      {/* POST LIST */}
      {!loading && !error && filteredPosts.length > 0 && (
        <ul style={styles.list}>
          {filteredPosts.map((post) => (
            <li key={post.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.idBadge}>#{post.id}</span>
                <span style={styles.userBadge}>User {post.userId}</span>
              </div>
              <p style={styles.postTitle}>
                <Highlight text={post.title} query={query} />
              </p>
              <p style={styles.postBody}>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Highlight từ khoá trong tiêu đề */
function Highlight({ text, query }) {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(`(${query.trim()})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={styles.highlight}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const styles = {
  container: {
    maxWidth: "680px",
    margin: "30px auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "18px",
    fontSize: "1.4rem",
  },
  searchRow: {
    position: "relative",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "10px 40px 10px 14px",
    fontSize: "0.95rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
  },
  clearBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "#9ca3af",
    padding: "2px 6px",
  },
  stats: {
    margin: "0 0 14px",
    fontSize: "0.85rem",
    color: "#6b7280",
  },
  queryBadge: {
    marginLeft: "8px",
    padding: "2px 8px",
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    borderRadius: "999px",
    fontSize: "0.8rem",
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
  errorBox: {
    padding: "14px 16px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fca5a5",
    borderRadius: "8px",
    color: "#b91c1c",
  },
  emptyBox: {
    padding: "14px 16px",
    backgroundColor: "#fefce8",
    border: "1px solid #fde047",
    borderRadius: "8px",
    color: "#854d0e",
    textAlign: "center",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  card: {
    padding: "14px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    backgroundColor: "#f9fafb",
  },
  cardHeader: {
    display: "flex",
    gap: "8px",
    marginBottom: "6px",
  },
  idBadge: {
    padding: "2px 8px",
    backgroundColor: "#e5e7eb",
    color: "#374151",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
  userBadge: {
    padding: "2px 8px",
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    borderRadius: "999px",
    fontSize: "0.75rem",
  },
  postTitle: {
    margin: "0 0 6px",
    fontWeight: "bold",
    fontSize: "0.95rem",
    color: "#111827",
    textTransform: "capitalize",
  },
  postBody: {
    margin: 0,
    fontSize: "0.85rem",
    color: "#6b7280",
    lineHeight: 1.5,
  },
  highlight: {
    backgroundColor: "#fde047",
    color: "#000",
    borderRadius: "2px",
    padding: "0 1px",
  },
};
