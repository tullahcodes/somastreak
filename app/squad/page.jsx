'use client'

import { useState, useEffect, useRef } from 'react'
import StudyAura from '@/components/layout/StudyAura'
import AppContainer from '@/components/layout/AppContainer'
import GlassCard from '@/components/layout/GlassCard'
import BottomNav from '@/components/navigation/BottomNav'
import EtherealRacer from '@/components/social/EtherealRacer'
import { gsap } from 'gsap'

// Mock squad data
const initialSquad = [
  { id: 1, name: 'Michelle', currentPage: 45, totalPages: 400, avatar: '👩‍💻', isUser: true, color: 'linear-gradient(135deg, #E8D5D5, #D4A5A5)', status: 'Reading now' },
  { id: 2, name: 'Sarah', currentPage: 67, totalPages: 400, avatar: '👩‍🎨', isUser: false, color: 'linear-gradient(135deg, #B5C4B1, #E8DFD0)', status: 'Read 5 pages today' },
  { id: 3, name: 'Alex', currentPage: 38, totalPages: 400, avatar: '🧑‍💻', isUser: false, color: 'linear-gradient(135deg, #E8DFD0, #F0EBE5)', status: 'Last seen 2h ago' },
  { id: 4, name: 'Jordan', currentPage: 52, totalPages: 400, avatar: '👨‍🎤', isUser: false, color: 'linear-gradient(135deg, #D4A5A5, #B5C4B1)', status: 'Finished chapter 3' },
  { id: 5, name: 'Taylor', currentPage: 29, totalPages: 400, avatar: '👩‍🔬', isUser: false, color: 'linear-gradient(135deg, #F0EBE5, #E8D5D5)', status: 'Just started' },
]

const squadActivity = [
  { id: 1, user: 'Sarah', action: 'reached page 67', time: '10 min ago', avatar: '👩‍🎨' },
  { id: 2, user: 'Jordan', action: 'added a reflection', time: '25 min ago', avatar: '👨‍🎤' },
  { id: 3, user: 'Alex', action: 'started a focus session', time: '1 hour ago', avatar: '🧑‍💻' },
  { id: 4, user: 'Taylor', action: 'joined the squad', time: '2 hours ago', avatar: '👩‍🔬' },
]

function TrophyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3h14c.55 0 1 .45 1 1v2c0 2.21-1.79 4-4 4h-.24a6.02 6.02 0 0 1-3.26 3.59V16h2a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2v-2.41A6.02 6.02 0 0 1 7.74 10H7.5c-2.21 0-4-1.79-4-4V4c0-.55.45-1 1-1z"/>
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export default function SquadPage() {
  const [squad] = useState(initialSquad)
  const [view, setView] = useState('race') // 'race' or 'list'
  const trackRef = useRef(null)
  const racersRef = useRef([])

  useEffect(() => {
    if (view !== 'race' || !trackRef.current) return
    
    squad.forEach((member, index) => {
      const racer = racersRef.current[index]
      if (racer) {
        const percentage = member.currentPage / member.totalPages
        const trackWidth = trackRef.current.offsetWidth - 60
        const position = 30 + (trackWidth * percentage)
        
        gsap.to(racer, {
          left: position,
          duration: 1.5,
          ease: 'power2.out'
        })
      }
    })
  }, [squad, view])

  const sortedSquad = [...squad].sort((a, b) => b.currentPage - a.currentPage)

  return (
    <>
      <StudyAura streak={12} />
      
      <AppContainer>
        {/* Header */}
        <div className="pt-4 pb-2">
          <h1 className="font-serif text-2xl font-semibold text-charcoal mb-1">
            Your Reading Squad
          </h1>
          <p className="text-sm text-warm-gray mb-4">
            5 members reading &quot;The Art of Mindful Reading&quot;
          </p>

          {/* View Toggle */}
          <div className="flex bg-sand/50 p-1 rounded-full mb-6">
            <button
              onClick={() => setView('race')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                view === 'race' 
                  ? 'bg-cream text-charcoal shadow-soft' 
                  : 'text-warm-gray'
              }`}
            >
              Race View
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                view === 'list' 
                  ? 'bg-cream text-charcoal shadow-soft' 
                  : 'text-warm-gray'
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {/* Race View */}
        {view === 'race' && (
          <GlassCard className="mb-6">
            <div 
              ref={trackRef}
              className="relative h-24 bg-gradient-to-r from-blush/30 via-cream to-sage/30 rounded-2xl overflow-visible"
            >
              {/* Ethereal Thread Line */}
              <div 
                className="absolute top-1/2 left-4 right-4 h-px -translate-y-1/2"
                style={{
                  background: 'linear-gradient(90deg, var(--dusty-rose) 0%, var(--sage) 50%, var(--dusty-rose) 100%)',
                  opacity: 0.5
                }}
              />
              
              {/* Page markers */}
              {[0, 100, 200, 300, 400].map((page, i) => (
                <div 
                  key={page}
                  className="absolute bottom-2 text-xs text-warm-gray/60"
                  style={{ left: `${(i / 4) * 100}%`, transform: 'translateX(-50%)' }}
                >
                  {page}
                </div>
              ))}
              
              {/* Racers */}
              {squad.map((member, index) => {
                const percentage = member.currentPage / member.totalPages
                const initialPosition = 30 + ((trackRef.current?.offsetWidth || 400) - 60) * percentage
                
                return (
                  <div
                    key={member.id}
                    ref={el => racersRef.current[index] = el}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{ left: initialPosition }}
                  >
                    <EtherealRacer 
                      member={member}
                      isUser={member.isUser}
                    />
                  </div>
                )
              })}
            </div>
          </GlassCard>
        )}

        {/* Leaderboard / List */}
        <GlassCard className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold text-charcoal">
              Leaderboard
            </h2>
            <span className="text-xs text-warm-gray">
              Week 3
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {sortedSquad.map((member, index) => (
              <div 
                key={member.id}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                  member.isUser ? 'bg-blush/50 border border-dusty-rose/20' : 'hover:bg-sand/30'
                }`}
              >
                {/* Rank */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index === 0 ? 'bg-amber-100 text-amber-600' :
                  index === 1 ? 'bg-gray-100 text-gray-500' :
                  index === 2 ? 'bg-orange-100 text-orange-600' :
                  'bg-sand/50 text-warm-gray'
                }`}>
                  {index === 0 ? <TrophyIcon /> : index + 1}
                </div>

                {/* Avatar */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ background: member.color }}
                >
                  {member.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-charcoal">
                    {member.name}
                    {member.isUser && <span className="text-dusty-rose text-sm ml-1">(You)</span>}
                  </p>
                  <p className="text-xs text-warm-gray truncate">{member.status}</p>
                </div>

                {/* Progress */}
                <div className="text-right">
                  <p className="text-sm font-semibold text-charcoal">
                    {member.currentPage}
                  </p>
                  <p className="text-xs text-warm-gray">pages</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Activity Feed */}
        <GlassCard className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold text-charcoal">
              Squad Activity
            </h2>
            <button className="text-dusty-rose text-sm flex items-center gap-1">
              See all <ChevronRightIcon />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {squadActivity.map(activity => (
              <div key={activity.id} className="flex items-center gap-3">
                <span className="text-xl">{activity.avatar}</span>
                <div className="flex-1">
                  <p className="text-sm text-charcoal">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-warm-gray">{activity.action}</span>
                  </p>
                </div>
                <span className="text-xs text-warm-gray">{activity.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Invite Section */}
        <GlassCard className="mb-24">
          <div className="text-center py-4">
            <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">
              Invite Friends
            </h3>
            <p className="text-sm text-warm-gray mb-4">
              Reading is better together
            </p>
            <button className="px-6 py-3 bg-dusty-rose text-white rounded-full font-medium hover:shadow-soft transition-all active:scale-95">
              Share Squad Link
            </button>
          </div>
        </GlassCard>
      </AppContainer>

      <BottomNav currentBook="The Art of Mindful Reading" />
      <div className="h-20 md:hidden" />
    </>
  )
}
