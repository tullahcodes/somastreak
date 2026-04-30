'use client'

import { useState } from 'react'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function EtherealRacer({ member, isUser }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const AvatarIcon = member.avatar && typeof member.avatar !== 'string' ? member.avatar : User
  const avatarText = typeof member.avatar === 'string' ? member.avatar : null

  return (
    <div 
      className="relative cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Avatar */}
      <div 
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300',
          isUser && 'ring-2 ring-dusty-rose ring-offset-2'
        )}
        style={{
          background: member.color || 'linear-gradient(135deg, #E8D5D5, #F0EBE5)'
        }}
      >
        {AvatarIcon ? (
          <AvatarIcon className="w-5 h-5 text-charcoal" />
        ) : (
          <span className="text-base">{avatarText}</span>
        )}
      </div>
      
      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 glass-card rounded-lg whitespace-nowrap z-10"
          style={{ minWidth: '80px', textAlign: 'center' }}
        >
          <p className="text-xs font-medium text-charcoal">{member.name}</p>
          <p className="text-xs text-warm-gray">
            Page {member.currentPage}
          </p>
          {/* Tooltip arrow */}
          <div 
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid rgba(253, 251, 247, 0.85)'
            }}
          />
        </div>
      )}
    </div>
  )
}
