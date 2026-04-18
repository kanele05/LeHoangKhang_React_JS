import { useState } from 'react'
import { Link } from 'react-router-dom'

const BULLETS = [
  '25,000+ recipes to suit all tastes and skill levels',
  'Filter by diet, cook time, and more',
  'Personal recipes for favorites',
  'Get exclusive access to our subscriber-only mobile app',
]

const ACCESS_FEATURES = [
  { icon: '🍳', title: 'Cooking', desc: 'Enjoy recipes, advice and inspiration for any occasion.' },
  { icon: '✏️', title: 'Wirecutter', desc: 'Explore independent reviews for thousands of products.' },
  { icon: '🎮', title: 'Games', desc: 'Unwind with Spelling Bee, Wordle, The Crossword.' },
  { icon: '🏃', title: 'The Athletic', desc: 'Discover in-depth, personalized sports journalism.' },
]

const PLANS = [
  { id: 0, price: '$2/month', desc: 'Billed $X every 4 weeks' },
  { id: 1, price: '$20/year', desc: 'Billed once annually', badge: 'Best value' },
]

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState(1)

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="page-center pt-8 pb-4">
        <p className="text-[14px] text-gray-400">
          <Link to="/" className="hover:text-[#F0245A] transition-colors">Recipes</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Subscribe</span>
        </p>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="page-center py-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <p className="text-[14px] font-semibold mb-4" style={{ color: '#F0245A' }}>
              This recipe is exclusively available to subscribers
            </p>
            <h1 className="text-[36px] font-bold text-gray-900 leading-tight mb-8">
              Join now to access effortless,<br/>hassle-free recipes
            </h1>

            <ul className="space-y-4 mb-10">
              {BULLETS.map((item, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0 mt-0.5"
                    style={{ backgroundColor: '#FBBF24' }}
                  >
                    ✓
                  </span>
                  <span className="text-[15px] text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mb-2">
              <span className="text-[30px] font-bold text-gray-900">0.25USD</span>
              <span className="text-[20px] font-semibold text-gray-700"> / Week</span>
            </div>
            <p className="text-[14px] text-gray-400 mb-8">
              Billed $X every X weeks for the first year
            </p>

            <button
              className="w-full text-white font-semibold py-4 rounded-xl text-[16px] hover:opacity-90 transition-opacity mb-4"
              style={{ backgroundColor: '#F0245A', boxShadow: '0 10px 24px -8px rgba(240, 36, 90, 0.4)' }}
            >
              Subscribe now
            </button>
            <p className="text-center text-[14px] text-gray-400">Cancel or Pause anytime</p>
          </div>

          <div className="flex-1 max-w-[520px]">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=500&fit=crop"
              alt="delicious food"
              className="w-full h-[420px] object-cover rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <div className="h-px bg-gray-100" />

      {/* ===== ALL ACCESS FEATURES ===== */}
      <section className="py-20 bg-white">
        <div className="page-center text-center">
          <h2 className="text-[30px] font-bold text-gray-900 mb-14">
            An All Access subscription includes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {ACCESS_FEATURES.map(f => (
              <div key={f.title} className="px-4">
                <div className="text-5xl mb-5">{f.icon}</div>
                <h3 className="text-[18px] font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gray-100" />

      {/* ===== PLAN SELECTION ===== */}
      <section className="py-20">
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px' }} className="text-center">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="#F0245A" fillOpacity="0.1"/>
              <path d="M14 6C10.5 6 8 8.5 8 11.5C8 13.5 9 15.2 10.5 16.3V20C10.5 20.6 11 21 11.5 21H16.5C17 21 17.5 20.6 17.5 20V16.3C19 15.2 20 13.5 20 11.5C20 8.5 17.5 6 14 6Z" fill="#F0245A"/>
            </svg>
            <span className="text-[20px] font-bold" style={{ color: '#F0245A' }}>Chefify</span>
          </div>

          <h2 className="text-[26px] font-bold text-gray-900 mb-3">
            Subscribe to Chefify Cooking only
          </h2>
          <p className="text-[14px] text-gray-400 mb-10 leading-relaxed">
            Enjoy thousands of delicious recipes for every taste, plus advice and inspiration daily.
          </p>

          <div className="space-y-4 mb-8">
            {PLANS.map(plan => (
              <label
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className="flex items-center gap-5 p-5 rounded-2xl border-2 cursor-pointer transition-colors"
                style={{
                  borderColor: selectedPlan === plan.id ? '#F0245A' : '#E5E7EB',
                  backgroundColor: selectedPlan === plan.id ? '#FFF1F4' : 'white',
                }}
              >
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: selectedPlan === plan.id ? '#F0245A' : '#D1D5DB' }}
                >
                  {selectedPlan === plan.id && (
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F0245A' }} />
                  )}
                </div>

                <div className="text-left flex-1">
                  <p className="text-[16px] font-semibold text-gray-800">{plan.price}</p>
                  <p className="text-[13px] text-gray-400 mt-0.5">{plan.desc}</p>
                </div>

                {plan.badge && (
                  <span
                    className="text-[12px] font-bold px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: '#FDE8EE', color: '#F0245A' }}
                  >
                    {plan.badge}
                  </span>
                )}
              </label>
            ))}
          </div>

          <button
            className="w-full text-white font-semibold py-4 rounded-xl text-[16px] hover:opacity-90 transition-opacity mb-4"
            style={{ backgroundColor: '#F0245A', boxShadow: '0 10px 24px -8px rgba(240, 36, 90, 0.4)' }}
          >
            Subscribe now
          </button>
          <p className="text-[14px] text-gray-400">Cancel or Pause anytime</p>
        </div>
      </section>
    </div>
  )
}
