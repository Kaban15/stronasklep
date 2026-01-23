'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/use-cart'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react'

export default function Header() {
  const router = useRouter()
  const { getTotalItems, openCart } = useCart()
  const [totalItems, setTotalItems] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
      setMobileMenuOpen(false)
    }
  }

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
              Chemia<span className="text-emerald-600">zNIEMIEC</span>
            </span>
            <span className="hidden sm:inline-block bg-slate-800 text-white text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded">
              DE
            </span>
          </Link>

          {/* Desktop: Nawigacja + Wyszukiwarka */}
          <div className="hidden md:flex items-center flex-1 justify-center gap-8">
            <nav className="flex items-center space-x-6">
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
                Chemia
              </Link>
              <Link
                href="/?kategoria=zabawki"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Zabawki
              </Link>
            </nav>

            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj produktów..."
                className="w-64 h-10 pl-10 pr-4 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>
          </div>

          {/* Akcje */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Szukaj"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Auth - zalogowany */}
            <SignedIn>
              <Link
                href="/konto"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mr-2"
              >
                Moje konto
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10'
                  }
                }}
              />
            </SignedIn>

            {/* Auth - niezalogowany */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Zaloguj</span>
                </button>
              </SignInButton>
            </SignedOut>

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

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 px-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj produktów..."
                autoFocus
                className="w-full h-11 pl-10 pr-4 bg-gray-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

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
              <SignedIn>
                <Link
                  href="/konto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  Moje konto
                </Link>
              </SignedIn>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
