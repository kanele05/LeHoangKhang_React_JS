import { NavLink, Route, Routes } from 'react-router-dom'
import ExerciseShell from '../layouts/ExerciseShell'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import HomePage from './HomePage'

function Bai1Navigation() {
  return (
    <nav className="main-nav">
      <NavLink end to="/">
        Home
      </NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  )
}

function Bai1() {
  return (
    <ExerciseShell
      subtitle="Bai 1: Routing co ban voi 3 trang Home, About, Contact."
      title="Bai 1 - Hello Router"
    >
      <Bai1Navigation />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<ContactPage />} path="/contact" />
      </Routes>
    </ExerciseShell>
  )
}

export default Bai1
