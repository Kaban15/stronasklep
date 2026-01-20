'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const consent = localStorage.getItem('cookie-consent')
    if (consent === null) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setIsVisible(false)
  }

  const handleAcceptRequired = () => {
    localStorage.setItem('cookie-consent', 'required')
    setIsVisible(false)
  }

  // Nie renderuj na serwerze
  if (!mounted || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Ikona i tekst */}
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Cookie className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Ta strona korzysta z ciasteczek, aby realizować zamówienia i zapewnić najlepsze doświadczenia.{' '}
                <Link
                  href="/polityka-prywatnosci"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
                >
                  Polityka Prywatności
                </Link>
              </p>
            </div>
          </div>

          {/* Przyciski */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleAcceptRequired}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Tylko wymagane
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Akceptuję
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
