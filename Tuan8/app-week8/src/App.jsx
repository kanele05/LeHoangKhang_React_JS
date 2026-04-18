import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import SubscribePage from './pages/SubscribePage'
import RecipeBoxPage from './pages/RecipeBoxPage'
import './index.css'

function Layout() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  return (
    <div className="w-full min-h-screen flex flex-col">
      {!isLogin && <Navbar />}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="/recipe-box" element={<RecipeBoxPage />} />
        </Routes>
      </main>
      {!isLogin && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
