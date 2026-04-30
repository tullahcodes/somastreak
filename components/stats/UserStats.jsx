'use client'

import { useState } from 'react'
import { Flame, Sparkles, User } from 'lucide-react'
import GlassCard from '../layout/GlassCard'
import confetti from 'canvas-confetti'

export default function UserStats({ user, onLogProgress }) {
  const [pages, setPages] = useState('')
  const [reflection, setReflection] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!pages) return
    
    // Trigger confetti
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4A5A5', '#B5C4B1', '#E8D5D5']
    })
    
    onLogProgress?.({
      pages: parseInt(pages),
      reflection
    })
    
    setPages('')
    setReflection('')
  }
  
  return (
    <GlassCard data-stats-section>
      {/* User Info */}
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ background: 'linear-gradient(135deg, #E8D5D5, #B5C4B1)' }}
        >
          {user.avatar}
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-charcoal">
            {user.name}
          </h3>
          <p className="text-xs text-warm-gray">
            Reading since {user.readingSince || 'January 2024'}
          </p>
        </div>
      </div>
      
      {/* Stats Row */}
      <div className="flex gap-4 mb-6">
        <StatBadge label="Streak" value={user.streak} icon={Flame} />
        <StatBadge label="XP" value={user.xp.toLocaleString()} icon={Sparkles} />
        <StatBadge label="Level" value={user.level} highlight icon={Sparkles} />
      </div>
      
      {/* Log Form */}
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-xs text-warm-gray label-style">Pages Read Today</span>
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="Enter pages..."
            min="1"
            className="mt-1.5 w-full px-4 py-3 rounded-2xl bg-sand/30 border border-border text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-dusty-rose/30 transition-all"
          />
        </label>
        
        <label className="block mb-4">
          <span className="text-xs text-warm-gray label-style">Reflection (Optional)</span>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What did you learn today?"
            rows={3}
            className="mt-1.5 w-full px-4 py-3 rounded-2xl bg-sand/30 border border-border text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:ring-2 focus:ring-dusty-rose/30 transition-all resize-none"
          />
        </label>
        
        <button
          type="submit"
          className="w-full py-3 rounded-full font-medium transition-all duration-300 hover:shadow-soft"
          style={{
            backgroundColor: 'var(--dusty-rose)',
            color: 'white'
          }}
        >
          <span className="inline-flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Record Entry
          </span>
        </button>
      </form>
    </GlassCard>
  )
}

function StatBadge({ label, value, icon, highlight }) {
  const Icon = icon

  return (
    <div 
      className="flex-1 text-center py-3 rounded-2xl"
      style={{
        backgroundColor: highlight ? 'var(--dusty-rose)' : 'var(--sand)',
        color: highlight ? 'white' : 'var(--charcoal)'
      }}
    >
      <p className="text-lg font-semibold">
        {Icon && <Icon className="inline-block w-4 h-4 mr-1" />}
        {value}
      </p>
      <p 
        className="text-xs mt-0.5"
        style={{ 
          color: highlight ? 'rgba(255,255,255,0.8)' : 'var(--warm-gray)'
        }}
      >
        {label}
      </p>
    </div>
  )
}
