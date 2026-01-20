'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Sprawdzamy czy jesteśmy w przeglądarce (wymagane w Next.js)
    if (typeof window !== 'undefined') {
      
      // 2. INICJALIZACJA "NA SZTYWNO"
      // Usunęliśmy wszelkie 'process.env' i 'if (!key)', które blokowały działanie.
      // Teraz kod nie ma wyjścia - musi się połączyć.
      
      posthog.init('phc_tIav1KQxfJPK2Z5OS6lcpFrCgRiDJxYyOKjBKLktgl4', {
        api_host: 'https://eu.i.posthog.com',
        
        // --- Reszta Twojej konfiguracji ---
        person_profiles: 'identified_only',
        capture_pageview: false, // Obsługujemy ręcznie w PageView.tsx
        capture_pageleave: true,
        disable_session_recording: false,
        session_recording: {
          maskAllInputs: true,
          maskTextSelector: '[data-posthog-mask]'
        },
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug()
        }
      })
    }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
