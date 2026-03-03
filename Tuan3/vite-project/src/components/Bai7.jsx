import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── ThemeContext ───
const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}

// ─── Theme styles ───
const themes = {
  light: {
    background: '#ffffff',
    color: '#1a1a1a',
    cardBg: '#f5f5f5',
    cardBorder: '#ddd',
    buttonBg: '#1a1a1a',
    buttonColor: '#ffffff',
  },
  dark: {
    background: '#1a1a1a',
    color: '#f0f0f0',
    cardBg: '#2a2a2a',
    cardBorder: '#444',
    buttonBg: '#f0f0f0',
    buttonColor: '#1a1a1a',
  },
};

// ─── ThemeProvider (persist với localStorage) ───
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('app-theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, styles: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Button (cấp sâu nhất) ───
function Button({ children, onClick }) {
  const { styles } = useTheme();
  return (
    <button
      onClick={onClick}
      style={{
        background: styles.buttonBg,
        color: styles.buttonColor,
        border: 'none',
        padding: '8px 18px',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: 14,
      }}
    >
      {children}
    </button>
  );
}

// ─── Card ───
function Card() {
  const { theme, styles, toggleTheme } = useTheme();
  return (
    <div
      style={{
        background: styles.cardBg,
        border: `1px solid ${styles.cardBorder}`,
        borderRadius: 10,
        padding: 20,
        marginTop: 16,
      }}
    >
      <h3 style={{ margin: '0 0 8px' }}>Card Component</h3>
      <p style={{ margin: '0 0 12px' }}>
        Theme hiện tại: <strong>{theme}</strong>
      </p>
      <Button onClick={toggleTheme}>
        Chuyển sang {theme === 'light' ? 'Dark' : 'Light'}
      </Button>
    </div>
  );
}

// ─── Layout ───
function Layout() {
  const { styles } = useTheme();
  return (
    <div
      style={{
        background: styles.background,
        color: styles.color,
        padding: 24,
        borderRadius: 12,
        minHeight: 200,
        transition: 'all .3s',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Layout Component</h2>
      <Card />
    </div>
  );
}

// ─── ThemeSwitcher (entry) ───
function ThemeSwitcher() {
  return (
    <ThemeProvider>
      <div style={{ maxWidth: 520, margin: '24px auto' }}>
        <h2 style={{ textAlign: 'center' }}>Theme Switcher</h2>
        <Layout />
      </div>
    </ThemeProvider>
  );
}

export default ThemeSwitcher;
