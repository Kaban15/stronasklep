import { pobierzProdukty } from '@/lib/airtable'
import HeroGrid from '@/components/HeroGrid'
import ProductBrowser from '@/components/ProductBrowser'

// ISR: odświeżanie co 10 minut
export const revalidate = 600

export default async function Home() {
  const produkty = await pobierzProdukty()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Grid - Bento Style */}
      <HeroGrid />

      {/* Lista produktow z filtrami */}
      <section id="produkty" className="container mx-auto px-4 py-8 scroll-mt-4">
        {/* Naglowek sekcji */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Nasze produkty</h2>
          <p className="text-gray-500 text-sm mt-1">
            Oryginalna chemia gospodarcza prosto z Niemiec
          </p>
        </div>

        {/* Product Browser z filtrami i sortowaniem */}
        <ProductBrowser products={produkty} />
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
