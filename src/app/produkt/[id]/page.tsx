import { pobierzProdukt, pobierzProdukty, type Produkt } from '@/lib/airtable'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import type { Metadata } from 'next'
import AddToCartButton from './AddToCartButton'
import ProductTabs from './ProductTabs'
import CrossSellWidget from '@/components/product/CrossSellWidget'
import { Truck, ShieldCheck, Package, ChevronRight, PackageCheck } from 'lucide-react'

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
      title: 'Produkt nie znaleziony',
      description: 'Produkt nie został znaleziony w naszym sklepie.'
    }
  }

  const zdjecieUrl = produkt.zdjecia?.[0]?.url || '/placeholder.png'

  // Buduj dynamiczny opis z ceną i wydajnością
  const wydajnoscInfo = produkt.efficiency && produkt.unit
    ? ` Wydajność: ${produkt.efficiency} ${produkt.unit}.`
    : ''

  const seoDescription = `Kup ${produkt.nazwa} w świetnej cenie ${produkt.cena.toFixed(2)} zł.${wydajnoscInfo} Wysyłka 24h.`

  return {
    title: `${produkt.nazwa} - Chemia z Niemiec`,
    description: seoDescription,
    openGraph: {
      title: `${produkt.nazwa} - Chemia z Niemiec`,
      description: seoDescription,
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
      siteName: 'Chemia z Niemiec'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${produkt.nazwa} - Chemia z Niemiec`,
      description: seoDescription,
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
  const lowStock = !niedostepny && produkt.iloscMagazynowa <= 3

  // Cena jednostkowa - podstawowa
  const cenaJednostkowa = `${produkt.cena.toFixed(2)} zł / szt.`

  // Smart Efficiency - cena za jednostkę (np. pranie) - logika z ProductCard
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
      <div className="container mx-auto px-4 py-6 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Lewa kolumna - Zdjęcie */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
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
              <span className="absolute top-4 right-4 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-gray-100">
                Import DE 🇩🇪
              </span>

              {/* Badge niedostępny / wyprzedane */}
              {niedostepny && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <span className="bg-gray-600 text-white px-6 py-3 rounded-lg text-sm font-semibold">
                    Wyprzedane
                  </span>
                </div>
              )}

              {/* Low stock badge */}
              {lowStock && (
                <span className="absolute bottom-4 left-4 bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                  Ostatnie {produkt.iloscMagazynowa} szt.
                </span>
              )}
            </div>

            {/* Miniaturki - jeśli jest więcej niż jedno zdjęcie */}
            {produkt.zdjecia && produkt.zdjecia.length > 1 && (
              <div className="flex gap-3 mt-4">
                {produkt.zdjecia.slice(0, 4).map((zdjecie, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === 0 ? 'border-emerald-600' : 'border-gray-200 hover:border-gray-400'
                    } transition-colors bg-white`}
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

          {/* Prawa kolumna - Informacje (Sticky na desktop) */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            {/* Kategoria */}
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
              {kategoriaDisplay}
            </span>

            {/* Tytuł - H1, bold */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4 leading-tight">
              {produkt.nazwa}
            </h1>

            {/* Stock Badge */}
            <div className="mb-6">
              {niedostepny ? (
                <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-gray-400" />
                  Wyprzedane
                </span>
              ) : lowStock ? (
                <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Ostatnie sztuki!
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Dostępne ({produkt.iloscMagazynowa} szt.)
                </span>
              )}
            </div>

            {/* Sekcja Ceny - Critical UX */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">
                  {produkt.cena.toFixed(2)}
                </span>
                <span className="text-xl font-semibold text-gray-900">zł</span>
              </div>
              {/* Unit Price - Smart Efficiency (Critical UX feature) */}
              {unitPriceText ? (
                <p className="text-base text-emerald-600 font-semibold mt-2">
                  {unitPriceText}
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-1">
                  {cenaJednostkowa}
                </p>
              )}
            </div>

            {/* Add to Cart Button - Full width, huge */}
            <div className="mb-6">
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

            {/* Trust Section - 3 features in a row */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-2 mb-6 border-y border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-500">Oryginalna chemia z Niemiec</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-500">Wysyłka w 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-500">Pancerne pakowanie</span>
              </div>
            </div>

            {/* Product Description - prose styling */}
            {produkt.opis && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-900 mb-2">Opis produktu</h2>
                <div className="prose prose-sm prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {produkt.opis}
                  </p>
                </div>
              </div>
            )}

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

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <p className="text-2xl font-bold text-gray-900">{produkt.cena.toFixed(2)} zł</p>
            {unitPriceText ? (
              <p className="text-xs text-emerald-600 font-medium">{unitPriceText}</p>
            ) : (
              <p className="text-xs text-gray-500">{cenaJednostkowa}</p>
            )}
          </div>
          <AddToCartButton
            produkt={{
              id: produkt.id,
              nazwa: produkt.nazwa,
              cena: produkt.cena,
              zdjecie: zdjecieUrl
            }}
            niedostepny={niedostepny}
            maxIlosc={Math.max(1, produkt.iloscMagazynowa)}
            compact
          />
        </div>
      </div>

      {/* Spacer dla mobile sticky button */}
      <div className="lg:hidden h-24" />
    </div>
  )
}
