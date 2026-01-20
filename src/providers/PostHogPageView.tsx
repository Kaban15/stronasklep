'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { usePostHog } from 'posthog-js/react'

function PostHogPageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (pathname && posthog) {
      // Zbuduj pełny URL
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + '?' + searchParams.toString()
      }

      // Wyślij event pageview
      posthog.capture('$pageview', {
        $current_url: url
      })
    }
  }, [pathname, searchParams, posthog])

  return null
}

// Wrapper z Suspense (wymagany dla useSearchParams)
export function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewTracker />
    </Suspense>
  )
}
