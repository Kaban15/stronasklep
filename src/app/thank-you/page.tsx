'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { usePostHog } from 'posthog-js/react'
import { CheckCircle, Mail, ArrowRight, Package, CreditCard } from 'lucide-react'

interface OrderData {
  numerZamowienia: string
  kwota: string
  email: string
  metodaPlatnosci: 'przelew' | 'przy_odbiorze'
}

export default function ThankYouPage() {
  const { clearCart } = useCart()
  const posthog = usePostHog()
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [mounted, setMounted] = useState(false)
  const purchaseTracked = useRef(false)

  useEffect(() => {
    setMounted(true)

    // Pobierz dane zamówienia z sessionStorage
    const savedData = sessionStorage.getItem('orderData')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setOrderData(parsed)

        // PostHog: Śledzenie zakupu (tylko raz)
        if (posthog && !purchaseTracked.current) {
          purchaseTracked.current = true
          posthog.capture('purchase', {
            order_id: parsed.numerZamowienia,
            value: parseFloat(parsed.kwota) || 0,
            currency: 'PLN',
            payment_method: parsed.metodaPlatnosci
          })
        }

        // Wyczyść koszyk po pomyślnym zamówieniu
        clearCart()
        // Usuń dane z sessionStorage
        sessionStorage.removeItem('orderData')
      } catch (e) {
        console.error('Błąd parsowania danych zamówienia:', e)
      }
    }
  }, [clearCart, posthog])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Ładowanie...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-lg mx-auto">
          {/* Ikona sukcesu */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Dziękujemy za zamówienie!
            </h1>
            <p className="text-gray-600">
              Twoje zamówienie zostało przyjęte do realizacji
            </p>
          </div>

          {/* Dane zamówienia */}
          {orderData && (
            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
              <div className="space-y-4">
                {/* Numer zamówienia */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Numer zamówienia</span>
                  <span className="font-bold text-gray-900 font-mono">
                    {orderData.numerZamowienia}
                  </span>
                </div>

                {/* Kwota */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Kwota do zapłaty</span>
                  <span className="font-bold text-emerald-600 text-lg">
                    {orderData.kwota} zł
                  </span>
                </div>

                {/* Metoda płatności */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Metoda płatności</span>
                  <span className="font-medium text-gray-900">
                    {orderData.metodaPlatnosci === 'przelew'
                      ? 'Przelew bankowy'
                      : 'Płatność przy odbiorze'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Informacja o mailu */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Sprawdź swoją skrzynkę e-mail
                </h3>
                <p className="text-blue-700 text-sm">
                  Wysłaliśmy potwierdzenie zamówienia na adres{' '}
                  {orderData?.email && (
                    <span className="font-medium">{orderData.email}</span>
                  )}
                  . Znajdziesz tam wszystkie szczegóły oraz dane do płatności.
                </p>
                <p className="text-blue-600 text-xs mt-2">
                  Nie widzisz wiadomości? Sprawdź folder spam.
                </p>
              </div>
            </div>
          </div>

          {/* Instrukcja płatności - dla przelewu */}
          {orderData?.metodaPlatnosci === 'przelew' && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">
                    Dane do przelewu
                  </h3>
                  <p className="text-amber-700 text-sm mb-3">
                    Szczegółowe dane do przelewu znajdziesz w mailu. Zamówienie zostanie
                    zrealizowane po zaksięgowaniu wpłaty.
                  </p>
                  <p className="text-amber-800 text-xs font-medium">
                    W tytule przelewu podaj numer zamówienia: {orderData.numerZamowienia}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Instrukcja - płatność przy odbiorze */}
          {orderData?.metodaPlatnosci === 'przy_odbiorze' && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">
                    Płatność przy odbiorze
                  </h3>
                  <p className="text-green-700 text-sm">
                    Przygotuj kwotę {orderData.kwota} zł przy odbiorze paczki od kuriera.
                    Przyjmujemy płatność gotówką lub kartą.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Co dalej */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Co dalej?</h3>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Otrzymasz e-mail z potwierdzeniem zamówienia</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Skompletujemy Twoje zamówienie w ciągu 24h</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Wyślemy paczkę i prześlemy numer śledzenia</span>
              </li>
            </ol>
          </div>

          {/* Przyciski */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              <span>Kontynuuj zakupy</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Kontakt */}
          <p className="text-center text-gray-500 text-sm mt-8">
            Masz pytania? Napisz do nas na{' '}
            <a href="mailto:kontakt@sklep.pl" className="text-emerald-600 hover:underline">
              kontakt@sklep.pl
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
