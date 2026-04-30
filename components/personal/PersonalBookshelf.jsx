'use client'

import { BookOpen, Sparkles } from 'lucide-react'
import GlassCard from '../layout/GlassCard'
import { cn } from '@/lib/utils'

const BOOK_ICON_MAP = {
  '📖': BookOpen,
  '📚': BookOpen,
  '✨': Sparkles
}

export default function PersonalBookshelf({ books, activeBookId }) {
  return (
    <GlassCard className="mt-6">
      <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">
        Your Library
      </h3>
      
      <div className="flex flex-col gap-3">
        {books.map((book) => (
          <BookItem 
            key={book.id} 
            book={book} 
            isActive={book.id === activeBookId}
          />
        ))}
      </div>
    </GlassCard>
  )
}

function BookItem({ book, isActive }) {
  const Icon = typeof book.icon === 'function'
    ? book.icon
    : BOOK_ICON_MAP[book.icon] || BookOpen

  return (
    <div 
      className={cn(
        'flex items-center gap-3 p-3 rounded-2xl transition-all duration-300',
        isActive 
          ? 'bg-gradient-to-r from-blush/50 to-pearl/50 border border-dusty-rose/30'
          : 'hover:bg-sand/30'
      )}
    >
      {/* Book Cover */}
      <div 
        className="w-10 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: book.coverGradient || 'linear-gradient(145deg, #B5C4B1, #E8DFD0)' }}
      >
        <Icon className="w-6 h-6 text-charcoal" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-charcoal truncate">
          {book.title}
        </p>
        <p className="text-xs text-warm-gray">
          {book.progress}
        </p>
        
        {/* Progress Bar */}
        <div className="mt-1.5 h-1 bg-sand/50 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${book.progressPercent}%`,
              backgroundColor: 'var(--dusty-rose)'
            }}
          />
        </div>
      </div>
    </div>
  )
}
