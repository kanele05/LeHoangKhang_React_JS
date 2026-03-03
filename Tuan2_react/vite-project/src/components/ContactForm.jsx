import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>Bài tập 03 – Form nhập thông tin</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Tên: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên"
          style={{ padding: 6, width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email"
          style={{ padding: 6, width: "100%" }}
        />
      </div>

      <div style={{ marginTop: 20, padding: 12, background: "#f5f5f5", borderRadius: 6 }}>
        <h3>Dữ liệu nhập:</h3>
        <p><strong>Tên:</strong> {name || <em>Chưa nhập</em>}</p>
        <p><strong>Email:</strong> {email || <em>Chưa nhập</em>}</p>
      </div>
    </div>
  );
}

export default ContactForm;
