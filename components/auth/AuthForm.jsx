'use client'

import { useState } from 'react'
import { Eye, EyeOff, BookOpen, Loader2 } from 'lucide-react'

export default function AuthForm({ mode, setMode }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('soma-authenticated', 'true')
    }
    // Redirect to main app
    window.location.href = '/'
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Logo - Instagram style on mobile */}
      <div className="text-center mb-8 md:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="w-8 h-8 text-dusty-rose" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-4xl md:text-3xl text-charcoal tracking-tight">
          SomaStreak
        </h1>
        <p className="text-warm-gray text-sm mt-2 hidden md:block">
          Your Reading Sanctuary
        </p>
      </div>

      {/* Main form card */}
      <div className="glass-card rounded-xl p-6 md:p-8 mb-4">
        {mode === 'register' && (
          <p className="text-center text-warm-gray text-sm mb-6 leading-relaxed">
            Sign up to track your reading journey and connect with fellow book lovers.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <>
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </>
          )}
          
          <InputField
            name="username"
            type="text"
            placeholder={mode === 'login' ? 'Username or email' : 'Username'}
            value={formData.username}
            onChange={handleChange}
          />
          
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-pearl/50 border border-border rounded-lg text-sm text-charcoal placeholder:text-warm-gray/70 focus:outline-none focus:ring-2 focus:ring-dusty-rose/30 focus:border-dusty-rose/50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.username || !formData.password}
            className="w-full py-3 mt-2 bg-dusty-rose text-white font-medium rounded-lg hover:bg-dusty-rose/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{mode === 'login' ? 'Logging in...' : 'Signing up...'}</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Log In' : 'Sign Up'}</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-warm-gray text-xs font-medium uppercase tracking-wider">Or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social login buttons */}
        <div className="space-y-3">
          <SocialButton icon="google" label="Continue with Google" />
          <SocialButton icon="apple" label="Continue with Apple" />
        </div>

        {mode === 'login' && (
          <button className="w-full text-center text-dusty-rose text-sm mt-6 hover:text-dusty-rose/80 transition-colors">
            Forgot password?
          </button>
        )}
      </div>

      {/* Switch mode card */}
      {setMode && (
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-charcoal text-sm">
            {mode === 'login' ? (
              <>
                {"Don't have an account? "}
                <button
                  onClick={() => setMode('register')}
                  className="text-dusty-rose font-semibold hover:text-dusty-rose/80 transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                {"Have an account? "}
                <button
                  onClick={() => setMode('login')}
                  className="text-dusty-rose font-semibold hover:text-dusty-rose/80 transition-colors"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      )}

      {/* App download section - Instagram style (mobile only) */}
      <div className="mt-6 text-center md:hidden">
        <p className="text-warm-gray text-sm mb-4">Get the app.</p>
        <div className="flex items-center justify-center gap-3">
          <AppStoreBadge store="apple" />
          <AppStoreBadge store="google" />
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-warm-gray">
          <a href="#" className="hover:text-charcoal transition-colors">About</a>
          <a href="#" className="hover:text-charcoal transition-colors">Help</a>
          <a href="#" className="hover:text-charcoal transition-colors">Privacy</a>
          <a href="#" className="hover:text-charcoal transition-colors">Terms</a>
        </div>
        <p className="text-xs text-warm-gray/70 mt-3">
          2024 SomaStreak
        </p>
      </div>
    </div>
  )
}

function InputField({ name, type, placeholder, value, onChange }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-pearl/50 border border-border rounded-lg text-sm text-charcoal placeholder:text-warm-gray/70 focus:outline-none focus:ring-2 focus:ring-dusty-rose/30 focus:border-dusty-rose/50 transition-all"
    />
  )
}

function SocialButton({ icon, label }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 py-3 bg-cream border border-border rounded-lg hover:bg-pearl/80 transition-all text-sm font-medium text-charcoal"
    >
      {icon === 'google' && (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
          />
          <path
            fill="#34A853"
            d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
          />
          <path
            fill="#4A90E2"
            d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
          />
          <path
            fill="#FBBC05"
            d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7## L1.23746264,17.3349879 L5.27698177,14.2678769 Z"
          />
        </svg>
      )}
      {icon === 'apple' && (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
        </svg>
      )}
      {label}
    </button>
  )
}

function AppStoreBadge({ store }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-charcoal/90 transition-colors">
      {store === 'apple' ? (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
          <div className="text-left">
            <p className="text-[10px] leading-none opacity-80">Download on the</p>
            <p className="text-sm font-semibold leading-tight">App Store</p>
          </div>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
          </svg>
          <div className="text-left">
            <p className="text-[10px] leading-none opacity-80">GET IT ON</p>
            <p className="text-sm font-semibold leading-tight">Google Play</p>
          </div>
        </>
      )}
    </button>
  )
}
