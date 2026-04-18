import { useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import FilterSidebar from '../components/FilterSidebar'
import { saladRecipes } from '../data/recipes'

const saved = saladRecipes.slice(0, 6)
const TABS = ['Saved Recipes', 'Cooked', 'My Notes']

export default function RecipeBoxPage() {
  const [activeTab, setActiveTab] = useState('Saved Recipes')
  const [sortBy, setSortBy] = useState('a-z')

  const sorted = [...saved].sort((a, b) =>
    sortBy === 'a-z' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  )

  return (
    <div className="page-center py-10">
      <div className="flex gap-10">
        <FilterSidebar onApply={() => {}} />

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[28px] font-bold text-gray-900">
              Salad ({saved.length})
            </h1>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 outline-none cursor-pointer hover:border-gray-300 transition-colors"
            >
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-200">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 text-[15px] font-medium transition-colors border-b-2 -mb-px"
                style={{
                  color: activeTab === tab ? '#F0245A' : '#9CA3AF',
                  borderColor: activeTab === tab ? '#F0245A' : 'transparent',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'Saved Recipes' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {sorted.map(r => <RecipeCard key={r.id} recipe={r} />)}
            </div>
          )}

          {activeTab === 'Cooked' && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-6">🍽️</div>
              <h3 className="text-[20px] font-semibold text-gray-700 mb-3">No cooked recipes yet</h3>
              <p className="text-[15px] text-gray-400">Mark recipes as cooked to track your culinary journey!</p>
            </div>
          )}

          {activeTab === 'My Notes' && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-[20px] font-semibold text-gray-700 mb-3">No notes yet</h3>
              <p className="text-[15px] text-gray-400">Add personal notes to customize your favorite recipes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
