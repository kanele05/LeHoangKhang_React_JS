// Cấp 3 (sâu nhất): Page → Card
// Card tự toggle theme — không nhận bất kỳ props nào liên quan đến theme
import { useTheme } from '../../context/ThemeContext';

export default function Card({ title, description }) {
  const { theme, toggleTheme } = useTheme(); // ← useContext ở component sâu nhất

  return (
    <div className="card-item">
      <div className="card-icon">{theme === 'light' ? '🌞' : '🌚'}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{description}</p>
      {/* Toggle từ Button sâu nhất — không cần props drilling */}
      <button className="toggle-btn small" onClick={toggleTheme}>
        Toggle từ {title}
      </button>
    </div>
  );
}
