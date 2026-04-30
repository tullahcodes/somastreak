'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

function TimerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M5 3 2 6" />
      <path d="m22 6-3-3" />
      <path d="M6.38 18.7 4 21" />
      <path d="M17.64 18.67 20 21" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}

const actions = [
  { id: 'book', label: 'Add Book', icon: BookIcon, color: 'bg-dusty-rose', href: '/search' },
  { id: 'progress', label: 'Log Progress', icon: PencilIcon, color: 'bg-sage', href: '/' },
  { id: 'focus', label: 'Start Focus', icon: TimerIcon, color: 'bg-blush', href: '/focus' },
  { id: 'photo', label: 'Share Photo', icon: CameraIcon, color: 'bg-sand', href: '/profile' }
]

export default function AddModal({ visible, onClose, onAction }) {
  const modalRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }
    if (visible) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [visible, onClose])

  if (!visible) return null

  const handleAction = (action) => {
    onAction?.(action.id)
    onClose?.()
    
    // Navigate to the appropriate page
    if (action.href) {
      router.push(action.href)
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center md:hidden"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm animate-in fade-in duration-200"
      />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-md bg-cream rounded-t-3xl p-6 pb-10 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-muted" />
        
        {/* Title */}
        <h3 className="font-serif text-xl text-center text-charcoal mt-4 mb-6">
          Create
        </h3>
        
        {/* Actions Grid */}
        <div className="grid grid-cols-4 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                onClick={() => handleAction(action)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all active:scale-95 hover:bg-pearl"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: 'fade-scale-in 0.3s ease-out forwards'
                }}
              >
                <span className={`w-14 h-14 rounded-full ${action.color} flex items-center justify-center text-white shadow-soft`}>
                  <Icon />
                </span>
                <span className="text-xs text-charcoal font-medium">
                  {action.label}
                </span>
              </button>
            )
          })}
        </div>
        
        {/* Cancel button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 text-warm-gray font-medium rounded-xl hover:bg-pearl transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
