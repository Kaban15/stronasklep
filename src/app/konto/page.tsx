import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { pobierzZamowieniaUzytkownika, Zamowienie } from '@/lib/airtable'
import {
  User,
  Package,
  ShoppingBag,
  ArrowLeft,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  CreditCard
} from 'lucide-react'

// Mapowanie statusów na polski z ikonami
const statusConfig: Record<Zamowienie['status'], { label: string; color: string; icon: React.ReactNode }> = {
  nowe: { label: 'Nowe', color: 'bg-blue-100 text-blue-700', icon: <Clock className="w-4 h-4" /> },
  oplacone: { label: 'Opłacone', color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle className="w-4 h-4" /> },
  wysłane: { label: 'Wysłane', color: 'bg-purple-100 text-purple-700', icon: <Truck className="w-4 h-4" /> },
  dostarczone: { label: 'Dostarczone', color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-4 h-4" /> },
  anulowane: { label: 'Anulowane', color: 'bg-red-100 text-red-700', icon: <XCircle className="w-4 h-4" /> }
}

function formatDate(dateString: string): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function parseProductsList(ilosciProduktow: string): { nazwa: string; ilosc: number; cena: number }[] {
  try {
    return JSON.parse(ilosciProduktow)
  } catch {
    return []
  }
}

export default async function KontoPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const email = user.primaryEmailAddress?.emailAddress
  const zamowienia = email ? await pobierzZamowieniaUzytkownika(email) : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Wróć do sklepu</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.firstName || 'Avatar'}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-slate-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Witaj, {user.firstName || 'Użytkowniku'}!
              </h1>
              <p className="text-gray-500">{email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Sekcja zamówień */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <Package className="w-6 h-6 text-slate-700" />
            <h2 className="text-lg font-bold text-gray-900">Moje zamówienia</h2>
            <span className="ml-auto bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">
              {zamowienia.length}
            </span>
          </div>

          {zamowienia.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Brak historii zamówień
              </h3>
              <p className="text-gray-500 mb-6">
                Nie masz jeszcze żadnych zamówień. Zacznij zakupy!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
              >
                Przeglądaj produkty
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {zamowienia.map((zamowienie) => {
                const status = statusConfig[zamowienie.status] || statusConfig.nowe
                const produkty = parseProductsList(zamowienie.ilosciProduktow)

                return (
                  <div key={zamowienie.id} className="p-6">
                    {/* Nagłówek zamówienia */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Nr zamówienia</span>
                        <p className="font-bold text-gray-900">#{zamowienie.numerZamowienia}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Data</span>
                        <p className="font-medium text-gray-900">{formatDate(zamowienie.dataZamowienia)}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Kwota</span>
                        <p className="font-bold text-gray-900">{zamowienie.kwotaCalkowita.toFixed(2)} zł</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <CreditCard className="w-4 h-4" />
                        {zamowienie.metodaPlatnosci === 'przelew' ? 'Przelew' : 'Przy odbiorze'}
                      </div>
                    </div>

                    {/* Lista produktów */}
                    {produkty.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Produkty:</p>
                        <ul className="space-y-1">
                          {produkty.map((produkt, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex justify-between">
                              <span>{produkt.nazwa} × {produkt.ilosc}</span>
                              <span className="font-medium">{(produkt.cena * produkt.ilosc).toFixed(2)} zł</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Adres dostawy */}
                    {zamowienie.adresDostawy && (
                      <div className="mt-3 text-sm text-gray-500">
                        <span className="font-medium">Adres:</span> {zamowienie.adresDostawy}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
