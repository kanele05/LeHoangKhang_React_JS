import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [focused, setFocused] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* ===== LEFT: Form ===== */}
      <div className="flex-1 flex flex-col justify-center items-center px-12 py-16">
        <div className="w-full max-w-[440px]">
          <h1 className="text-[36px] font-bold text-gray-900 text-center mb-10">
            Create an account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Full name */}
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused('')}
              placeholder="Full name"
              className="w-full border-2 rounded-xl px-5 py-4 text-[15px] outline-none transition-colors placeholder-gray-400 text-gray-800"
              style={{ borderColor: focused === 'name' || form.name ? '#F0245A' : '#E5E7EB' }}
            />

            {/* Email */}
            <div>
              <label className="block text-[14px] text-gray-500 mb-2 ml-1 font-medium">Email</label>
              <input
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                placeholder="example.email@gmail.com"
                type="email"
                className="w-full bg-gray-100 rounded-xl px-5 py-4 text-[15px] outline-none placeholder-gray-400 text-gray-800 transition-all"
                style={{ boxShadow: focused === 'email' ? '0 0 0 2px #F0245A40' : 'none' }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[14px] text-gray-500 mb-2 ml-1 font-medium">Password</label>
              <div className="relative">
                <input
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  placeholder="Enter at least 8+ characters"
                  type={showPass ? 'text' : 'password'}
                  className="w-full bg-gray-100 rounded-xl px-5 py-4 text-[15px] outline-none placeholder-gray-400 text-gray-800 pr-14 transition-all"
                  style={{ boxShadow: focused === 'password' ? '0 0 0 2px #F0245A40' : 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? (
                    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              className="w-full text-white font-semibold py-4 rounded-xl text-[16px] transition-opacity hover:opacity-90 mt-3 shadow-lg"
              style={{ backgroundColor: '#F0245A', boxShadow: '0 10px 24px -8px rgba(240, 36, 90, 0.4)' }}
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[14px] text-gray-400 whitespace-nowrap">Or sign in with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="flex justify-center gap-4">
            <button className="flex items-center justify-center w-[88px] h-[52px] rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button className="flex items-center justify-center w-[88px] h-[52px] rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <svg width="22" height="22" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="flex items-center justify-center w-[88px] h-[52px] rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <svg width="20" height="22" fill="#000" viewBox="0 0 814 1000">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.8 0 663.1 0 541.8c0-193.3 126.4-295.5 250.8-295.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ===== RIGHT: Pink illustration panel ===== */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center m-8 rounded-3xl overflow-hidden"
        style={{ backgroundColor: '#F0245A' }}
      >
        <svg viewBox="0 0 400 500" className="w-full max-w-[420px] h-auto px-10" fill="none">
          <polygon points="320,60 340,100 300,100" fill="white" opacity="0.4"/>
          <polygon points="80,380 60,420 100,420" fill="white" opacity="0.4"/>
          <circle cx="60" cy="120" r="6" fill="white" opacity="0.5"/>
          <circle cx="340" cy="380" r="5" fill="white" opacity="0.5"/>
          <circle cx="100" cy="300" r="4" fill="white" opacity="0.3"/>
          <path d="M50 200 L60 190 L50 180" stroke="white" strokeWidth="2" opacity="0.4" fill="none"/>
          <path d="M360 150 L370 140 L360 130" stroke="white" strokeWidth="2" opacity="0.4" fill="none"/>

          <g transform="translate(100, 100)">
            <circle cx="80" cy="50" r="28" stroke="white" strokeWidth="3" fill="none"/>
            <circle cx="65" cy="35" r="14" fill="white" opacity="0.9"/>
            <circle cx="80" cy="28" r="12" fill="white" opacity="0.9"/>
            <path d="M80 78 L80 160" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M80 100 Q50 70 30 50" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M80 100 Q120 80 150 60 Q180 40 170 20 Q160 0 140 10 Q120 20 130 40" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M80 160 Q65 190 55 220" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M80 160 Q100 190 110 220" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <ellipse cx="52" cy="224" rx="10" ry="6" fill="#FCD34D"/>
            <ellipse cx="113" cy="224" rx="10" ry="6" fill="#FCD34D"/>
          </g>

          <g transform="translate(160, 200)">
            <circle cx="120" cy="60" r="24" stroke="white" strokeWidth="3" fill="none"/>
            <path d="M96 55 Q96 32 120 32 Q144 32 144 55" fill="#FCD34D"/>
            <path d="M120 84 L120 150" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M120 110 Q90 100 70 90" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M120 110 Q150 90 170 75" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M120 150 Q100 170 80 185" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M120 150 Q140 165 155 180" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <ellipse cx="78" cy="188" rx="12" ry="7" fill="#60A5FA"/>
            <ellipse cx="157" cy="183" rx="12" ry="7" fill="#FCD34D"/>
          </g>

          <g transform="translate(300, 80)">
            <path d="M20 10 C20 5 25 0 30 5 C35 0 40 5 40 10 C40 20 30 28 30 28 C30 28 20 20 20 10Z" fill="white" opacity="0.9"/>
          </g>

          <g opacity="0.6">
            <line x1="50" y1="250" x2="50" y2="270" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <line x1="40" y1="260" x2="60" y2="260" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <line x1="350" y1="200" x2="350" y2="216" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <line x1="342" y1="208" x2="358" y2="208" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <path d="M70 420 Q90 410 110 420 Q130 430 150 420" stroke="white" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"/>
          <path d="M300 350 Q305 360 310 355 Q315 350 320 360" stroke="white" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}
