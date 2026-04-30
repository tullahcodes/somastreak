'use client'

import PersonalBookshelf from '@/components/personal/PersonalBookshelf'
import BottomNav from '@/components/navigation/BottomNav'

const books = [
  { id: 1, title: 'The Art of Mindful Reading', progress: 'Page 45 of 400', progressPercent: 11, coverGradient: 'linear-gradient(145deg, #D4A5A5, #B5C4B1)', icon: '📖' },
  { id: 2, title: 'Deep Work', progress: 'Page 120 of 280', progressPercent: 43, coverGradient: 'linear-gradient(145deg, #B5C4B1, #E8DFD0)', icon: '📚' },
  { id: 3, title: 'Atomic Habits', progress: 'Completed', progressPercent: 100, coverGradient: 'linear-gradient(145deg, #E8D5D5, #F0EBE5)', icon: '✨' },
]

export default function LibraryPage() {
  return (
    <>
      <main className="min-h-screen bg-cream text-charcoal px-4 py-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-warm-gray mb-2">Library</p>
            <h1 className="font-serif text-4xl font-semibold">Your Reading Shelf</h1>
            <p className="mt-3 max-w-2xl text-sm text-warm-gray">
              Browse your current collection, track progress, and return to the books that matter most.
            </p>
          </div>

          <PersonalBookshelf books={books} activeBookId={1} />
        </div>
      </main>

      <BottomNav currentBook={books[0]?.title} />
      <div className="h-20 md:hidden" />
    </>
  )
}
