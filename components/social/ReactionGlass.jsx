'use client'

import { Lock, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ReactionGlass({ reaction, isLocked }) {
  const AvatarIcon = reaction.avatar && typeof reaction.avatar !== 'string' ? reaction.avatar : User
  const avatarText = typeof reaction.avatar === 'string' ? reaction.avatar : null

  return (
    <div className="relative">
      <div 
        className={cn(
          'glass-card p-4 rounded-2xl transition-all duration-300',
          isLocked && 'select-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: 'linear-gradient(135deg, #E8D5D5, #F0EBE5)' }}
          >
            {AvatarIcon ? (
              <AvatarIcon className="w-4 h-4 text-charcoal" />
            ) : (
              <span className="text-sm">{avatarText}</span>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-charcoal">{reaction.author}</p>
          </div>
          <span 
            className="px-2 py-0.5 rounded-full text-xs"
            style={{ 
              backgroundColor: 'var(--blush)',
              color: 'var(--charcoal)'
            }}
          >
            Page {reaction.page}
          </span>
        </div>
        
        {/* Content */}
        <p 
          className={cn(
            'text-sm text-charcoal leading-relaxed',
            isLocked && 'opacity-0'
          )}
        >
          {reaction.content}
        </p>
        
        {/* Timestamp */}
        <p 
          className={cn(
            'text-xs text-warm-gray mt-2',
            isLocked && 'opacity-0'
          )}
        >
          {reaction.time}
        </p>
      </div>
      
      {/* Spoiler Shield Overlay */}
      {isLocked && (
        <div 
          className="absolute inset-0 rounded-2xl flex items-center justify-center spoiler-blur"
          style={{ 
            backgroundColor: 'rgba(253, 251, 247, 0.7)',
          }}
        >
          <div className="text-center">
            <Lock className="w-6 h-6 mx-auto mb-1 text-charcoal" />
            <p className="text-sm text-warm-gray">
              Page {reaction.page}
            </p>
            <p className="text-xs text-warm-gray/70">
              Keep reading to unlock
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
