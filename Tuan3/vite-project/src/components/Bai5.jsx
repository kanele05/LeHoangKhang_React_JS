import React, { useState, useRef } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);        // milliseconds
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [lapName, setLapName] = useState('');

  const intervalRef = useRef(null);            // lưu intervalId, không dùng state
  const lapInputRef = useRef(null);            // focus input "Lap name"

  const start = () => {
    if (running) return;
    setRunning(true);
    const startAt = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startAt);
    }, 10);
  };

  const pause = () => {
    if (!running) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
    setTime(0);
    setLaps([]);
    setLapName('');
  };

  const addLap = () => {
    setLaps((prev) => [
      ...prev,
      { name: lapName.trim() || `Lap ${prev.length + 1}`, time },
    ]);
    setLapName('');
    lapInputRef.current?.focus();
  };

  // ─── format mm:ss.ms ───
  const format = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = Math.floor((ms % 1000) / 10);
    return (
      String(minutes).padStart(2, '0') +
      ':' +
      String(seconds).padStart(2, '0') +
      '.' +
      String(millis).padStart(2, '0')
    );
  };

  return (
    <div style={{ maxWidth: 420, margin: '24px auto', textAlign: 'center' }}>
      <h2>Stopwatch</h2>

      {/* Thời gian */}
      <div style={{ fontSize: 48, fontFamily: 'monospace', margin: '16px 0' }}>
        {format(time)}
      </div>

      {/* Nút điều khiển */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
        {!running ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>

      {/* Lap input */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
        <input
          ref={lapInputRef}
          value={lapName}
          onChange={(e) => setLapName(e.target.value)}
          placeholder="Lap name"
          style={{ padding: 6 }}
        />
        <button onClick={addLap}>Add Lap</button>
      </div>

      {/* Danh sách lap */}
      {laps.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', padding: 4 }}>#</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 4 }}>Name</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 4 }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {laps.map((lap, i) => (
              <tr key={i}>
                <td style={{ padding: 4 }}>{i + 1}</td>
                <td style={{ padding: 4 }}>{lap.name}</td>
                <td style={{ padding: 4, fontFamily: 'monospace' }}>{format(lap.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Stopwatch;
