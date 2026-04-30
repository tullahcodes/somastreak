'use client'

import GlassCard from '../layout/GlassCard'
import { cn } from '@/lib/utils'

const defaultMilestones = [
  { id: 1, label: 'First Page', value: '1 page', reached: true },
  { id: 2, label: 'Chapter One', value: '25 pages', reached: true },
  { id: 3, label: 'Getting Started', value: '50 pages', reached: true },
  { id: 4, label: 'Quarter Way', value: '100 pages', reached: false },
  { id: 5, label: 'Halfway There', value: '200 pages', reached: false },
  { id: 6, label: 'Book Finished', value: '400 pages', reached: false },
]

export default function MilestoneTree({ milestones = defaultMilestones }) {
  return (
    <GlassCard className="mt-6">
      <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">
        Reading Milestones
      </h3>
      
      <div className="relative pl-6">
        {/* Connecting Line */}
        <div 
          className="absolute left-2 top-2 bottom-2 w-px"
          style={{ backgroundColor: 'var(--sand)' }}
        />
        
        <div className="flex flex-col gap-4">
          {milestones.map((milestone, index) => (
            <MilestoneItem 
              key={milestone.id} 
              milestone={milestone}
              isLast={index === milestones.length - 1}
            />
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

function MilestoneItem({ milestone, isLast }) {
  return (
    <div className={cn(
      'relative flex items-center gap-3 transition-opacity duration-300',
      milestone.reached ? 'opacity-100' : 'opacity-40'
    )}>
      {/* Dot */}
      <div 
        className={cn(
          'absolute -left-6 w-3 h-3 rounded-full border-2 transition-colors duration-300',
          milestone.reached 
            ? 'bg-sage border-sage' 
            : 'bg-sand border-warm-gray/30'
        )}
      />
      
      <div className="flex-1">
        <p className="text-sm font-medium text-charcoal">
          {milestone.label}
        </p>
        <p className="text-xs text-warm-gray">
          {milestone.value}
        </p>
      </div>
      
      {milestone.reached && (
        <span className="text-sage text-sm">✓</span>
      )}
    </div>
  )
}
