import { pobierzProdukty, pobierzProduktyWedlugKategorii } from '@/lib/airtable'
import ProductCard from '@/components/ProductCard'

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
      {/* Hero Section - czysty, profesjonalny styl */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-slate-800 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded">
                Import DE
              </span>
              <span className="text-gray-400 text-sm">Oryginalne produkty z Niemiec</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Chemia gospodarcza<br />
              <span className="text-gray-500">w najlepszych cenach</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-xl">
              Sprawdzone marki prosto z niemieckich sklepów. Persil, Ariel, Fairy i wiele innych.
            </p>

            {/* Kategorie - przyciski */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/"
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                  !kategoria
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Wszystkie produkty
              </a>
              <a
                href="/?kategoria=chemia"
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                  kategoria === 'chemia'
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Chemia gospodarcza
              </a>
              <a
                href="/?kategoria=zabawki"
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                  kategoria === 'zabawki'
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Zabawki
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Oryginalne produkty</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 4-8-4m16 0v10l-8 4m0-10L4 7m8 4v10" />
              </svg>
              <span>Szybka wysyłka</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Bezpieczne płatności</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lista produktow */}
      <section className="container mx-auto px-4 py-10">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {produkty.map(produkt => (
              <ProductCard key={produkt.id} produkt={produkt} />
            ))}
          </div>
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
