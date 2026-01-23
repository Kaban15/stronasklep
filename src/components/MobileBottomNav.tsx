'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { items, openCart } = useCart()

  const totalItems = items.reduce((acc, item) => acc + item.ilosc, 0)

  const navItems = [
    {
      label: 'Start',
      href: '/',
      icon: Home,
      isActive: pathname === '/'
    },
    {
      label: 'Produkty',
      href: '/#produkty',
      icon: LayoutGrid,
      isActive: pathname === '/' && false // Produkty to ta sama strona
    },
    {
      label: 'Koszyk',
      href: '#',
      icon: ShoppingCart,
      isActive: pathname === '/koszyk',
      onClick: () => openCart(),
      badge: totalItems
    },
    {
      label: 'Profil',
      href: '/konto',
      icon: User,
      isActive: pathname === '/konto' || pathname.startsWith('/konto')
    }
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.isActive

          // Koszyk ma specjalną obsługę (onClick zamiast href)
          if (item.onClick) {
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center flex-1 h-full relative touch-manipulation"
              >
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 ${
                      isActive ? 'text-emerald-600' : 'text-slate-500'
                    }`}
                  />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1 font-medium ${
                    isActive ? 'text-emerald-600' : 'text-slate-500'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full relative touch-manipulation"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-emerald-600' : 'text-slate-500'
                }`}
              />
              <span
                className={`text-[10px] mt-1 font-medium ${
                  isActive ? 'text-emerald-600' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
