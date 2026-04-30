'use client'

import { useState, useEffect, useCallback } from 'react'
import StudyAura from '@/components/layout/StudyAura'
import AppContainer from '@/components/layout/AppContainer'
import Header from '@/components/navigation/Header'
import BookOfTheMonth from '@/components/personal/BookOfTheMonth'
import PersonalBookshelf from '@/components/personal/PersonalBookshelf'
import MilestoneTree from '@/components/personal/MilestoneTree'
import PageCalculator from '@/components/personal/PageCalculator'
import DeepWorkCard from '@/components/focus/DeepWorkCard'
import SquadRace from '@/components/social/SquadRace'
import ReactionsSection from '@/components/social/ReactionsSection'
import UserStats from '@/components/stats/UserStats'
import WrappedOverlay from '@/components/overlays/WrappedOverlay'
import LevelUpModal from '@/components/overlays/LevelUpModal'
import WrappedFAB from '@/components/overlays/WrappedFAB'
import BottomNav from '@/components/navigation/BottomNav'
import usePolling from '@/hooks/usePolling'

// Initial state
const initialState = {
  mode: 'social',
  user: {
    id: 1,
    name: 'Michelle',
    currentPage: 45,
    streak: 12,
    xp: 2450,
    level: 7,
    avatar: '👩‍💻',
    readingSince: 'January 2024'
  },
  squad: [
    { id: 1, name: 'Michelle', currentPage: 45, totalPages: 400, avatar: '👩‍💻', isUser: true, color: 'linear-gradient(135deg, #E8D5D5, #D4A5A5)' },
    { id: 2, name: 'Sarah', currentPage: 67, totalPages: 400, avatar: '👩‍🎨', isUser: false, color: 'linear-gradient(135deg, #B5C4B1, #E8DFD0)' },
    { id: 3, name: 'Alex', currentPage: 38, totalPages: 400, avatar: '🧑‍💻', isUser: false, color: 'linear-gradient(135deg, #E8DFD0, #F0EBE5)' },
    { id: 4, name: 'Jordan', currentPage: 52, totalPages: 400, avatar: '👨‍🎤', isUser: false, color: 'linear-gradient(135deg, #D4A5A5, #B5C4B1)' },
    { id: 5, name: 'Taylor', currentPage: 29, totalPages: 400, avatar: '👩‍🔬', isUser: false, color: 'linear-gradient(135deg, #F0EBE5, #E8D5D5)' },
  ],
  books: [
    { id: 1, title: 'The Art of Mindful Reading', progress: 'Page 45 of 400', progressPercent: 11, coverGradient: 'linear-gradient(145deg, #D4A5A5, #B5C4B1)', icon: '📖' },
    { id: 2, title: 'Deep Work', progress: 'Page 120 of 280', progressPercent: 43, coverGradient: 'linear-gradient(145deg, #B5C4B1, #E8DFD0)', icon: '📚' },
    { id: 3, title: 'Atomic Habits', progress: 'Completed', progressPercent: 100, coverGradient: 'linear-gradient(145deg, #E8D5D5, #F0EBE5)', icon: '✨' },
  ],
  reactions: [
    { id: 1, author: 'Sarah', page: 32, content: 'This chapter about morning routines really resonated with me. Starting tomorrow!', time: '2 hours ago', avatar: '👩‍🎨' },
    { id: 2, author: 'Alex', page: 45, content: 'The meditation technique mentioned here is surprisingly effective.', time: '3 hours ago', avatar: '🧑‍💻' },
    { id: 3, author: 'Jordan', page: 58, content: 'I disagree with the author here. What does everyone else think?', time: '5 hours ago', avatar: '👨‍🎤' },
    { id: 4, author: 'Taylor', page: 67, content: 'Mind = blown. This passage changed everything for me.', time: '6 hours ago', avatar: '👩‍🔬' },
    { id: 5, author: 'Sarah', page: 89, content: 'Taking notes on this section. So many actionable insights!', time: '1 day ago', avatar: '👩‍🎨' },
  ],
  milestones: [
    { id: 1, label: 'First Page', value: '1 page', reached: true },
    { id: 2, label: 'Chapter One', value: '25 pages', reached: true },
    { id: 3, label: 'Getting Started', value: '50 pages', reached: false },
    { id: 4, label: 'Quarter Way', value: '100 pages', reached: false },
    { id: 5, label: 'Halfway There', value: '200 pages', reached: false },
    { id: 6, label: 'Book Finished', value: '400 pages', reached: false },
  ],
  ui: {
    showWrapped: false,
    showLevelUp: false,
    currentSlide: 0,
    newLevel: null
  }
}

export default function SomaStreak() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthenticated(localStorage.getItem('soma-authenticated') === 'true')
    }
  }, [])
  
  // Mode switching
  const handleModeChange = useCallback((mode) => {
    setState(prev => ({ ...prev, mode }))
  }, [])
  
  // Log progress handler
  const handleLogProgress = useCallback(({ pages, reflection }) => {
    setState(prev => {
      const newXP = prev.user.xp + (pages * 10)
      const newLevel = Math.floor(newXP / 500) + 1
      const leveledUp = newLevel > prev.user.level
      const newCurrentPage = prev.user.currentPage + pages
      
      // Update milestones
      const updatedMilestones = prev.milestones.map(m => {
        const threshold = parseInt(m.value)
        return {
          ...m,
          reached: newCurrentPage >= threshold
        }
      })
      
      // Update squad member position
      const updatedSquad = prev.squad.map(member => 
        member.isUser 
          ? { ...member, currentPage: newCurrentPage }
          : member
      )
      
      return {
        ...prev,
        user: {
          ...prev.user,
          currentPage: newCurrentPage,
          xp: newXP,
          level: newLevel,
          streak: prev.user.streak // Maintain streak
        },
        squad: updatedSquad,
        milestones: updatedMilestones,
        ui: {
          ...prev.ui,
          showLevelUp: leveledUp,
          newLevel: leveledUp ? newLevel : null
        }
      }
    })
  }, [])
  
  // Focus session complete
  const handleSessionComplete = useCallback(() => {
    // Award bonus XP for completing a focus session
    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        xp: prev.user.xp + 50
      }
    }))
  }, [])
  
  // Wrapped overlay handlers
  const handleOpenWrapped = useCallback(() => {
    setState(prev => ({
      ...prev,
      ui: { ...prev.ui, showWrapped: true, currentSlide: 0 }
    }))
  }, [])
  
  const handleCloseWrapped = useCallback(() => {
    setState(prev => ({
      ...prev,
      ui: { ...prev.ui, showWrapped: false }
    }))
  }, [])
  
  const handleSlideChange = useCallback((slide) => {
    setState(prev => ({
      ...prev,
      ui: { ...prev.ui, currentSlide: slide }
    }))
  }, [])
  
  // Close level up modal
  const handleCloseLevelUp = useCallback(() => {
    setState(prev => ({
      ...prev,
      ui: { ...prev.ui, showLevelUp: false, newLevel: null }
    }))
  }, [])
  
  // Simulate real-time updates (polling)
  usePolling(() => {
    setState(prev => {
      // Random squad members gain 1-3 pages
      const updatedSquad = prev.squad.map(member => {
        if (!member.isUser && Math.random() > 0.5) {
          return {
            ...member,
            currentPage: Math.min(member.currentPage + Math.floor(Math.random() * 3) + 1, member.totalPages)
          }
        }
        return member
      })
      
      // 30% chance of new reaction
      let updatedReactions = prev.reactions
      if (Math.random() < 0.3) {
        const randomMember = prev.squad[Math.floor(Math.random() * prev.squad.length)]
        const newReaction = {
          id: Date.now(),
          author: randomMember.name,
          page: Math.floor(Math.random() * 100) + 1,
          content: getRandomReaction(),
          time: 'Just now',
          avatar: randomMember.avatar
        }
        updatedReactions = [newReaction, ...prev.reactions.slice(0, 9)]
      }
      
      return {
        ...prev,
        squad: updatedSquad,
        reactions: updatedReactions
      }
    })
  }, 15000, state.mode === 'social')
  
  // Calculate page stats
  const xpToNextLevel = 500 - (state.user.xp % 500)
  const pagesToNextLevel = Math.ceil(xpToNextLevel / 10)
  const pagesToFinishBook = 400 - state.user.currentPage
  const leadingMember = [...state.squad].sort((a, b) => b.currentPage - a.currentPage)[0]
  const pagesToSquadLead = leadingMember.isUser ? 0 : leadingMember.currentPage - state.user.currentPage + 1
  const nextMilestone = state.milestones.find(m => !m.reached)
  const pagesToNextMilestone = nextMilestone ? parseInt(nextMilestone.value) - state.user.currentPage : 0
  
  if (!isAuthenticated) {
    return (
      <>
        <StudyAura streak={0} />
        <AppContainer>
          <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-12">
            <div className="glass-card rounded-3xl p-10 max-w-2xl text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-warm-gray mb-4">Members only</p>
              <h1 className="font-serif text-4xl font-semibold text-charcoal mb-4">
                Welcome to SomaStreak
              </h1>
              <p className="text-sm text-warm-gray mb-8">
                Please log in to access your personal reading dashboard, library, and squad activity.
              </p>
              <button
                onClick={() => window.location.href = '/auth/login'}
                className="inline-flex items-center justify-center rounded-full bg-dusty-rose px-6 py-3 text-sm font-semibold text-white hover:bg-dusty-rose/90 transition"
              >
                Go to login
              </button>
            </div>
          </div>
        </AppContainer>
      </>
    )
  }
  
  return (
    <>
      <StudyAura streak={state.user.streak} />
      
      <AppContainer>
        <Header mode={state.mode} onModeChange={handleModeChange} />
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_280px] gap-6">
          {/* Left Column - Personal Sanctuary */}
          <div className="order-2 lg:order-1">
            <BookOfTheMonth book={state.books[0]} />
            <PersonalBookshelf books={state.books} activeBookId={1} />
            <MilestoneTree milestones={state.milestones} />
            <PageCalculator 
              pagesToNextLevel={pagesToNextLevel}
              pagesToFinishBook={pagesToFinishBook}
              pagesToSquadLead={Math.max(0, pagesToSquadLead)}
              pagesToNextMilestone={Math.max(0, pagesToNextMilestone)}
            />
          </div>
          
          {/* Center Column - Dynamic Content */}
          <div className="order-1 lg:order-2">
            {/* Focus Mode */}
            <DeepWorkCard 
              visible={state.mode === 'focus'} 
              onSessionComplete={handleSessionComplete}
            />
            
            {/* Social Mode */}
            <SquadRace 
              squad={state.squad} 
              visible={state.mode === 'social'}
            />
            <ReactionsSection 
              reactions={state.reactions}
              userCurrentPage={state.user.currentPage}
              visible={state.mode === 'social'}
            />
          </div>
          
          {/* Right Column - Stats & Action */}
          <div className="order-3">
            <UserStats 
              user={state.user}
              onLogProgress={handleLogProgress}
            />
          </div>
        </div>
      </AppContainer>
      
      {/* Overlays */}
      <WrappedFAB onClick={handleOpenWrapped} />
      
      <WrappedOverlay 
        visible={state.ui.showWrapped}
        onClose={handleCloseWrapped}
        currentSlide={state.ui.currentSlide}
        onSlideChange={handleSlideChange}
        squadStats={{
          totalPages: state.squad.reduce((sum, m) => sum + m.currentPage, 0),
          hotPage: 127,
          hotPageReactions: 12,
          topReaction: 'This passage changed my perspective completely!'
        }}
        userStats={{
          streak: state.user.streak,
          totalPages: state.user.currentPage
        }}
      />
      
      <LevelUpModal 
        visible={state.ui.showLevelUp}
        level={state.ui.newLevel}
        onClose={handleCloseLevelUp}
      />
      
      {/* Mobile Bottom Navigation */}
      <BottomNav currentBook={state.books[0]?.title} />
      
      {/* Bottom padding for mobile nav */}
      <div className="h-20 md:hidden" />
    </>
  )
}

// Helper function for random reactions
function getRandomReaction() {
  const reactions = [
    'This is such a powerful insight!',
    'I never thought about it this way before.',
    'Taking notes on this section.',
    'This reminds me of something I read earlier.',
    'The author really nails it here.',
    'Anyone else feeling inspired by this?',
    'I need to re-read this passage.',
    'This is my favorite part so far!'
  ]
  return reactions[Math.floor(Math.random() * reactions.length)]
}
