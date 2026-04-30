'use client'

import { useEffect, useCallback } from 'react'
import { Award, BookOpen, Flame, Flower2, Leaf, Sparkles, Star, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const slides = [
  {
    id: 1,
    type: 'squad-total',
    title: 'Squad Achievement',
    subtitle: 'Your squad read together',
  },
  {
    id: 2,
    type: 'hot-page',
    title: 'Most Discussed',
    subtitle: 'The page that sparked conversation',
  },
  {
    id: 3,
    type: 'personal-mvp',
    title: 'Reading Champion',
    subtitle: 'Your personal achievement',
  }
]

export default function WrappedOverlay({ 
  visible, 
  onClose, 
  currentSlide, 
  onSlideChange,
  squadStats,
  userStats 
}) {
  const handleKeyDown = useCallback((e) => {
    if (!visible) return
    
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
      onSlideChange(currentSlide + 1)
    } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
      onSlideChange(currentSlide - 1)
    }
  }, [visible, currentSlide, onClose, onSlideChange])
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
  
  if (!visible) return null
  
  const slide = slides[currentSlide]
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'var(--linen)' }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full glass-card flex items-center justify-center text-charcoal hover:bg-sand/50 transition-colors"
        aria-label="Close overlay"
      >
        <X className="w-4 h-4" />
      </button>
      
      {/* Slide Content */}
      <div className="animate-fade-scale max-w-lg w-full mx-4 text-center" key={currentSlide}>
        <p className="text-xs text-warm-gray label-style mb-4">
          {slide.subtitle}
        </p>
        
        <h2 className="font-serif text-3xl font-semibold text-charcoal mb-8">
          {slide.title}
        </h2>
        
        {slide.type === 'squad-total' && (
          <SquadTotalSlide stats={squadStats} />
        )}
        
        {slide.type === 'hot-page' && (
          <HotPageSlide stats={squadStats} />
        )}
        
        {slide.type === 'personal-mvp' && (
          <PersonalMVPSlide stats={userStats} />
        )}
      </div>
      
      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4">
        <button
          onClick={() => onSlideChange(currentSlide - 1)}
          disabled={currentSlide === 0}
          className={cn(
            'px-5 py-2.5 rounded-full font-medium transition-all',
            currentSlide === 0 
              ? 'opacity-30 cursor-not-allowed' 
              : 'glass-card hover:shadow-soft'
          )}
        >
          Previous
        </button>
        
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentSlide 
                  ? 'bg-dusty-rose w-6' 
                  : 'bg-sand'
              )}
            />
          ))}
        </div>
        
        <button
          onClick={() => currentSlide === slides.length - 1 ? onClose() : onSlideChange(currentSlide + 1)}
          className="px-5 py-2.5 rounded-full font-medium transition-all"
          style={{
            backgroundColor: 'var(--dusty-rose)',
            color: 'white'
          }}
        >
          {currentSlide === slides.length - 1 ? 'Close' : 'Next'}
        </button>
      </div>
    </div>
  )
}

function SquadTotalSlide({ stats }) {
  return (
    <div className="glass-card rounded-3xl p-8">
      <p className="text-6xl font-serif font-light text-dusty-rose mb-4">
        {stats?.totalPages?.toLocaleString() || '2,847'}
      </p>
      <p className="text-lg text-charcoal mb-2">pages read together</p>
      <p className="text-sm text-warm-gray italic">
        &quot;Reading is dreaming with open eyes&quot;
      </p>
    </div>
  )
}

function HotPageSlide({ stats }) {
  return (
    <div className="glass-card rounded-3xl p-8">
      <div 
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
        style={{ backgroundColor: 'var(--dusty-rose)', color: 'white' }}
      >
        <Flame className="w-4 h-4" /> Page {stats?.hotPage || 127}
      </div>
      <p className="text-lg text-charcoal mb-4">
        {stats?.hotPageReactions || 12} reactions from your squad
      </p>
      <div className="text-left p-4 rounded-2xl" style={{ backgroundColor: 'var(--sand)' }}>
        <p className="text-sm text-warm-gray mb-1">Top reaction:</p>
        <p className="text-charcoal">
          &quot;{stats?.topReaction || 'This passage changed my perspective completely!'}&quot;
        </p>
      </div>
    </div>
  )
}

function PersonalMVPSlide({ stats }) {
  const celebrationIcons = [BookOpen, Sparkles, Flower2, Leaf, Star]

  return (
    <div className="glass-card rounded-3xl p-8">
      <Award className="w-12 h-12 text-dusty-rose mx-auto mb-4" />
      <p className="text-4xl font-serif font-light text-dusty-rose mb-2">
        {stats?.streak || 12} Day Streak
      </p>
      <p className="text-lg text-charcoal mb-4">
        You&apos;ve read {stats?.totalPages || 345} pages this month!
      </p>
      <div className="flex justify-center gap-2">
        {celebrationIcons.map((Icon, i) => (
          <Icon 
            key={i}
            className="w-6 h-6 text-dusty-rose animate-float"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  )
}
