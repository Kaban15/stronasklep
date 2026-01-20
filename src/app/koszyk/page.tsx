'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/use-cart'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react'

export default function KoszykPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart()
  const [mounted, setMounted] = useState(false)

  // Hydration fix
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Ładowanie...</div>
      </div>
    )
  }

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-300" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Twój koszyk jest pusty
            </h1>
            <p className="text-gray-500 mb-8">
              Dodaj produkty do koszyka, aby kontynuować zakupy
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Przeglądaj produkty
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Nagłówek */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Koszyk</h1>
            <p className="text-gray-500 mt-1">
              {totalItems} {totalItems === 1 ? 'produkt' : totalItems < 5 ? 'produkty' : 'produktów'}
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kontynuuj zakupy</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista produktów */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 flex gap-4"
              >
                {/* Zdjęcie */}
                <Link
                  href={`/produkt/${item.id}`}
                  className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden"
                >
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
                </Link>

                {/* Informacje */}
                <div className="flex-1 min-w-0">
                  <Link href={`/produkt/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2">
                      {item.nazwa}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.cena.toFixed(2)} zł / szt.
                  </p>

                  {/* Kontrolki - mobile */}
                  <div className="flex items-center justify-between mt-4">
                    {/* Ilość */}
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.ilosc - 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-l-lg transition-colors"
                        aria-label="Zmniejsz ilość"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium text-gray-900">
                        {item.ilosc}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.ilosc + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-lg transition-colors"
                        aria-label="Zwiększ ilość"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Suma i usuń */}
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-gray-900 text-lg">
                        {(item.cena * item.ilosc).toFixed(2)} zł
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Usuń z koszyka"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Podsumowanie */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Podsumowanie
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Produkty ({totalItems})</span>
                  <span className="font-medium text-gray-900">{totalPrice.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Dostawa</span>
                  <span className="text-sm text-gray-400">Obliczona przy kasie</span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-600">Razem</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {totalPrice.toFixed(2)} zł
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full h-14 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/20"
              >
                <span>Przejdź do kasy</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/"
                className="block w-full text-center text-gray-500 hover:text-gray-700 mt-4 text-sm transition-colors"
              >
                Kontynuuj zakupy
              </Link>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Bezpieczne płatności</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Oryginalne produkty z Niemiec</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Wysyłka w 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
