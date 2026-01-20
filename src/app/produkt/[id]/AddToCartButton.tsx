'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import { usePostHog } from 'posthog-js/react'
import Link from 'next/link'
import { Minus, Plus, ShoppingCart, Check, ArrowRight } from 'lucide-react'

interface Props {
  produkt: {
    id: string
    nazwa: string
    cena: number
    zdjecie?: string
  }
  niedostepny: boolean
  maxIlosc: number
}

export default function AddToCartButton({ produkt, niedostepny, maxIlosc }: Props) {
  const { addItem } = useCart()
  const posthog = usePostHog()
  const [ilosc, setIlosc] = useState(1)
  const [dodano, setDodano] = useState(false)

  const zmniejsz = () => {
    if (ilosc > 1) setIlosc(ilosc - 1)
  }

  const zwieksz = () => {
    if (ilosc < maxIlosc) setIlosc(ilosc + 1)
  }

  const handleDodaj = () => {
    for (let i = 0; i < ilosc; i++) {
      addItem({
        id: produkt.id,
        nazwa: produkt.nazwa,
        cena: produkt.cena,
        zdjecie: produkt.zdjecie,
        cenaJednostkowa: `${produkt.cena.toFixed(2)} zł / szt.`
      })
    }

    // PostHog: Śledzenie dodania do koszyka
    if (posthog) {
      posthog.capture('add_to_cart', {
        product_id: produkt.id,
        product_name: produkt.nazwa,
        price: produkt.cena,
        quantity: ilosc,
        total_value: produkt.cena * ilosc
      })
    }

    setDodano(true)
    setTimeout(() => {
      setDodano(false)
      setIlosc(1)
    }, 3000)
  }

  if (dodano) {
    return (
      <div className="space-y-3">
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2">
          <Check className="w-5 h-5" />
          <span>Dodano {ilosc > 1 ? `${ilosc} szt.` : ''} do koszyka!</span>
        </div>
        <Link
          href="/koszyk"
          className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white px-6 py-4 rounded-xl font-semibold text-center hover:bg-gray-800 transition-colors"
        >
          <span>Przejdź do koszyka</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Selektor ilości */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">Ilość:</span>
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={zmniejsz}
            disabled={ilosc <= 1}
            className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Zmniejsz ilość"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="w-14 text-center font-semibold text-lg text-gray-900">
            {ilosc}
          </span>
          <button
            onClick={zwieksz}
            disabled={ilosc >= maxIlosc}
            className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Zwiększ ilość"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {maxIlosc <= 5 && (
          <span className="text-sm text-amber-600 font-medium">
            Ostatnie {maxIlosc} szt.
          </span>
        )}
      </div>

      {/* Przycisk dodaj do koszyka */}
      <button
        onClick={handleDodaj}
        disabled={niedostepny}
        className={`w-full h-14 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-3 ${
          niedostepny
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] shadow-lg shadow-emerald-600/20'
        }`}
      >
        {niedostepny ? (
          'Produkt niedostępny'
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            <span>Dodaj do koszyka</span>
            <span className="text-emerald-200">•</span>
            <span>{(produkt.cena * ilosc).toFixed(2)} zł</span>
          </>
        )}
      </button>
    </div>
  )
}
