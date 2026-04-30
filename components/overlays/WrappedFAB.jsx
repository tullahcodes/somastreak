'use client'

import { Sparkles } from 'lucide-react'

export default function WrappedFAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 px-5 py-3 glass-card rounded-full font-medium text-charcoal hover:shadow-float transition-all duration-300 animate-float z-40"
      style={{
        animationDuration: '3s'
      }}
    >
      <span className="inline-flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Your Wrapped
      </span>
    </button>
  )
}
