'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCart } from '@/hooks/use-cart'
import { usePostHog } from 'posthog-js/react'
import type { Produkt } from '@/lib/airtable'

interface ProductCardProps {
  produkt: Produkt
}

export default function ProductCard({ produkt }: ProductCardProps) {
  const { addItem } = useCart()
  const posthog = usePostHog()

  const zdjecieUrl = produkt.zdjecia?.[0]?.url || '/placeholder.png'
  const niedostepny = produkt.iloscMagazynowa <= 0

  // Cena jednostkowa - obliczona na podstawie wydajności
  const cenaJednostkowa = `${produkt.cena.toFixed(2)} zł / szt.`

  // Smart Efficiency - cena za jednostkę (np. pranie)
  const hasEfficiency = produkt.efficiency && produkt.efficiency > 0 && produkt.unit
  const pricePerUnit = hasEfficiency ? produkt.cena / produkt.efficiency! : null
  const unitPriceText = hasEfficiency && pricePerUnit !== null
    ? produkt.unit === 'pran'
      ? `Tylko ${pricePerUnit.toFixed(2)} zł za pranie`
      : `${pricePerUnit.toFixed(2)} zł / ${produkt.unit}`
    : null

  const handleDodaj = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!niedostepny) {
      addItem({
        id: produkt.id,
        nazwa: produkt.nazwa,
        cena: produkt.cena,
        zdjecie: zdjecieUrl,
        cenaJednostkowa,
        maxStock: produkt.iloscMagazynowa
      })

      // PostHog tracking
      if (posthog) {
        posthog.capture('add_to_cart', {
          product_id: produkt.id,
          product_name: produkt.nazwa,
          price: produkt.cena,
          quantity: 1,
          source: 'product_card'
        })
      }
    }
  }

  return (
    <motion.article
      className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-150 overflow-hidden flex flex-col h-full border border-gray-100"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Zdjecie produktu */}
      <Link href={`/produkt/${produkt.id}`} className="block relative">
        <div className="relative aspect-square bg-white overflow-hidden">
          {produkt.zdjecia?.[0] ? (
            <Image
              src={zdjecieUrl}
              alt={produkt.nazwa}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-200 ease-out"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Badge Zaufania - Import DE */}
          <span className="absolute top-3 right-3 bg-white text-slate-800 text-xs font-bold px-2 py-1 rounded shadow-md">
            Import DE 🇩🇪
          </span>

          {/* Overlay niedostepny */}
          {niedostepny && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <span className="bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium">
                Wyprzedane
              </span>
            </div>
          )}

          {/* Stan magazynowy - mala ilosc */}
          {!niedostepny && produkt.iloscMagazynowa <= 3 && (
            <span className="absolute bottom-3 left-3 bg-amber-500 text-white text-[10px] font-medium px-2 py-1 rounded">
              Ostatnie {produkt.iloscMagazynowa} szt.
            </span>
          )}
        </div>
      </Link>

      {/* Tresc karty */}
      <div className="flex flex-col flex-grow p-4">
        {/* Kategoria */}
        <span className="text-[11px] text-gray-400 uppercase tracking-wide font-medium mb-1">
          {produkt.kategoria}
        </span>

        {/* Nazwa produktu - max 2 linie */}
        <Link href={`/produkt/${produkt.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors min-h-[2.5rem]">
            {produkt.nazwa}
          </h3>
        </Link>

        {/* Opis - opcjonalny, 1 linia */}
        {produkt.opis && (
          <p className="text-gray-500 text-xs line-clamp-1 mb-3">
            {produkt.opis}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Ceny */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              {produkt.cena.toFixed(2)}
            </span>
            <span className="text-base font-semibold text-gray-900">
              zł
            </span>
          </div>
          {unitPriceText ? (
            <span className="text-sm text-slate-500">
              {unitPriceText}
            </span>
          ) : (
            <span className="text-xs text-gray-400">
              {cenaJednostkowa}
            </span>
          )}
        </div>

        {/* Przycisk */}
        <motion.button
          onClick={handleDodaj}
          disabled={niedostepny}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors duration-200 ${
            niedostepny
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow'
          }`}
        >
          {niedostepny ? 'Niedostępne' : 'Dodaj do koszyka'}
        </motion.button>
      </div>
    </motion.article>
  )
}
