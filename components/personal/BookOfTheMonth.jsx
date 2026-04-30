'use client'

import { BookOpen } from 'lucide-react'
import GlassCard from '../layout/GlassCard'

export default function BookOfTheMonth({ book }) {
  return (
    <div 
      className="rounded-3xl p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #E8D5D5 0%, #F0EBE5 100%)',
      }}
    >
      {/* Badge */}
      <div 
        className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium label-style"
        style={{ 
          backgroundColor: 'var(--dusty-rose)',
          color: 'white',
          letterSpacing: '0.15em'
        }}
      >
        BOOK OF THE MONTH
      </div>
      
      <div className="flex gap-4 mt-4">
        {/* Book Cover Placeholder */}
        <div 
          className="w-20 h-28 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(145deg, #D4A5A5 0%, #B5C4B1 100%)',
          }}
        >
          <BookOpen className="w-10 h-10 text-cream" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-1 line-clamp-2">
            {book?.title || 'The Art of Mindful Reading'}
          </h3>
          <p className="text-sm text-warm-gray line-clamp-2">
            {book?.description || 'A journey through contemplative literature and focused attention.'}
          </p>
        </div>
      </div>
    </div>
  )
}
