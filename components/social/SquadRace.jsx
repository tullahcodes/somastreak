'use client'

import { useRef, useEffect } from 'react'
import GlassCard from '../layout/GlassCard'
import EtherealRacer from './EtherealRacer'
import { gsap } from 'gsap'

export default function SquadRace({ squad, visible }) {
  const trackRef = useRef(null)
  const racersRef = useRef([])
  
  useEffect(() => {
    if (!visible || !trackRef.current) return
    
    // Animate racers to their positions
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
  }, [squad, visible])
  
  if (!visible) return null
  
  return (
    <div className="animate-fade-scale">
      <GlassCard>
        <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
          Squad Reading Race
        </h3>
        <p className="text-sm text-warm-gray mb-6">
          See how your reading compares to your squad
        </p>
        
        {/* Race Track */}
        <div 
          ref={trackRef}
          className="relative h-20 bg-gradient-to-r from-blush/30 via-cream to-sage/30 rounded-2xl overflow-visible"
        >
          {/* Ethereal Thread Line */}
          <div 
            className="absolute top-1/2 left-4 right-4 h-px -translate-y-1/2"
            style={{
              background: 'linear-gradient(90deg, var(--dusty-rose) 0%, var(--sage) 50%, var(--dusty-rose) 100%)',
              opacity: 0.5
            }}
          />
          
          {/* Start and End markers */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-warm-gray">
            Start
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-warm-gray">
            Finish
          </div>
          
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
        
        {/* Leaderboard */}
        <div className="mt-6 flex flex-col gap-2">
          {[...squad]
            .sort((a, b) => (b.currentPage / b.totalPages) - (a.currentPage / a.totalPages))
            .map((member, index) => (
              <div 
                key={member.id}
                className="flex items-center gap-3 p-2 rounded-xl transition-colors"
                style={{
                  backgroundColor: member.isUser ? 'var(--blush)' : 'transparent'
                }}
              >
                <span className="text-sm text-warm-gray w-4">{index + 1}</span>
                <span className="text-lg">{member.avatar}</span>
                <span className="text-sm font-medium text-charcoal flex-1">
                  {member.name}
                  {member.isUser && <span className="text-dusty-rose ml-1">(You)</span>}
                </span>
                <span className="text-xs text-warm-gray">
                  {member.currentPage}/{member.totalPages}
                </span>
              </div>
            ))}
        </div>
      </GlassCard>
    </div>
  )
}
