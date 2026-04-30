'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function LevelUpModal({ visible, level, onClose }) {
  useEffect(() => {
    if (visible) {
      // Multi-burst confetti
      const duration = 2000
      const animationEnd = Date.now() + duration
      
      const colors = ['#D4A5A5', '#B5C4B1', '#E8D5D5', '#F0EBE5', '#E8DFD0']
      
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors
        })
        
        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame)
        }
      }
      
      frame()
      
      // Auto dismiss
      const timer = setTimeout(() => {
        onClose?.()
      }, 3500)
      
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])
  
  if (!visible) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/20">
      <div 
        className="glass-card rounded-3xl p-8 text-center animate-fade-scale max-w-sm mx-4"
        style={{
          animation: 'fade-scale-in 0.5s ease-out, gentle-float 2s ease-in-out 0.5s infinite'
        }}
      >
        <div className="text-5xl mb-4">🌸</div>
        <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">
          You&apos;ve Blossomed!
        </h2>
        <p className="text-lg text-dusty-rose font-medium mb-4">
          Level {level}
        </p>
        <p className="text-sm text-warm-gray">
          Keep reading to continue growing your garden
        </p>
        
        <div className="flex justify-center gap-2 mt-6">
          {['🌱', '🌿', '🌷', '🌹', '🌻'].map((plant, i) => (
            <span 
              key={i}
              className="text-xl"
              style={{
                animation: `fade-scale-in 0.3s ease-out ${0.1 * (i + 1)}s both`
              }}
            >
              {plant}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
