'use client'

import GlassCard from '../layout/GlassCard'

export default function PageCalculator({ 
  pagesToNextLevel = 25,
  pagesToFinishBook = 155,
  pagesToSquadLead = 12,
  pagesToNextMilestone = 55
}) {
  const calculations = [
    { label: 'Pages to next level', value: pagesToNextLevel, color: 'var(--dusty-rose)' },
    { label: 'Pages to finish book', value: pagesToFinishBook, color: 'var(--sage)' },
    { label: 'Pages to squad lead', value: pagesToSquadLead, color: 'var(--dusty-rose)' },
    { label: 'Pages to milestone', value: pagesToNextMilestone, color: 'var(--sage)' },
  ]
  
  const maxValue = Math.max(...calculations.map(c => c.value))
  
  return (
    <GlassCard className="mt-6">
      <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">
        Page Calculator
      </h3>
      
      <div className="flex flex-col gap-4">
        {calculations.map((calc, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-warm-gray">{calc.label}</span>
              <span className="text-sm font-medium text-charcoal">{calc.value}</span>
            </div>
            <div className="h-2 bg-sand/50 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700"
                style={{ 
                  width: `${Math.max(5, (1 - calc.value / maxValue) * 100)}%`,
                  backgroundColor: calc.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
