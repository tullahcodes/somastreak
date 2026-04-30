'use client'

import { Sparkles } from 'lucide-react'
import { useMemo } from 'react'

export default function StudyAura({ streak = 0 }) {
  const auraStyle = useMemo(() => {
    const hasHighStreak = streak >= 10
    
    return {
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      background: hasHighStreak
        ? `radial-gradient(ellipse at 30% 20%, rgba(232, 213, 213, 0.4) 0%, transparent 50%),
           radial-gradient(ellipse at 70% 80%, rgba(212, 165, 165, 0.25) 0%, transparent 50%),
           radial-gradient(ellipse at 50% 50%, rgba(240, 235, 229, 0.6) 0%, transparent 70%),
           linear-gradient(135deg, #F5F1EB 0%, #FDF8F3 50%, #F0EBE5 100%)`
        : `radial-gradient(ellipse at 30% 20%, rgba(232, 223, 208, 0.3) 0%, transparent 50%),
           radial-gradient(ellipse at 70% 80%, rgba(181, 196, 177, 0.2) 0%, transparent 50%),
           linear-gradient(135deg, #F5F1EB 0%, #FDFBF7 50%, #F0EBE5 100%)`,
      transition: 'background 1.5s ease-in-out',
    }
  }, [streak])

  return (
    <>
      <div style={auraStyle} />
      {/* Decorative floating elements */}
      <div 
        className="fixed top-20 left-[10%] opacity-20 animate-sway pointer-events-none"
        style={{ animationDelay: '0s' }}
      >
        <Sparkles className="w-8 h-8 text-dusty-rose" />
      </div>
      <div 
        className="fixed top-40 right-[15%] opacity-15 animate-sway pointer-events-none"
        style={{ animationDelay: '0.5s' }}
      >
        <Sparkles className="w-6 h-6 text-dusty-rose" />
      </div>
      <div 
        className="fixed bottom-32 left-[20%] opacity-15 animate-twinkle pointer-events-none"
        style={{ animationDelay: '1s' }}
      >
        <Sparkles className="w-5 h-5 text-dusty-rose" />
      </div>
      <div 
        className="fixed bottom-48 right-[25%] opacity-20 animate-twinkle pointer-events-none"
        style={{ animationDelay: '1.5s' }}
      >
        <Sparkles className="w-4 h-4 text-dusty-rose" />
      </div>
    </>
  )
}
