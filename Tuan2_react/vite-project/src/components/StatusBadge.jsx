import { useState } from "react";
import "./StatusBadge.css";

function StatusBadge({ initialStatus = "online" }) {
  const [status, setStatus] = useState(initialStatus);

  return (
    <div className="status-badge-container">
      <h2>Bài tập 04 – Status Badge</h2>

      <div className={`status-badge ${status}`}>{status}</div>

      <div className="status-buttons">
        <button className="btn-online" onClick={() => setStatus("online")}>
          Online
        </button>
        <button className="btn-offline" onClick={() => setStatus("offline")}>
          Offline
        </button>
        <button className="btn-busy" onClick={() => setStatus("busy")}>
          Busy
        </button>
      </div>
    </div>
  );
}

export default StatusBadge;
