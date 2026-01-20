'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartSheet() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalItems,
    getTotalPrice
  } = useCart()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  // Blokuj scroll body gdy koszyk jest otwarty
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Zamknij na Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-gray-900" />
            <h2 className="text-lg font-bold text-gray-900">
              Koszyk
              {totalItems > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({totalItems} {totalItems === 1 ? 'produkt' : totalItems < 5 ? 'produkty' : 'produktów'})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Zamknij koszyk"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Zawartość */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Koszyk jest pusty
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Dodaj produkty, aby rozpocząć zakupy
              </p>
              <button
                onClick={closeCart}
                className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
              >
                Kontynuuj zakupy
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id} className="px-6 py-4">
                  <div className="flex gap-4">
                    {/* Zdjęcie */}
                    <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      {item.zdjecie ? (
                        <Image
                          src={item.zdjecie}
                          alt={item.nazwa}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {item.nazwa}
                      </h4>
                      <p className="text-sm font-bold text-gray-900">
                        {item.cena.toFixed(2)} zł
                      </p>
                      {item.cenaJednostkowa && (
                        <p className="text-xs text-gray-400">
                          {item.cenaJednostkowa}
                        </p>
                      )}

                      {/* Kontrolki ilości */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.ilosc - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors rounded-l-lg"
                            aria-label="Zmniejsz ilość"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium text-gray-900">
                            {item.ilosc}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.ilosc + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors rounded-r-lg"
                            aria-label="Zwiększ ilość"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Usuń z koszyka"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer - suma i przycisk */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-6 bg-white">
            {/* Suma */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Suma częściowa</span>
              <span className="text-xl font-bold text-gray-900">
                {totalPrice.toFixed(2)} zł
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Koszty dostawy obliczone przy kasie
            </p>

            {/* Przycisk */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full h-14 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/20"
            >
              <span>Przejdź do kasy</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Link kontynuuj zakupy */}
            <button
              onClick={closeCart}
              className="w-full mt-3 text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Kontynuuj zakupy
            </button>
          </div>
        )}
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
