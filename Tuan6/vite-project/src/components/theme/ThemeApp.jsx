// Entry point cho Bài 2
// ThemeProvider bọc toàn bộ cây — state sống ở đây
import { ThemeProvider } from '../../context/ThemeContext';
import Layout from './Layout';

export default function ThemeApp() {
  return (
    <ThemeProvider>
      {/*
        Cây component:
          ThemeApp
            └─ ThemeProvider  (Context source)
                 └─ Layout    (cấp 1 — dùng useTheme)
                      └─ Page (cấp 2 — dùng useTheme)
                           └─ Card (cấp 3 — dùng useTheme + toggleTheme)
        Không có props theme nào được truyền giữa các cấp!
      */}
      <Layout />
    </ThemeProvider>
  );
}
