import { useState } from 'react'

const LEARN_MORE = ['Our Cooks', 'See Our Features', 'FAQ']
const SHOP = ['Gift Subscription', 'Send Us Feedback']
const RECIPES = ['What to Cook This Week', 'Pasta', 'Dinner', 'Healthy', 'Vegetarian', 'Vegan', 'Christmas']

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer style={{ backgroundColor: '#1A1A2E' }} className="text-gray-400 mt-20">
      <div className="page-center pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-700">

          {/* About + newsletter */}
          <div>
            <p className="text-white text-[15px] font-semibold mb-2">About</p>
            <p className="text-[14px] text-gray-500 mb-2 font-medium">Us</p>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
              Welcome to our website, a wonderful place to explore and learn how to cook like a pro.
            </p>
            <div className="flex">
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="flex-1 bg-gray-800 text-[14px] text-white px-4 py-3 rounded-l-lg outline-none border border-gray-700 placeholder-gray-500"
              />
              <button
                className="text-white text-[14px] font-semibold px-5 py-3 rounded-r-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#F0245A' }}
              >
                Send
              </button>
            </div>
          </div>

          {/* Learn More + Shop */}
          <div>
            <p className="text-white text-[15px] font-semibold mb-5">Learn More</p>
            <ul className="space-y-3 mb-8">
              {LEARN_MORE.map(item => (
                <li key={item} className="text-[14px] text-gray-500 hover:text-white cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
            <p className="text-white text-[15px] font-semibold mb-5">Shop</p>
            <ul className="space-y-3">
              {SHOP.map(item => (
                <li key={item} className="text-[14px] text-gray-500 hover:text-white cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          {/* Recipes */}
          <div>
            <p className="text-white text-[15px] font-semibold mb-5">Recipes</p>
            <ul className="space-y-3">
              {RECIPES.map(item => (
                <li key={item} className="text-[14px] text-gray-500 hover:text-white cursor-pointer transition-colors">{item}</li>
              ))}
            </ul>
          </div>

          <div />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="#F0245A" fillOpacity="0.15"/>
              <path d="M14 6C10.5 6 8 8.5 8 11.5C8 13.5 9 15.2 10.5 16.3V20C10.5 20.6 11 21 11.5 21H16.5C17 21 17.5 20.6 17.5 20V16.3C19 15.2 20 13.5 20 11.5C20 8.5 17.5 6 14 6Z" fill="#F0245A"/>
            </svg>
            <span className="text-white text-[19px] font-bold">Chefify</span>
            <span className="text-[13px] text-gray-600 ml-2">2023 Chefify Company</span>
          </div>
          <div className="flex gap-6 text-[13px] text-gray-600">
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
