import { useState } from 'react';
import TodoApp from './components/TodoApp';
import ThemeApp from './components/theme/ThemeApp';
import ShopApp from './components/shop/ShopApp';
import './App.css';

const EXERCISES = [
  { id: 1, label: 'Bài 1 – useReducer', component: <TodoApp /> },
  { id: 2, label: 'Bài 2 – Context API', component: <ThemeApp /> },
  { id: 3, label: 'Bài 3 – Shopping Cart', component: <ShopApp /> },
];

function App() {
  const [active, setActive] = useState(1);
  const current = EXERCISES.find((e) => e.id === active);

  return (
    <>
      {/* Tab navigation */}
      <nav className="app-nav">
        {EXERCISES.map((ex) => (
          <button
            key={ex.id}
            className={`app-nav-btn ${active === ex.id ? 'active' : ''}`}
            onClick={() => setActive(ex.id)}
          >
            {ex.label}
          </button>
        ))}
      </nav>

      {/* Active exercise */}
      <div>{current.component}</div>
    </>
  );
}

export default App;
