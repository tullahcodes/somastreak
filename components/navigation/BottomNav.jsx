'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Home Icon with book
function HomeIcon({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997h0A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" />
    </svg>
  )
}

// Focus/Deep Work Icon (lotus/meditation)
function DeepSomaIcon({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 6c-1.1 0-2 .9-2 2h4c0-1.1-.9-2-2-2zM12 18c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zM6 12c0-1.1.9-2 2-2v4c-1.1 0-2-.9-2-2zM18 12c0 1.1-.9 2-2 2v-4c1.1 0 2 .9 2 2z"/>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 6v2M12 16v2M6 12h2M16 12h2"/>
    </svg>
  )
}

// Discussion/Squad Icon
function DiscussionIcon({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 6h-2V4c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2v4l4-4h6l4 4v-4h2c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 8h-4v2.59l-2.29-2.29-.29-.3H7v-10h14v10z"/>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3z"/>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <circle cx="9" cy="10" r="2"/>
      <circle cx="15" cy="10" r="2"/>
    </svg>
  )
}

// Profile Icon
function ProfileIcon({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function LibraryIcon({ active }) {
  return active ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6h16v14H4V6zm2 2v10h12V8H6zm2 2h2v2H8V10zm0 4h2v2H8v-2zm4-4h2v2h-2V10zm0 4h2v2h-2v-2z" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M6 8h12" />
      <path d="M9 12h2" />
      <path d="M9 16h2" />
      <path d="M13 12h2" />
      <path d="M13 16h2" />
    </svg>
  )
}

const navItems = [
  { 
    id: 'home', 
    label: 'Home', 
    sublabel: 'Welcome back',
    icon: HomeIcon, 
    href: '/' 
  },
  { 
    id: 'library', 
    label: 'Library', 
    sublabel: 'Your books',
    icon: LibraryIcon, 
    href: '/library' 
  },
  { 
    id: 'deep-soma', 
    label: 'Deep Soma', 
    sublabel: 'Focus mode',
    icon: DeepSomaIcon, 
    href: '/focus' 
  },
  { 
    id: 'discussion', 
    label: 'Discussion', 
    sublabel: 'Squad & Goals',
    icon: DiscussionIcon, 
    href: '/squad' 
  },
  { 
    id: 'profile', 
    label: 'Profile', 
    sublabel: 'Your journey',
    icon: ProfileIcon, 
    href: '/profile' 
  }
]

export default function BottomNav({ currentBook = 'The Art of Mindful Reading' }) {
  const pathname = usePathname()

  // Determine active tab from pathname
  const getCurrentTab = () => {
    if (pathname === '/') return 'home'
    if (pathname === '/library') return 'library'
    if (pathname === '/focus') return 'deep-soma'
    if (pathname === '/squad' || pathname === '/search') return 'discussion'
    if (pathname === '/profile') return 'profile'
    return 'home'
  }

  const currentTab = getCurrentTab()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Glass background */}
      <div className="absolute inset-0 bg-cream/95 backdrop-blur-xl border-t border-white/40 shadow-lg" />
      
      {/* Navigation items */}
      <div className="relative flex items-stretch justify-around h-16 pb-safe">
        {navItems.map((item) => {
          const isActive = currentTab === item.id
          const Icon = item.icon
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                relative flex flex-col items-center justify-center
                flex-1 h-full transition-all duration-200
                active:scale-95 active:opacity-80
              `}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active background pill */}
              {isActive && (
                <div className="absolute inset-x-2 inset-y-1.5 bg-dusty-rose/10 rounded-xl" />
              )}
              
              {/* Icon */}
              <span 
                className={`
                  relative z-10 transition-all duration-200 mb-0.5
                  ${isActive ? 'text-dusty-rose scale-110' : 'text-warm-gray'}
                `}
              >
                <Icon active={isActive} />
              </span>
              
              {/* Label */}
              <span 
                className={`
                  relative z-10 text-[10px] font-medium transition-colors duration-200
                  ${isActive ? 'text-dusty-rose' : 'text-warm-gray'}
                `}
              >
                {item.label}
              </span>
              
              {/* Sublabel for Home - shows current book */}
              {item.id === 'home' && isActive && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-charcoal/70 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
                  {currentBook.length > 20 ? currentBook.slice(0, 20) + '...' : currentBook}
                </span>
              )}
              
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-dusty-rose" />
              )}
            </Link>
          )
        })}
      </div>
      
      {/* Bottom safe area for iOS */}
      <div className="h-safe bg-cream/95" />
    </nav>
  )
}
