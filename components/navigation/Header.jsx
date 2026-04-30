'use client'

import { BookOpen } from 'lucide-react'
import ModeToggle from './ModeToggle'

export default function Header({ mode, onModeChange }) {
  return (
    <header className="flex flex-col gap-6 mb-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-charcoal" />
        <div>
          <h1 className="font-serif text-2xl font-semibold text-charcoal tracking-tight">
            SomaStreak
          </h1>
          <p className="text-sm text-warm-gray font-light">
            Your reading sanctuary
          </p>
        </div>
      </div>
      
      <ModeToggle mode={mode} onModeChange={onModeChange} />
    </header>
  )
}
