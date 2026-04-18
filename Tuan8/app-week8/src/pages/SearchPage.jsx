import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterSidebar from '../components/FilterSidebar'
import RecipeCard from '../components/RecipeCard'
import { saladRecipes } from '../data/recipes'

const ITEMS_PER_PAGE = 9

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || 'Salad'
  const [sortBy, setSortBy] = useState('a-z')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState(saladRecipes)

  useEffect(() => {
    const lower = query.toLowerCase()
    const filtered = saladRecipes.filter(r => r.title.toLowerCase().includes(lower))
    setResults(filtered)
    setPage(1)
  }, [query])

  const sorted = [...results].sort((a, b) =>
    sortBy === 'a-z' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  )
  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE))
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  if (results.length === 0) return <NoResults query={query} />

  return (
    <div className="page-center py-10">
      <div className="flex gap-10">
        <FilterSidebar onApply={() => {}} />

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[28px] font-bold text-gray-900">
              {query} ({results.length})
            </h1>
            <select
              value={sortBy}
              onChange={e => { setSortBy(e.target.value); setPage(1) }}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 outline-none cursor-pointer hover:border-gray-300 transition-colors"
            >
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </div>

          {/* Recipe grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {paginated.map(r => <RecipeCard key={r.id} recipe={r} />)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors text-[16px]"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-[14px] font-medium transition-colors"
                  style={{
                    backgroundColor: p === page ? '#F0245A' : 'white',
                    color: p === page ? 'white' : '#374151',
                    border: p === page ? 'none' : '1px solid #E5E7EB',
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors text-[16px]"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function NoResults({ query }) {
  const suggestions = ['Sweet Cake', 'Black Cake', 'Pozole Verde', 'Healthy food']

  return (
    <div className="page-center py-10">
      <div className="flex gap-10">
        <FilterSidebar onApply={() => {}} />

        <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-[28px] font-bold text-gray-900 mb-12">
            Sorry, no results were found for &ldquo;{query}&rdquo;
          </h2>

          <div className="mb-10">
            <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
              <rect x="40" y="120" width="120" height="70" rx="8" fill="#FDE8EE"/>
              <rect x="40" y="120" width="120" height="20" rx="8" fill="#FBCFE8"/>
              <line x1="100" y1="120" x2="100" y2="190" stroke="#F9A8D4" strokeWidth="2"/>
              <circle cx="110" cy="85" r="44" fill="white" stroke="#F0245A" strokeWidth="4"/>
              <circle cx="110" cy="85" r="32" fill="#FDE8EE" stroke="#F0245A" strokeWidth="3"/>
              <line x1="96" y1="71" x2="124" y2="99" stroke="#F0245A" strokeWidth="4" strokeLinecap="round"/>
              <line x1="124" y1="71" x2="96" y2="99" stroke="#F0245A" strokeWidth="4" strokeLinecap="round"/>
              <rect x="135" y="108" width="14" height="46" rx="7" fill="#F0245A" transform="rotate(30 135 108)"/>
            </svg>
          </div>

          <p className="text-[16px] text-gray-500 mb-8">
            We have all your Independence Day sweets covered.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            {suggestions.map(tag => (
              <span
                key={tag}
                className="px-5 py-2 rounded-full border text-[14px] cursor-pointer transition-colors hover:border-[#F0245A] hover:text-[#F0245A]"
                style={{ borderColor: '#E5E7EB', color: '#6B7280' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
