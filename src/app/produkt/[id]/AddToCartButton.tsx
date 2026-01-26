'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
  compact?: boolean // For mobile sticky bar - simplified version
}

export default function AddToCartButton({ produkt, niedostepny, maxIlosc, compact = false }: Props) {
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
        total_value: produkt.cena * ilosc,
        source: compact ? 'mobile_sticky' : 'product_page'
      })
    }

    setDodano(true)
    setTimeout(() => {
      setDodano(false)
      setIlosc(1)
    }, 3000)
  }

  // Compact version for mobile sticky bar
  if (compact) {
    if (dodano) {
      return (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1"
        >
          <Link
            href="/koszyk"
            className="flex items-center justify-center gap-2 h-12 bg-gray-900 text-white px-4 rounded-xl font-semibold text-sm"
          >
            <Check className="w-4 h-4" />
            <span>Do koszyka</span>
          </Link>
        </motion.div>
      )
    }

    return (
      <motion.button
        onClick={handleDodaj}
        disabled={niedostepny}
        whileTap={niedostepny ? {} : { scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={`flex-1 h-12 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
          niedostepny
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-emerald-600 text-white active:bg-emerald-700'
        }`}
      >
        {niedostepny ? (
          'Niedostępne'
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            <span>Dodaj</span>
          </>
        )}
      </motion.button>
    )
  }

  // Full version - with quantity selector
  if (dodano) {
    return (
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.1 }}
          >
            <Check className="w-5 h-5" />
          </motion.div>
          <span>Dodano {ilosc > 1 ? `${ilosc} szt.` : ''} do koszyka!</span>
        </div>
        <motion.div whileTap={{ scale: 0.98 }}>
          <Link
            href="/koszyk"
            className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white px-6 py-4 rounded-xl font-semibold text-center hover:bg-gray-800 transition-colors"
          >
            <span>Przejdź do koszyka</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Selektor ilości */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">Ilość:</span>
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <motion.button
            onClick={zmniejsz}
            disabled={ilosc <= 1}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Zmniejsz ilość"
          >
            <Minus className="w-5 h-5" />
          </motion.button>
          <motion.span
            key={ilosc}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-14 text-center font-semibold text-lg text-gray-900"
          >
            {ilosc}
          </motion.span>
          <motion.button
            onClick={zwieksz}
            disabled={ilosc >= maxIlosc}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Zwiększ ilość"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
        {maxIlosc <= 5 && (
          <span className="text-sm text-amber-600 font-medium">
            Ostatnie {maxIlosc} szt.
          </span>
        )}
      </div>

      {/* Przycisk dodaj do koszyka - Full width, huge */}
      <motion.button
        onClick={handleDodaj}
        disabled={niedostepny}
        whileHover={niedostepny ? {} : { scale: 1.02 }}
        whileTap={niedostepny ? {} : { scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={`w-full h-16 rounded-xl font-semibold text-base transition-colors flex items-center justify-center gap-3 ${
          niedostepny
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20'
        }`}
      >
        {niedostepny ? (
          'Produkt niedostępny'
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            <span>Dodaj do koszyka</span>
            <span className="text-emerald-200">•</span>
            <motion.span
              key={ilosc}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {(produkt.cena * ilosc).toFixed(2)} zł
            </motion.span>
          </>
        )}
      </motion.button>
    </div>
  )
}
