import { pobierzProdukty, pobierzProduktyWedlugKategorii } from '@/lib/airtable'
import ProductGrid from '@/components/ProductGrid'
import HeroGrid from '@/components/HeroGrid'

// ISR: odświeżanie co 10 minut
export const revalidate = 600

interface Props {
  searchParams: { kategoria?: string }
}

export default async function Home({ searchParams }: Props) {
  const kategoria = searchParams.kategoria

  const produkty = kategoria
    ? await pobierzProduktyWedlugKategorii(kategoria)
    : await pobierzProdukty()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Grid - Bento Style */}
      <HeroGrid />

      {/* Kategorie - filtry */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/"
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                !kategoria
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Wszystkie
            </a>
            <a
              href="/?kategoria=chemia"
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                kategoria === 'chemia'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Chemia gospodarcza
            </a>
            <a
              href="/?kategoria=zabawki"
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                kategoria === 'zabawki'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Zabawki
            </a>
          </div>
        </div>
      </section>

      {/* Lista produktow */}
      <section id="produkty" className="container mx-auto px-4 py-10 scroll-mt-4">
        {/* Naglowek sekcji */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {kategoria
                ? kategoria === 'chemia'
                  ? 'Chemia gospodarcza'
                  : kategoria === 'zabawki'
                    ? 'Zabawki'
                    : kategoria
                : 'Wszystkie produkty'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {produkty.length} {produkty.length === 1 ? 'produkt' : produkty.length < 5 ? 'produkty' : 'produktów'}
            </p>
          </div>
          {kategoria && (
            <a
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Wszystkie produkty
            </a>
          )}
        </div>

        {/* Grid produktow */}
        {produkty.length > 0 ? (
          <ProductGrid products={produkty} />
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-100">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500 text-lg mb-2">
              Brak produktów w tej kategorii
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Wróć do wszystkich produktów
            </a>
          </div>
        )}
      </section>

      {/* Footer info */}
      <section className="bg-white border-t border-gray-100 mt-10">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Łatwe zakupy</h3>
              <p className="text-gray-500 text-sm">Dodaj do koszyka i zamów w kilka kliknięć</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dostawa na terenie Polski</h3>
              <p className="text-gray-500 text-sm">Wysyłka kurierem lub do paczkomatu</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Kontakt</h3>
              <p className="text-gray-500 text-sm">Masz pytania? Napisz do nas</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
