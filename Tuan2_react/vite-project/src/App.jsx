import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import StudentInfo from './components/StudentInfo'

function App() {
  return (
    <>
      <Header />
      <StudentInfo></StudentInfo>
      <Footer />
    </>
  );
}

export default App
