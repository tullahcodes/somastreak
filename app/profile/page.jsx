'use client'

import { useState } from 'react'
import Link from 'next/link'
import StudyAura from '@/components/layout/StudyAura'
import AppContainer from '@/components/layout/AppContainer'
import GlassCard from '@/components/layout/GlassCard'
import BottomNav from '@/components/navigation/BottomNav'
import WrappedOverlay from '@/components/overlays/WrappedOverlay'

// Mock user data
const userData = {
  name: 'Michelle',
  username: '@michelle_reads',
  avatar: '👩‍💻',
  bio: 'Avid reader | Coffee lover | On a journey to read 50 books this year',
  streak: 12,
  xp: 2450,
  level: 7,
  totalBooks: 24,
  pagesRead: 8420,
  readingSince: 'January 2024',
  badges: [
    { id: 1, icon: '🔥', label: '10 Day Streak', earned: true },
    { id: 2, icon: '📚', label: 'Bookworm', earned: true },
    { id: 3, icon: '🌙', label: 'Night Owl', earned: true },
    { id: 4, icon: '☀️', label: 'Early Bird', earned: false },
    { id: 5, icon: '🎯', label: 'Goal Crusher', earned: true },
    { id: 6, icon: '💎', label: 'Diamond Reader', earned: false },
  ],
  recentBooks: [
    { id: 1, title: 'The Art of Mindful Reading', progress: 11, icon: '📖' },
    { id: 2, title: 'Deep Work', progress: 43, icon: '📚' },
    { id: 3, title: 'Atomic Habits', progress: 100, icon: '✨' },
  ]
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function LogOutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('stats')
  const [isWrappedOpen, setIsWrappedOpen] = useState(false)
  const [wrappedSlide, setWrappedSlide] = useState(0)

  const squadStats = {
    totalPages: 2847,
    hotPage: 127,
    hotPageReactions: 18,
  }

  const userStats = {
    streak: userData.streak,
    totalPages: userData.pagesRead,
  }

  const openWrapped = () => {
    setActiveTab('wrapped')
    setWrappedSlide(0)
    setIsWrappedOpen(true)
  }

  const closeWrapped = () => {
    setIsWrappedOpen(false)
  }

  return (
    <>
      <StudyAura streak={userData.streak} />
      
      <AppContainer>
        {/* Header */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <h1 className="font-serif text-2xl font-semibold text-charcoal">
            Profile
          </h1>
          <button className="p-2 text-warm-gray hover:text-charcoal transition-colors">
            <SettingsIcon />
          </button>
        </div>

        {/* Profile Card */}
        <GlassCard className="mb-6">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-4"
              style={{ background: 'linear-gradient(135deg, #E8D5D5, #B5C4B1)' }}
            >
              {userData.avatar}
            </div>

            {/* Name & Username */}
            <h2 className="font-serif text-xl font-semibold text-charcoal">
              {userData.name}
            </h2>
            <p className="text-sm text-warm-gray mb-2">{userData.username}</p>
            <p className="text-sm text-charcoal/80 max-w-xs mb-4">
              {userData.bio}
            </p>

            {/* Stats Row */}
            <div className="flex gap-6 w-full justify-center py-4 border-y border-border">
              <div className="text-center">
                <p className="text-xl font-semibold text-charcoal">{userData.totalBooks}</p>
                <p className="text-xs text-warm-gray">Books</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-charcoal">{userData.pagesRead.toLocaleString()}</p>
                <p className="text-xs text-warm-gray">Pages</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-charcoal">{userData.streak}</p>
                <p className="text-xs text-warm-gray">Day Streak</p>
              </div>
            </div>

            {/* Level Progress */}
            <div className="w-full mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-charcoal font-medium">Level {userData.level}</span>
                <span className="text-warm-gray">{userData.xp % 500}/500 XP</span>
              </div>
              <div className="h-2 bg-sand/50 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${(userData.xp % 500) / 5}%`,
                    backgroundColor: 'var(--dusty-rose)'
                  }}
                />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Tabs */}
        <div className="flex bg-sand/50 p-1 rounded-full mb-6">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === 'stats' 
                ? 'bg-cream text-charcoal shadow-soft' 
                : 'text-warm-gray'
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === 'badges' 
                ? 'bg-cream text-charcoal shadow-soft' 
                : 'text-warm-gray'
            }`}
          >
            Badges
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === 'books' 
                ? 'bg-cream text-charcoal shadow-soft' 
                : 'text-warm-gray'
            }`}
          >
            Books
          </button>
          <button
            onClick={openWrapped}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === 'wrapped' 
                ? 'bg-cream text-charcoal shadow-soft' 
                : 'text-warm-gray'
            }`}
          >
            Wrapped
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'stats' && (
          <GlassCard className="mb-6">
            <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">
              Reading Statistics
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Current Streak" value={`${userData.streak} days`} icon="🔥" />
              <StatCard label="Total XP" value={userData.xp.toLocaleString()} icon="✨" />
              <StatCard label="Books Read" value={userData.totalBooks} icon="📚" />
              <StatCard label="Pages Read" value={userData.pagesRead.toLocaleString()} icon="📄" />
              <StatCard label="Reading Since" value={userData.readingSince} icon="📅" />
              <StatCard label="Avg Pages/Day" value="23" icon="📊" />
            </div>
          </GlassCard>
        )}

        {activeTab === 'badges' && (
          <GlassCard className="mb-6">
            <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">
              Your Badges
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {userData.badges.map(badge => (
                <div 
                  key={badge.id}
                  className={`flex flex-col items-center p-4 rounded-2xl text-center transition-all ${
                    badge.earned ? 'bg-blush/30' : 'bg-sand/30 opacity-50'
                  }`}
                >
                  <span className={`text-3xl mb-2 ${!badge.earned && 'grayscale'}`}>
                    {badge.icon}
                  </span>
                  <span className="text-xs text-charcoal font-medium">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {activeTab === 'books' && (
          <GlassCard className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-semibold text-charcoal">
                Recent Books
              </h3>
              <Link href="/search" className="text-dusty-rose text-sm flex items-center gap-1">
                See all <ChevronRightIcon />
              </Link>
            </div>
            
            <div className="flex flex-col gap-3">
              {userData.recentBooks.map(book => (
                <div key={book.id} className="flex items-center gap-3 p-2">
                  <span className="text-2xl">{book.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">
                      {book.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-sand/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${book.progress}%`,
                            backgroundColor: book.progress === 100 ? 'var(--sage)' : 'var(--dusty-rose)'
                          }}
                        />
                      </div>
                      <span className="text-xs text-warm-gray">
                        {book.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {activeTab === 'wrapped' && (
          <GlassCard className="mb-6 text-center">
            <p className="text-sm text-warm-gray mb-4">
              Your Wrapped story is ready. Tap below to view your year in story mode.
            </p>
            <button
              onClick={openWrapped}
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-dusty-rose text-white font-medium shadow-soft transition-colors hover:bg-dusty-rose/90"
            >
              Open Wrapped Story
            </button>
          </GlassCard>
        )}

        <WrappedOverlay
          visible={isWrappedOpen}
          onClose={closeWrapped}
          currentSlide={wrappedSlide}
          onSlideChange={setWrappedSlide}
          squadStats={squadStats}
          userStats={userStats}
        />
        {/* Settings Links */}
        <GlassCard className="mb-24">
          <SettingsLink icon="🔔" label="Notifications" />
          <SettingsLink icon="🎨" label="Appearance" />
          <SettingsLink icon="🔒" label="Privacy" />
          <SettingsLink icon="❓" label="Help & Support" />
          <button
            onClick={() => {
              localStorage.removeItem('soma-authenticated')
              window.location.href = '/auth/login'
            }}
            className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors w-full text-left"
          >
            <LogOutIcon />
            <span>Log Out</span>
          </button>
        </GlassCard>
      </AppContainer>

      <BottomNav currentBook="The Art of Mindful Reading" />
      <div className="h-20 md:hidden" />
    </>
  )
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-sand/30 p-4 rounded-2xl">
      <div className="flex items-center gap-2 mb-1">
        <span>{icon}</span>
        <span className="text-xs text-warm-gray">{label}</span>
      </div>
      <p className="text-lg font-semibold text-charcoal">{value}</p>
    </div>
  )
}

function SettingsLink({ icon, label }) {
  return (
    <button className="w-full flex items-center justify-between p-3 hover:bg-sand/30 rounded-xl transition-colors">
      <div className="flex items-center gap-3">
        <span>{icon}</span>
        <span className="text-charcoal">{label}</span>
      </div>
      <ChevronRightIcon />
    </button>
  )
}
