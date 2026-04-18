import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RecipeCard({ recipe }) {
  const [saved, setSaved] = useState(false)

  return (
    <div className="group cursor-pointer">
      <div className="relative rounded-2xl overflow-hidden mb-4">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <svg width="16" height="16" fill={saved ? '#F0245A' : 'none'} stroke={saved ? '#F0245A' : '#888'} strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
          </svg>
        </button>
      </div>
      <h3 className="text-[15px] font-semibold text-gray-800 leading-snug mb-2">{recipe.title}</h3>
      {recipe.cookTime && (
        <p className="text-[13px] text-gray-400">⏱ {recipe.cookTime}</p>
      )}
      {recipe.subscribe && (
        <Link
          to="/subscribe"
          className="mt-2 inline-block text-[13px] font-medium hover:opacity-80"
          style={{ color: '#F0245A' }}
        >
          Subscribe to view →
        </Link>
      )}
    </div>
  )
}
