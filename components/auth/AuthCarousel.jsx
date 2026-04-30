'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Users, Trophy, Sparkles } from 'lucide-react'

const slides = [
  {
    icon: BookOpen,
    title: 'Track Your Journey',
    description: 'Log pages, build streaks, and watch your reading garden bloom',
    gradient: 'from-dusty-rose/20 to-blush/30'
  },
  {
    icon: Users,
    title: 'Read Together',
    description: 'Join squads, race friends, and celebrate milestones as a community',
    gradient: 'from-sage/20 to-sage/30'
  },
  {
    icon: Trophy,
    title: 'Earn Rewards',
    description: 'Unlock achievements, level up your reader profile, and collect badges',
    gradient: 'from-sand/30 to-pearl/40'
  },
  {
    icon: Sparkles,
    title: 'Deep Focus Mode',
    description: 'Enter your reading sanctuary with ambient timers and peaceful vibes',
    gradient: 'from-blush/20 to-dusty-rose/20'
  }
]

export default function AuthCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative">
      {/* Phone mockup */}
      <div className="relative w-72 h-[580px]">
        {/* Phone frame */}
        <div className="absolute inset-0 bg-charcoal rounded-[3rem] p-2 shadow-2xl">
          {/* Screen */}
          <div className="relative h-full bg-linen rounded-[2.5rem] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-charcoal rounded-b-2xl z-10" />
            
            {/* Screen content */}
            <div className="h-full pt-10 px-6 pb-8 flex flex-col">
              {/* App header mockup */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <BookOpen className="w-6 h-6 text-dusty-rose" strokeWidth={1.5} />
                </div>
                <h2 className="font-serif text-2xl text-charcoal">SomaStreak</h2>
              </div>

              {/* Carousel content */}
              <div className="flex-1 flex flex-col items-center justify-center">
                {slides.map((slide, index) => {
                  const Icon = slide.icon
                  const isActive = currentSlide === index
                  
                  return (
                    <div
                      key={index}
                      className={`absolute inset-x-6 transition-all duration-700 ease-out ${
                        isActive 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8 pointer-events-none'
                      }`}
                    >
                      <div className={`bg-gradient-to-br ${slide.gradient} rounded-2xl p-6 mb-6`}>
                        <div className="w-16 h-16 mx-auto mb-4 bg-cream/80 rounded-2xl flex items-center justify-center shadow-soft">
                          <Icon className="w-8 h-8 text-dusty-rose" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-xl text-charcoal text-center mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-warm-gray text-sm text-center leading-relaxed">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Dots indicator */}
              <div className="flex items-center justify-center gap-2 mt-auto">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-dusty-rose w-6' 
                        : 'bg-sand hover:bg-warm-gray/50'
                    }`}
                  />
                ))}
              </div>

              {/* Fake nav bar */}
              <div className="flex items-center justify-around mt-6 pt-4 border-t border-border">
                <div className="w-8 h-8 rounded-full bg-sand/50" />
                <div className="w-8 h-8 rounded-full bg-dusty-rose/30" />
                <div className="w-8 h-8 rounded-full bg-sand/50" />
                <div className="w-8 h-8 rounded-full bg-sand/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-dusty-rose/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-sage/10 rounded-full blur-2xl" />
      </div>
    </div>
  )
}
