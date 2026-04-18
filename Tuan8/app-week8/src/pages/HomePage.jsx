import { useState } from 'react'
import { Link } from 'react-router-dom'
import { summerRecipes, videoRecipes, editorsPick } from '../data/recipes'

function BookmarkBtn({ saved, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
    >
      <svg width="17" height="17" fill={saved ? '#F0245A' : 'none'} stroke={saved ? '#F0245A' : '#888'} strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
      </svg>
    </button>
  )
}

function SummerCard({ recipe }) {
  const [saved, setSaved] = useState(false)
  return (
    <div className="group cursor-pointer">
      <div className="relative rounded-2xl overflow-hidden mb-4">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[180px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <BookmarkBtn saved={saved} onToggle={() => setSaved(!saved)} />
      </div>
      <h3 className="text-[15px] font-semibold text-gray-800 leading-snug mb-2">{recipe.title}</h3>
      <p className="text-[13px] text-gray-400">⏱ {recipe.cookTime}</p>
    </div>
  )
}

function VideoCard({ recipe }) {
  const [saved, setSaved] = useState(false)
  return (
    <div className="group cursor-pointer">
      <div className="relative rounded-2xl overflow-hidden mb-4">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/95 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg width="18" height="20" fill="#F0245A" viewBox="0 0 14 16">
              <path d="M0 0l14 8L0 16V0z"/>
            </svg>
          </div>
        </div>
        <BookmarkBtn saved={saved} onToggle={() => setSaved(!saved)} />
      </div>
      <h3 className="text-[15px] font-semibold text-gray-800 leading-snug mb-2">{recipe.title}</h3>
      <p className="text-[13px] text-gray-400">⏱ {recipe.cookTime}</p>
    </div>
  )
}

function EditorCard({ recipe }) {
  const [saved, setSaved] = useState(false)
  return (
    <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <div className="relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <BookmarkBtn saved={saved} onToggle={() => setSaved(!saved)} />
      </div>
      <div className="p-5">
        <h3 className="text-[15px] font-semibold text-gray-800 mb-3 leading-snug">{recipe.title}</h3>
        <div className="flex items-center gap-2.5 mb-4">
          <img
            src={`https://i.pravatar.cc/28?u=${recipe.author}`}
            alt={recipe.author}
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-[13px] text-gray-500">{recipe.author}</span>
        </div>
        <Link
          to="/subscribe"
          className="block text-center border-2 rounded-full py-2.5 text-[13px] font-semibold transition-colors hover:bg-pink-50"
          style={{ borderColor: '#F0245A', color: '#F0245A' }}
        >
          Subscribe to unlock
        </Link>
      </div>
    </div>
  )
}

const categories = ['All', 'Salads', 'Soups', 'Pasta', 'Grills']

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative w-full h-[540px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=600&fit=crop"
          alt="hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/50" />

        {/* Floating card */}
        <div className="absolute left-[80px] top-1/2 -translate-y-1/2">
          <div className="bg-white rounded-3xl p-8 w-[340px] shadow-2xl">
            <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-[12px] font-bold px-3.5 py-1.5 rounded-full mb-4">
              <span className="text-orange-500">★</span> Editor's choice
            </span>
            <h2 className="text-[22px] font-bold text-gray-900 mb-3">Baked Caprese</h2>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
              Baked caprese pasta is a super easy baked pasta dish where you roast cherry tomatoes, garlic, and fresh basil then toss with pasta.
            </p>
            <div className="flex items-center gap-3 mb-5">
              <img src="https://i.pravatar.cc/40?img=11" alt="chef" className="w-10 h-10 rounded-full object-cover"/>
              <div>
                <p className="text-[13px] font-semibold text-gray-800">Chef Amanda</p>
                <p className="text-[12px] text-gray-400">⏱ 35 min</p>
              </div>
            </div>
            <button
              className="w-full text-white text-[14px] font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#F0245A' }}
            >
              View Recipe
            </button>
          </div>
        </div>
      </section>

      <div className="page-center">

        {/* ===== THIS SUMMER RECIPES ===== */}
        <section className="pt-20 pb-16">
          <div className="text-center mb-10">
            <p className="text-[14px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#F0245A' }}>
              Discover &amp; Savour
            </p>
            <h2 className="text-[32px] font-bold text-gray-900 mb-3">This Summer Recipes</h2>
            <p className="text-[15px] text-gray-400">Welcome to our imagination! Our special creations</p>
          </div>

          {/* Category tabs */}
          <div className="flex justify-center gap-10 mb-10 border-b border-gray-100">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="pb-4 text-[15px] font-medium transition-colors border-b-2 -mb-px"
                style={{
                  color: activeCategory === cat ? '#F0245A' : '#9CA3AF',
                  borderColor: activeCategory === cat ? '#F0245A' : 'transparent'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-7">
            {summerRecipes.map(r => <SummerCard key={r.id} recipe={r} />)}
          </div>
        </section>

        {/* ===== RECIPES WITH VIDEOS ===== */}
        <section className="py-16">
          <div className="text-center mb-10">
            <h2 className="text-[32px] font-bold text-gray-900 mb-3">Recipes With Videos</h2>
            <p className="text-[15px] text-gray-400">Cooking Up Scenes. Savour and Enjoy the Drop Online</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
            {videoRecipes.map(r => <VideoCard key={r.id} recipe={r} />)}
          </div>
        </section>

        {/* ===== EDITOR'S PICK ===== */}
        <section className="py-16">
          <div className="text-center mb-10">
            <p className="text-[14px] text-gray-400 mb-2">
              Curious To Keep Your 3 meals/week inspired? Get Happy Recipes Below
            </p>
            <h2 className="text-[32px] font-bold text-gray-900">Editor's pick</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
            {editorsPick.map(r => <EditorCard key={r.id} recipe={r} />)}
          </div>
        </section>

      </div>
    </div>
  )
}
