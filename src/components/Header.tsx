'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { ShoppingCart, Menu, X } from 'lucide-react'

export default function Header() {
  const { getTotalItems, openCart } = useCart()
  const [totalItems, setTotalItems] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Hydration fix - aktualizuj po mount
  useEffect(() => {
    setTotalItems(getTotalItems())
  }, [getTotalItems])

  // Subskrybuj zmiany w store
  useEffect(() => {
    const unsubscribe = useCart.subscribe((state) => {
      setTotalItems(state.getTotalItems())
    })
    return () => unsubscribe()
  }, [])

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              Sklep<span className="text-emerald-600">MVP</span>
            </span>
            <span className="hidden sm:inline-block bg-slate-800 text-white text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded">
              DE
            </span>
          </Link>

          {/* Nawigacja desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Strona główna
            </Link>
            <Link
              href="/?kategoria=chemia"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Chemia gospodarcza
            </Link>
            <Link
              href="/?kategoria=zabawki"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Zabawki
            </Link>
          </nav>

          {/* Akcje */}
          <div className="flex items-center gap-2">
            {/* Przycisk koszyka */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center w-11 h-11 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Otwórz koszyk"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center bg-emerald-600 text-white text-xs font-bold rounded-full px-1.5">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Strona główna
              </Link>
              <Link
                href="/?kategoria=chemia"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Chemia gospodarcza
              </Link>
              <Link
                href="/?kategoria=zabawki"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Zabawki
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
