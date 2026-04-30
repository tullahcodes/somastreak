'use client'

import AuthForm from '@/components/auth/AuthForm'
import AuthCarousel from '@/components/auth/AuthCarousel'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-linen flex">
      {/* Desktop: Side by side layout */}
      {/* Mobile: Instagram-style single column */}
      
      {/* Left side - Phone mockup with carousel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <AuthCarousel />
      </div>

      {/* Right side / Mobile full screen - Auth forms */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 md:p-8">
        <AuthForm mode="register" />
      </div>
    </div>
  )
}