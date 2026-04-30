'use client'

import { useEffect, useRef } from 'react'

export default function usePolling(callback, delay = 15000, enabled = true) {
  const savedCallback = useRef(callback)
  
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  
  useEffect(() => {
    if (!enabled) return
    
    const tick = () => {
      savedCallback.current()
    }
    
    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay, enabled])
}
