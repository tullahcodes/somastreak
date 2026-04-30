'use client'

import GlassCard from '../layout/GlassCard'
import ReactionGlass from './ReactionGlass'

export default function ReactionsSection({ reactions, userCurrentPage, visible }) {
  if (!visible) return null
  
  return (
    <div className="animate-fade-scale mt-6">
      <GlassCard>
        <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
          Squad Reactions
        </h3>
        <p className="text-sm text-warm-gray mb-4">
          See what your squad is saying about the book
        </p>
        
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
          {reactions.map((reaction) => (
            <ReactionGlass 
              key={reaction.id}
              reaction={reaction}
              isLocked={reaction.page > userCurrentPage}
            />
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
