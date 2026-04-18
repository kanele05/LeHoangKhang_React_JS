import { useState } from 'react'

const COOK_TYPES = ['Pan-fried', 'Stir-fried', 'Grilled', 'Roasted', 'Sauteed', 'Baked', 'Steamed', 'Stewed']

function ChevronUp() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
    </svg>
  )
}

export default function FilterSidebar({ onApply }) {
  const [selectedTypes, setSelectedTypes] = useState(['Grilled', 'Roasted'])
  const [timeMin, setTimeMin] = useState(30)
  const [timeMax, setTimeMax] = useState(50)
  const [selectedRatings, setSelectedRatings] = useState([3, 2, 1])
  const [openSections, setOpenSections] = useState({ type: true, time: true, rating: true })

  const toggleType = (t) =>
    setSelectedTypes(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])

  const toggleRating = (r) =>
    setSelectedRatings(p => p.includes(r) ? p.filter(x => x !== r) : [...p, r])

  const toggleSection = (s) =>
    setOpenSections(p => ({ ...p, [s]: !p[s] }))

  return (
    <div className="w-[280px] shrink-0 self-start sticky top-[100px]">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-gray-100">
          <svg width="18" height="18" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4"/>
          </svg>
          <span className="text-[14px] font-bold text-gray-700 uppercase tracking-wider">Filters</span>
        </div>

        {/* Type section */}
        <div className="px-6 py-5 border-b border-gray-100">
          <button
            onClick={() => toggleSection('type')}
            className="flex items-center justify-between w-full mb-4"
          >
            <span className="text-[15px] font-semibold text-gray-800">Type</span>
            <span className={`text-gray-400 transition-transform ${openSections.type ? '' : 'rotate-180'}`}>
              <ChevronUp />
            </span>
          </button>

          {openSections.type && (
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-3">
              {COOK_TYPES.map(type => (
                <label key={type} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                    style={{ accentColor: '#F0245A' }}
                  />
                  <span className="text-[14px] text-gray-600">{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Time section */}
        <div className="px-6 py-5 border-b border-gray-100">
          <button
            onClick={() => toggleSection('time')}
            className="flex items-center justify-between w-full mb-4"
          >
            <span className="text-[15px] font-semibold text-gray-800">Time</span>
            <span className={`text-gray-400 transition-transform ${openSections.time ? '' : 'rotate-180'}`}>
              <ChevronUp />
            </span>
          </button>

          {openSections.time && (
            <div className="pt-1">
              <div className="flex justify-between text-[13px] text-gray-500 mb-4">
                <span>{timeMin} minutes</span>
                <span>{timeMax} minutes</span>
              </div>
              <div className="relative h-6 flex items-center">
                <div className="absolute w-full h-2 bg-gray-200 rounded-full" />
                <div
                  className="absolute h-2 rounded-full"
                  style={{
                    backgroundColor: '#F0245A',
                    left: `${(timeMin / 120) * 100}%`,
                    right: `${100 - (timeMax / 120) * 100}%`
                  }}
                />
                <input
                  type="range" min={0} max={120} value={timeMin}
                  onChange={e => setTimeMin(Math.min(+e.target.value, timeMax - 5))}
                  className="absolute w-full h-2 opacity-0 cursor-pointer"
                />
                <input
                  type="range" min={0} max={120} value={timeMax}
                  onChange={e => setTimeMax(Math.max(+e.target.value, timeMin + 5))}
                  className="absolute w-full h-2 opacity-0 cursor-pointer"
                />
                <div
                  className="absolute w-5 h-5 rounded-full bg-white border-2 shadow pointer-events-none"
                  style={{ left: `calc(${(timeMin / 120) * 100}% - 10px)`, borderColor: '#F0245A' }}
                />
                <div
                  className="absolute w-5 h-5 rounded-full bg-white border-2 shadow pointer-events-none"
                  style={{ left: `calc(${(timeMax / 120) * 100}% - 10px)`, borderColor: '#F0245A' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Rating section */}
        <div className="px-6 py-5">
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full mb-4"
          >
            <span className="text-[15px] font-semibold text-gray-800">Rating</span>
            <span className={`text-gray-400 transition-transform ${openSections.rating ? '' : 'rotate-180'}`}>
              <ChevronUp />
            </span>
          </button>

          {openSections.rating && (
            <div className="flex flex-col gap-3">
              {[5, 4, 3, 2, 1].map(stars => (
                <label key={stars} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(stars)}
                    onChange={() => toggleRating(stars)}
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ accentColor: '#F0245A' }}
                  />
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24"
                        fill={i <= stars ? '#FBBF24' : '#E5E7EB'}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Apply button */}
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={() => onApply?.({ types: selectedTypes, timeMin, timeMax, ratings: selectedRatings })}
            className="w-full py-3.5 rounded-xl text-white text-[15px] font-semibold hover:opacity-90 transition-opacity shadow-md"
            style={{ backgroundColor: '#F0245A', boxShadow: '0 6px 16px -4px rgba(240, 36, 90, 0.35)' }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
