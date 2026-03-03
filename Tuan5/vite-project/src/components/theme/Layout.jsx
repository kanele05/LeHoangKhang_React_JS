// Cấp 1: App → Layout
// Layout KHÔNG nhận theme qua props — nó tự lấy từ Context
import { useTheme } from '../../context/ThemeContext';
import Page from './Page';
import './Theme.css';

export default function Layout() {
  const { theme, toggleTheme } = useTheme(); // ← useContext sâu, không cần props

  return (
    <div className={`layout ${theme}`}>
      {/* Header */}
      <header className="layout-header">
        <span className="layout-logo">⚡ ThemeApp</span>

        <div className="header-right">
          <span className="theme-label">
            {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
          </span>
          {/* Toggle từ Layout (cấp 1) */}
          <button className="toggle-btn" onClick={toggleTheme}>
            Toggle từ Layout
          </button>
        </div>
      </header>

      {/* Body — truyền KHÔNG CÓ props theme/toggleTheme xuống Page */}
      <main className="layout-body">
        <Page />
      </main>

      <footer className="layout-footer">
        Global state via Context API — không props drilling
      </footer>
    </div>
  );
}
