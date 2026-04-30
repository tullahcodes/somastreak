'use client'

import { cn } from '@/lib/utils'

export default function ModeToggle({ mode, onModeChange }) {
  return (
    <div className="glass-card rounded-full p-1.5 flex gap-1">
      <button
        onClick={() => onModeChange('social')}
        className={cn(
          'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
          mode === 'social'
            ? 'bg-white text-charcoal shadow-soft'
            : 'text-warm-gray hover:text-charcoal'
        )}
      >
        Social 🌸
      </button>
      <button
        onClick={() => onModeChange('focus')}
        className={cn(
          'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
          mode === 'focus'
            ? 'bg-white text-charcoal shadow-soft'
            : 'text-warm-gray hover:text-charcoal'
        )}
      >
        Deep Soma 🌿
      </button>
    </div>
  )
}
