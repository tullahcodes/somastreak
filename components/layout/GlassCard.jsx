'use client'

import { cn } from '@/lib/utils'

export default function GlassCard({ children, className, style, hover = true, ...props }) {
  return (
    <div
      className={cn(
        'glass-card rounded-3xl p-6 transition-all duration-300',
        hover && 'hover:shadow-float',
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}
