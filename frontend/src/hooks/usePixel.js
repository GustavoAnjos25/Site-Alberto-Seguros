import { useCallback } from 'react'

export function usePixel() {
  const track = useCallback((eventName, params = {}) => {
    if (typeof window !== 'undefined' && window.trackPixel) {
      window.trackPixel(eventName, params)
    }
  }, [])

  const trackField = useCallback((fieldName, value = '') => {
    track(fieldName, { value: value ? 'filled' : 'empty' })
  }, [track])

  return { track, trackField }
}
