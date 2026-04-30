'use client'

export default function AppContainer({ children }) {
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-[1400px] px-4 py-8">
        {children}
      </div>
    </div>
  )
}
