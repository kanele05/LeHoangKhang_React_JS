import React, { useReducer } from 'react';

// ─── Initial state ───
const initialState = {
  status: 'idle', // idle | loading | success | error
  users: [],
  error: null,
};

// ─── Reducer (pure function) ───
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_SUCCESS':
      return { ...state, status: 'success', users: action.payload };
    case 'FETCH_ERROR':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
}

// ─── Component ───
function FetchUsers() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  return (
    <div style={{ maxWidth: 540, margin: '24px auto' }}>
      <h2>Fetch Users (State Machine)</h2>

      {/* idle */}
      {state.status === 'idle' && (
        <div>
          <p>Chưa có dữ liệu. Bấm nút để tải danh sách users.</p>
          <button onClick={fetchUsers}>Fetch Users</button>
        </div>
      )}

      {/* loading */}
      {state.status === 'loading' && <p>Đang tải...</p>}

      {/* error */}
      {state.status === 'error' && (
        <div>
          <p style={{ color: 'red' }}>Lỗi: {state.error}</p>
          <button onClick={fetchUsers}>Retry</button>
        </div>
      )}

      {/* success */}
      {state.status === 'success' && (
        <div>
          <button onClick={fetchUsers} style={{ marginBottom: 12 }}>
            Reload
          </button>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', padding: 6, textAlign: 'left' }}>ID</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: 6, textAlign: 'left' }}>Name</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: 6, textAlign: 'left' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {state.users.map((u) => (
                <tr key={u.id}>
                  <td style={{ padding: 6 }}>{u.id}</td>
                  <td style={{ padding: 6 }}>{u.name}</td>
                  <td style={{ padding: 6 }}>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FetchUsers;
