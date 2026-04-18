import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query.trim() || 'Salad')}`)
  }

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="page-center h-[80px] flex items-center gap-10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <svg width="34" height="34" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="14" fill="#F0245A" fillOpacity="0.1"/>
            <path d="M14 6C10.5 6 8 8.5 8 11.5C8 13.5 9 15.2 10.5 16.3V20C10.5 20.6 11 21 11.5 21H16.5C17 21 17.5 20.6 17.5 20V16.3C19 15.2 20 13.5 20 11.5C20 8.5 17.5 6 14 6Z" fill="#F0245A"/>
            <rect x="12" y="4" width="4" height="4" rx="2" fill="#F0245A"/>
          </svg>
          <span className="text-[24px] font-bold text-[#F0245A]">Chefify</span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-2.5 bg-gray-100 rounded-full px-5 h-[48px] w-[280px]">
          <svg className="w-[18px] h-[18px] text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search..."
            className="bg-transparent outline-none text-[15px] text-gray-700 placeholder-gray-400 flex-1 min-w-0"
          />
        </form>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-8 flex-1">
          <Link to="/" className="text-[15px] text-gray-600 hover:text-[#F0245A] font-medium transition-colors whitespace-nowrap">What to cook</Link>
          <Link to="/search" className="text-[15px] text-gray-600 hover:text-[#F0245A] font-medium transition-colors">Recipes</Link>
          <span className="text-[15px] text-gray-600 hover:text-[#F0245A] font-medium transition-colors cursor-pointer">Ingredients</span>
          <span className="text-[15px] text-gray-600 hover:text-[#F0245A] font-medium transition-colors cursor-pointer">Occasions</span>
          <span className="text-[15px] text-gray-600 hover:text-[#F0245A] font-medium transition-colors cursor-pointer">About Us</span>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4 ml-auto">
          <Link
            to="/recipe-box"
            className="flex items-center gap-2 border-2 border-[#F0245A] text-[#F0245A] text-[14px] font-semibold px-5 h-[44px] rounded-full hover:bg-pink-50 transition-colors whitespace-nowrap"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
            </svg>
            Your Recipe Box
          </Link>
          <Link to="/login">
            <img
              src="https://i.pravatar.cc/44?img=5"
              alt="avatar"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-100"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
