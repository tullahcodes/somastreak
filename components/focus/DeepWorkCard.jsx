'use client'

import { useState, useEffect, useRef } from 'react'
import { BookOpen, Flower2, Leaf, Sparkles } from 'lucide-react'
import GlassCard from '../layout/GlassCard'
import confetti from 'canvas-confetti'

const PLANTS = [Leaf, Flower2, Sparkles, BookOpen, Leaf]
const DURATION_OPTIONS = [
  { label: '15 min', seconds: 900 },
  { label: '25 min', seconds: 1500 },
  { label: '45 min', seconds: 2700 },
  { label: '60 min', seconds: 3600 }
]

export default function DeepWorkCard({ visible, onSessionComplete }) {
  const [sessionDuration, setSessionDuration] = useState(1500)
  const [seconds, setSeconds] = useState(1500)
  const [isRunning, setIsRunning] = useState(false)
  const [completedPlants, setCompletedPlants] = useState(0)
  const intervalRef = useRef(null)
  const previousDuration = useRef(sessionDuration)
  
  useEffect(() => {
    if (previousDuration.current !== sessionDuration) {
      if (!isRunning) {
        setSeconds(sessionDuration)
      }
      previousDuration.current = sessionDuration
    }
  }, [sessionDuration, isRunning])

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s - 1)
      }, 1000)
    } else if (seconds === 0 && isRunning) {
      handleComplete()
    }
    
    return () => clearInterval(intervalRef.current)
  }, [isRunning, seconds])
  
  const handleComplete = () => {
    setIsRunning(false)
    setCompletedPlants(prev => Math.min(prev + 1, PLANTS.length))
    
    // Celebration confetti
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4A5A5', '#B5C4B1', '#E8D5D5', '#F0EBE5']
    })
    
    onSessionComplete?.()
    setSeconds(sessionDuration)
  }
  
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`
  }
  
  const progress = 1 - (seconds / sessionDuration)
  
  const handleStartPause = () => {
    if (seconds === 0) {
      setSeconds(sessionDuration)
      setCompletedPlants(0)
      setIsRunning(true)
      return
    }

    setIsRunning((prev) => !prev)
  }

  const getPlantColor = (isGrown, isGrowing, growthProgress) => {
    if (isGrown) return 'var(--dusty-rose)'
    if (isGrowing) return `rgba(219, 102, 135, ${0.35 + (growthProgress * 0.65)})`
    return 'var(--warm-gray)'
  }
  
  if (!visible) return null
  
  return (
    <div className="animate-fade-scale">
      <GlassCard className="text-center">
        <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">
          Focus Garden
        </h3>
        <p className="text-sm text-warm-gray mb-4">
          Grow your garden with focused reading
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {DURATION_OPTIONS.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                setSessionDuration(option.seconds)
                if (!isRunning) setSeconds(option.seconds)
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                sessionDuration === option.seconds
                  ? 'bg-dusty-rose text-white shadow-soft'
                  : 'bg-sand/70 text-charcoal hover:bg-sand'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Plants Display */}
        <div className="flex justify-center gap-4 mb-8">
          {PLANTS.map((PlantIcon, index) => {
            const isGrown = index < completedPlants
            const isGrowing = index === completedPlants && isRunning
            const growthProgress = isGrowing ? progress : 0
            const iconColor = getPlantColor(isGrown, isGrowing, growthProgress)
            
            return (
              <div 
                key={index}
                className="flex flex-col items-center transition-all duration-600"
                style={{
                  opacity: isGrown ? 1 : (isGrowing ? 0.4 + (growthProgress * 0.6) : 0.35),
                  transform: `scale(${isGrown ? 1 : (isGrowing ? 0.75 + (growthProgress * 0.25) : 0.75)})`
                }}
              >
                <PlantIcon className="w-8 h-8" style={{ color: iconColor }} />
              </div>
            )
          })}
        </div>
        
        {/* Timer */}
        <div 
          className="text-5xl font-serif font-light text-charcoal mb-6 tracking-wider"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {formatTime(seconds)}
        </div>
        
        {/* Progress Ring */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="44"
              fill="none"
              stroke="var(--sand)"
              strokeWidth="6"
            />
            <circle
              cx="48"
              cy="48"
              r="44"
              fill="none"
              stroke="var(--dusty-rose)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${progress * 276.46} 276.46`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-3">
            <button
              type="button"
              onClick={handleStartPause}
              className="inline-flex items-center gap-2 rounded-full bg-dusty-rose px-5 py-2 text-sm font-semibold text-white transition hover:bg-dusty-rose/90"
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              type="button"
              onClick={() => {
                setSeconds(sessionDuration)
                setIsRunning(false)
                setCompletedPlants(0)
              }}
              className="inline-flex items-center gap-2 rounded-full bg-sand/90 px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-sand"
            >
              Reset
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
