// Cấp 2: Layout → Page
// Page cũng KHÔNG nhận theme qua props
import { useTheme } from '../../context/ThemeContext';
import Card from './Card';

export default function Page() {
  const { theme } = useTheme(); // ← tự lấy từ Context

  return (
    <div className="page">
      <h2 className="page-title">📄 Page Component</h2>
      <p className="page-desc">
        Theme hiện tại được đọc trực tiếp từ Context:{' '}
        <code className="theme-badge">{theme}</code>
      </p>

      <div className="card-grid">
        <Card
          title="Card A"
          description="Component sâu nhất — tự toggle theme mà không nhận props."
        />
        <Card
          title="Card B"
          description="Cùng dùng chung một ThemeContext, state đồng bộ tức thì."
        />
        <Card
          title="Card C"
          description="Thêm bao nhiêu component cũng không cần thêm props."
        />
      </div>
    </div>
  );
}
