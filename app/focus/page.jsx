'use client'

import { useState, useCallback } from 'react'
import StudyAura from '@/components/layout/StudyAura'
import AppContainer from '@/components/layout/AppContainer'
import DeepWorkCard from '@/components/focus/DeepWorkCard'
import BottomNav from '@/components/navigation/BottomNav'
import GlassCard from '@/components/layout/GlassCard'

export default function FocusPage() {
  const [sessionsToday, setSessionsToday] = useState(2)
  const [totalMinutes, setTotalMinutes] = useState(50)

  const handleSessionComplete = useCallback(() => {
    setSessionsToday(prev => prev + 1)
    setTotalMinutes(prev => prev + 25)
  }, [])

  return (
    <>
      <StudyAura streak={12} />
      
      <AppContainer>
        {/* Header */}
        <div className="pt-4 pb-2">
          <h1 className="font-serif text-2xl font-semibold text-charcoal mb-1">
            Deep Focus Mode
          </h1>
          <p className="text-sm text-warm-gray mb-6">
            Cultivate your reading garden
          </p>
        </div>

        {/* Today&apos;s Stats */}
        <GlassCard className="mb-6">
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">
            Today&apos;s Focus
          </h3>
          <div className="flex gap-4">
            <div className="flex-1 text-center py-4 bg-sage/20 rounded-2xl">
              <p className="text-2xl font-semibold text-charcoal">{sessionsToday}</p>
              <p className="text-xs text-warm-gray mt-1">Sessions</p>
            </div>
            <div className="flex-1 text-center py-4 bg-dusty-rose/20 rounded-2xl">
              <p className="text-2xl font-semibold text-charcoal">{totalMinutes}</p>
              <p className="text-xs text-warm-gray mt-1">Minutes</p>
            </div>
            <div className="flex-1 text-center py-4 bg-blush/30 rounded-2xl">
              <p className="text-2xl font-semibold text-charcoal">{Math.floor(totalMinutes / 25)}</p>
              <p className="text-xs text-warm-gray mt-1">Plants Grown</p>
            </div>
          </div>
        </GlassCard>

        {/* Focus Timer */}
        <DeepWorkCard 
          visible={true}
          onSessionComplete={handleSessionComplete}
        />

        {/* Tips */}
        <GlassCard className="mt-6 mb-24">
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">
            Focus Tips
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-sage">1.</span>
              <p className="text-sm text-charcoal">Find a quiet, comfortable reading spot</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sage">2.</span>
              <p className="text-sm text-charcoal">Put your phone on silent or Do Not Disturb</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sage">3.</span>
              <p className="text-sm text-charcoal">Have water and snacks nearby to avoid interruptions</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sage">4.</span>
              <p className="text-sm text-charcoal">Take notes to stay engaged with the material</p>
            </li>
          </ul>
        </GlassCard>
      </AppContainer>

      <BottomNav currentBook="The Art of Mindful Reading" />
      
      <div className="h-20 md:hidden" />
    </>
  )
}
