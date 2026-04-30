'use client'

import { useState } from 'react'
import StudyAura from '@/components/layout/StudyAura'
import AppContainer from '@/components/layout/AppContainer'
import GlassCard from '@/components/layout/GlassCard'
import BottomNav from '@/components/navigation/BottomNav'

// Mock book data for search
const allBooks = [
  { id: 1, title: 'The Art of Mindful Reading', author: 'Sarah Chen', pages: 400, genre: 'Self-Help', coverGradient: 'linear-gradient(145deg, #D4A5A5, #B5C4B1)', icon: '📖' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport', pages: 280, genre: 'Productivity', coverGradient: 'linear-gradient(145deg, #B5C4B1, #E8DFD0)', icon: '📚' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', pages: 320, genre: 'Self-Help', coverGradient: 'linear-gradient(145deg, #E8D5D5, #F0EBE5)', icon: '✨' },
  { id: 4, title: 'The Midnight Library', author: 'Matt Haig', pages: 304, genre: 'Fiction', coverGradient: 'linear-gradient(145deg, #E8DFD0, #D4A5A5)', icon: '🌙' },
  { id: 5, title: 'Project Hail Mary', author: 'Andy Weir', pages: 496, genre: 'Sci-Fi', coverGradient: 'linear-gradient(145deg, #B5C4B1, #D4A5A5)', icon: '🚀' },
  { id: 6, title: 'Educated', author: 'Tara Westover', pages: 334, genre: 'Memoir', coverGradient: 'linear-gradient(145deg, #F0EBE5, #B5C4B1)', icon: '🎓' },
  { id: 7, title: 'The Psychology of Money', author: 'Morgan Housel', pages: 256, genre: 'Finance', coverGradient: 'linear-gradient(145deg, #D4A5A5, #E8DFD0)', icon: '💰' },
  { id: 8, title: 'Klara and the Sun', author: 'Kazuo Ishiguro', pages: 320, genre: 'Fiction', coverGradient: 'linear-gradient(145deg, #E8D5D5, #B5C4B1)', icon: '☀️' },
]

const genres = ['All', 'Self-Help', 'Productivity', 'Fiction', 'Sci-Fi', 'Memoir', 'Finance']

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="6" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [addedBooks, setAddedBooks] = useState([])

  const filteredBooks = allBooks.filter(book => {
    const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase()) ||
                        book.author.toLowerCase().includes(query.toLowerCase())
    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre
    return matchesQuery && matchesGenre
  })

  const handleAddBook = (bookId) => {
    if (!addedBooks.includes(bookId)) {
      setAddedBooks([...addedBooks, bookId])
    }
  }

  return (
    <>
      <StudyAura streak={0} />
      
      <AppContainer>
        {/* Search Header */}
        <div className="pt-4 pb-2">
          <h1 className="font-serif text-2xl font-semibold text-charcoal mb-4">
            Discover Books
          </h1>
          
          {/* Search Input */}
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books or authors..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-cream/80 backdrop-blur-sm border border-white/40 text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:ring-2 focus:ring-dusty-rose/30 transition-all"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal transition-colors"
              >
                <CloseIcon />
              </button>
            )}
          </div>

          {/* Genre Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${selectedGenre === genre 
                    ? 'bg-dusty-rose text-white' 
                    : 'bg-sand/50 text-charcoal hover:bg-sand'}
                `}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-4 pb-24">
          <p className="text-sm text-warm-gray mb-4">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
          </p>

          <div className="flex flex-col gap-3">
            {filteredBooks.map(book => {
              const isAdded = addedBooks.includes(book.id)
              return (
                <GlassCard key={book.id} className="!p-3">
                  <div className="flex items-center gap-3">
                    {/* Book Cover */}
                    <div 
                      className="w-14 h-20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft"
                      style={{ background: book.coverGradient }}
                    >
                      <span className="text-2xl">{book.icon}</span>
                    </div>
                    
                    {/* Book Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-charcoal truncate">
                        {book.title}
                      </h3>
                      <p className="text-sm text-warm-gray">
                        {book.author}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-sand/50 text-warm-gray">
                          {book.genre}
                        </span>
                        <span className="text-xs text-warm-gray">
                          {book.pages} pages
                        </span>
                      </div>
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={() => handleAddBook(book.id)}
                      disabled={isAdded}
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center transition-all
                        ${isAdded 
                          ? 'bg-sage text-white' 
                          : 'bg-dusty-rose/10 text-dusty-rose hover:bg-dusty-rose hover:text-white active:scale-95'}
                      `}
                    >
                      {isAdded ? '✓' : <PlusIcon />}
                    </button>
                  </div>
                </GlassCard>
              )
            })}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-warm-gray">No books found</p>
              <p className="text-sm text-warm-gray/60 mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      </AppContainer>

      <BottomNav currentBook="The Art of Mindful Reading" />
      <div className="h-20 md:hidden" />
    </>
  )
}
