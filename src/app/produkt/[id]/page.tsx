import { pobierzProdukt, pobierzProdukty, type Produkt } from '@/lib/airtable'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import type { Metadata } from 'next'
import AddToCartButton from './AddToCartButton'
import ProductTabs from './ProductTabs'
import CrossSellWidget from '@/components/product/CrossSellWidget'
import { Truck, ShieldCheck, Package, ChevronRight } from 'lucide-react'

// ISR: odświeżanie co 10 minut
export const revalidate = 600

interface Props {
  params: { id: string }
}

// Cache'owanie pobierania produktu - zapobiega podwójnemu requestowi
const getProdukt = cache(async (id: string): Promise<Produkt | null> => {
  return pobierzProdukt(id)
})

export async function generateStaticParams() {
  const produkty = await pobierzProdukty()
  return produkty.map(p => ({ id: p.id }))
}

// Dynamiczne metadane SEO dla każdego produktu
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const produkt = await getProdukt(params.id)

  if (!produkt) {
    return {
      title: 'Produkt nie znaleziony - Chemia z Niemiec',
      description: 'Produkt nie został znaleziony w naszym sklepie.'
    }
  }

  const zdjecieUrl = produkt.zdjecia?.[0]?.url || '/placeholder.png'
  const opisSkrocony = produkt.opis
    ? produkt.opis.slice(0, 150) + (produkt.opis.length > 150 ? '...' : '')
    : `${produkt.nazwa} - oryginalny produkt z Niemiec w najlepszej cenie. Szybka wysyłka 24h.`

  return {
    title: `${produkt.nazwa} - Chemia z Niemiec | Sklep MVP`,
    description: opisSkrocony,
    openGraph: {
      title: `${produkt.nazwa} - Chemia z Niemiec`,
      description: opisSkrocony,
      images: [
        {
          url: zdjecieUrl,
          width: 800,
          height: 800,
          alt: produkt.nazwa
        }
      ],
      type: 'website',
      locale: 'pl_PL',
      siteName: 'Sklep MVP - Produkty z Niemiec'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${produkt.nazwa} - Chemia z Niemiec`,
      description: opisSkrocony,
      images: [zdjecieUrl]
    }
  }
}

export default async function ProduktPage({ params }: Props) {
  const [produkt, wszystkieProdukty] = await Promise.all([
    getProdukt(params.id),
    pobierzProdukty()
  ])

  if (!produkt) {
    notFound()
  }

  const zdjecieUrl = produkt.zdjecia?.[0]?.url || '/placeholder.png'
  const niedostepny = produkt.iloscMagazynowa <= 0

  // Cena jednostkowa - podstawowa
  const cenaJednostkowa = `${produkt.cena.toFixed(2)} zł / szt.`

  // Smart Efficiency - cena za jednostkę (np. pranie)
  const hasEfficiency = produkt.efficiency && produkt.efficiency > 0 && produkt.unit
  const pricePerUnit = hasEfficiency ? (produkt.cena / produkt.efficiency!).toFixed(2) : null
  const unitPriceText = hasEfficiency && pricePerUnit
    ? produkt.unit === 'pran'
      ? `Tylko ${pricePerUnit} zł za jedno pranie!`
      : `${pricePerUnit} zł / ${produkt.unit}`
    : null

  // Kategoria display name
  const kategoriaDisplay = produkt.kategoria === 'chemia'
    ? 'Chemia gospodarcza'
    : produkt.kategoria === 'zabawki'
      ? 'Zabawki'
      : produkt.kategoria

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
              Sklep
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <Link
              href={`/?kategoria=${produkt.kategoria}`}
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              {kategoriaDisplay}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">
              {produkt.nazwa}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Lewa kolumna - Zdjęcie */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              {produkt.zdjecia?.[0] ? (
                <Image
                  src={zdjecieUrl}
                  alt={produkt.nazwa}
                  fill
                  className="object-contain p-8"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Package className="w-24 h-24" />
                </div>
              )}

              {/* Badge Zaufania - Import DE */}
              <span className="absolute top-4 right-4 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded shadow-md">
                Import DE 🇩🇪
              </span>

              {/* Badge niedostępny */}
              {niedostepny && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <span className="bg-gray-600 text-white px-6 py-3 rounded-lg text-sm font-semibold">
                    Wyprzedane
                  </span>
                </div>
              )}
            </div>

            {/* Miniaturki - placeholder dla przyszłych zdjęć */}
            {produkt.zdjecia && produkt.zdjecia.length > 1 && (
              <div className="flex gap-3 mt-4">
                {produkt.zdjecia.slice(0, 4).map((zdjecie, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === 0 ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                    } transition-colors`}
                  >
                    <Image
                      src={zdjecie.url}
                      alt={`${produkt.nazwa} - zdjęcie ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Prawa kolumna - Informacje */}
          <div className="lg:py-4">
            {/* Tagi */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-white text-slate-800 text-xs font-bold px-2 py-1 rounded shadow-sm border border-gray-100">
                Import DE 🇩🇪
              </span>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded">
                {kategoriaDisplay}
              </span>
              {!niedostepny && produkt.iloscMagazynowa <= 5 && (
                <span className="bg-amber-100 text-amber-700 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded">
                  Ostatnie sztuki
                </span>
              )}
            </div>

            {/* Tytuł */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {produkt.nazwa}
            </h1>

            {/* Opis krótki */}
            {produkt.opis && (
              <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3">
                {produkt.opis}
              </p>
            )}

            {/* Cena */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">
                  {produkt.cena.toFixed(2)}
                </span>
                <span className="text-2xl font-semibold text-gray-900">zł</span>
              </div>
              {unitPriceText ? (
                <span className="text-base text-emerald-600 font-medium mt-1 block">
                  {unitPriceText}
                </span>
              ) : (
                <span className="text-sm text-gray-400 mt-1 block">
                  {cenaJednostkowa}
                </span>
              )}
            </div>

            {/* Dostępność */}
            <div className="mb-6">
              {niedostepny ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-sm font-medium">Produkt chwilowo niedostępny</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-emerald-600">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium">
                    Dostępne: {produkt.iloscMagazynowa} szt.
                  </span>
                </div>
              )}
            </div>

            {/* Akcje - AddToCart */}
            <div className="mb-8">
              <AddToCartButton
                produkt={{
                  id: produkt.id,
                  nazwa: produkt.nazwa,
                  cena: produkt.cena,
                  zdjecie: zdjecieUrl
                }}
                niedostepny={niedostepny}
                maxIlosc={Math.max(1, produkt.iloscMagazynowa)}
              />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Truck className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Wysyłka 24h</p>
                  <p className="text-xs text-gray-500">Szybka realizacja</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Oryginalny produkt</p>
                  <p className="text-xs text-gray-500">Import z Niemiec</p>
                </div>
              </div>
            </div>

            {/* Cross-sell widget */}
            <div className="mt-6">
              <CrossSellWidget
                mainProduct={produkt}
                allProducts={wszystkieProdukty}
              />
            </div>
          </div>
        </div>

        {/* Sekcja Szczegóły - Tabs */}
        <div className="mt-12 lg:mt-16">
          <ProductTabs
            opis={produkt.opis || 'Brak opisu produktu.'}
            kategoria={produkt.kategoria}
          />
        </div>
      </div>

      {/* Mobile sticky button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">{produkt.cena.toFixed(2)} zł</p>
            {unitPriceText ? (
              <p className="text-xs text-emerald-600 font-medium">{unitPriceText}</p>
            ) : (
              <p className="text-xs text-gray-500">{cenaJednostkowa}</p>
            )}
          </div>
          <button
            disabled={niedostepny}
            className={`flex-1 max-w-[200px] h-12 rounded-xl font-semibold text-sm transition-all ${
              niedostepny
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 text-white active:scale-[0.98]'
            }`}
          >
            {niedostepny ? 'Niedostępne' : 'Do koszyka'}
          </button>
        </div>
      </div>

      {/* Spacer dla mobile sticky button */}
      <div className="lg:hidden h-24" />
    </div>
  )
}
