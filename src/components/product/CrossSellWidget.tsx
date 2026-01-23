'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Check } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'
import type { Produkt } from '@/lib/airtable'

interface CrossSellWidgetProps {
  mainProduct: Produkt
  allProducts: Produkt[]
}

export default function CrossSellWidget({ mainProduct, allProducts }: CrossSellWidgetProps) {
  const { addItem } = useCart()
  const [includeSuggested, setIncludeSuggested] = useState(true)

  // Znajdź pierwszy produkt z tej samej kategorii, ale inne ID
  const suggestedProduct = allProducts.find(
    (p) => p.kategoria === mainProduct.kategoria && p.id !== mainProduct.id && p.iloscMagazynowa > 0
  )

  // Jeśli nie ma produktu do zasugerowania, nie renderuj widgetu
  if (!suggestedProduct) {
    return null
  }

  const mainImageUrl = mainProduct.zdjecia?.[0]?.url || '/placeholder.png'
  const suggestedImageUrl = suggestedProduct.zdjecia?.[0]?.url || '/placeholder.png'

  // Oblicz sumę
  const totalPrice = includeSuggested
    ? mainProduct.cena + suggestedProduct.cena
    : mainProduct.cena

  const handleAddToCart = () => {
    // Dodaj główny produkt
    addItem({
      id: mainProduct.id,
      nazwa: mainProduct.nazwa,
      cena: mainProduct.cena,
      zdjecie: mainImageUrl,
      maxStock: mainProduct.iloscMagazynowa
    })

    // Dodaj sugerowany produkt jeśli checkbox zaznaczony
    if (includeSuggested) {
      addItem({
        id: suggestedProduct.id,
        nazwa: suggestedProduct.nazwa,
        cena: suggestedProduct.cena,
        zdjecie: suggestedImageUrl,
        maxStock: suggestedProduct.iloscMagazynowa
      })
      toast.success('Dodano produkty do koszyka!')
    } else {
      toast.success('Dodano produkt do koszyka!')
    }
  }

  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-white">
      {/* Nagłówek */}
      <h3 className="text-sm font-semibold text-slate-900 mb-4">
        Często kupowane razem:
      </h3>

      {/* Layout produktów */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Zdjęcia produktów */}
        <div className="flex items-center gap-2">
          {/* Główny produkt */}
          <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
            <Image
              src={mainImageUrl}
              alt={mainProduct.nazwa}
              fill
              className="object-contain p-2"
              sizes="80px"
            />
          </div>

          {/* Plus icon */}
          <Plus className="w-5 h-5 text-slate-400 flex-shrink-0" />

          {/* Sugerowany produkt */}
          <div className="relative flex-shrink-0">
            <div
              className={`relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 transition-opacity duration-200 ${
                !includeSuggested ? 'opacity-40' : ''
              }`}
            >
              <Image
                src={suggestedImageUrl}
                alt={suggestedProduct.nazwa}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </div>

            {/* Checkbox overlay */}
            <label className="absolute -top-2 -right-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSuggested}
                onChange={(e) => setIncludeSuggested(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  includeSuggested
                    ? 'bg-emerald-600 border-emerald-600'
                    : 'bg-white border-slate-300'
                }`}
              >
                {includeSuggested && <Check className="w-3 h-3 text-white" />}
              </div>
            </label>
          </div>
        </div>

        {/* Info i cena */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            {/* Nazwy produktów */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-600 truncate">
                {mainProduct.nazwa}
              </p>
              <Link
                href={`/produkt/${suggestedProduct.id}`}
                className={`text-xs hover:text-emerald-600 transition-colors truncate block ${
                  includeSuggested ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                + {suggestedProduct.nazwa}
              </Link>
            </div>

            {/* Suma */}
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-slate-500">Suma:</p>
              <p className="text-lg font-bold text-slate-900">
                {totalPrice.toFixed(2)} zł
              </p>
            </div>
          </div>
        </div>

        {/* Przycisk CTA */}
        <button
          onClick={handleAddToCart}
          className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors flex-shrink-0"
        >
          Dodaj wybrane do koszyka
        </button>
      </div>
    </div>
  )
}
