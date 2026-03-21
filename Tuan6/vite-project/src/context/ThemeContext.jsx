import { createContext, useContext, useState } from 'react';

// ─── 1. Tạo Context ──────────────────────────────────────────────────────────
export const ThemeContext = createContext(null);

// ─── 2. Provider ─────────────────────────────────────────────────────────────
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // 'light' | 'dark'

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── 3. Custom Hook (tránh import trực tiếp Context ở mọi nơi) ───────────────
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return context;
}
