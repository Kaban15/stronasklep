'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCart } from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  CreditCard,
  Banknote,
  Loader2,
  ShieldCheck,
  Package,
  Ticket
} from 'lucide-react'

interface CheckoutFormData {
  imie: string
  nazwisko: string
  email: string
  telefon: string
  ulica: string
  kodPocztowy: string
  miasto: string
  metodaPlatnosci: 'przelew' | 'przy_odbiorze'
  uwagi: string
  kodRabatowy: string
}

const KOSZT_DOSTAWY = 15.00

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<CheckoutFormData>({
    defaultValues: {
      metodaPlatnosci: 'przelew'
    }
  })

  const metodaPlatnosci = watch('metodaPlatnosci')

  useEffect(() => {
    setMounted(true)
  }, [])

  const sumaProduktow = getTotalPrice()
  const sumaCalkowita = sumaProduktow + KOSZT_DOSTAWY

  const onSubmit = async (data: CheckoutFormData) => {
    const adres = `${data.imie} ${data.nazwisko}\n${data.ulica}\n${data.kodPocztowy} ${data.miasto}\nTel: ${data.telefon}`

    const payload = {
      customer: {
        imie: data.imie,
        nazwisko: data.nazwisko,
        email: data.email,
        telefon: data.telefon,
        adres: {
          ulica: data.ulica,
          kodPocztowy: data.kodPocztowy,
          miasto: data.miasto
        }
      },
      products: items.map(item => ({
        id: item.id,
        nazwa: item.nazwa,
        cena: item.cena,
        ilosc: item.ilosc
      })),
      total: sumaCalkowita,
      subtotal: sumaProduktow,
      shipping: KOSZT_DOSTAWY,
      metodaPlatnosci: data.metodaPlatnosci,
      uwagi: data.uwagi || undefined,
      status: 'new',
      // Dla kompatybilności z istniejącym API
      email: data.email,
      imie: data.imie,
      nazwisko: data.nazwisko,
      produkty: items.map(item => ({
        id: item.id,
        nazwa: item.nazwa,
        cena: item.cena,
        ilosc: item.ilosc
      })),
      adres,
      // Kod polecający/rabatowy dla n8n workflow
      uzyty_kod_rabatowy: data.kodRabatowy?.trim().toUpperCase() || undefined
    }

    try {
      const response = await fetch('/api/zamowienie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Wystąpił błąd podczas składania zamówienia')
      }

      // Zapisz dane do sessionStorage dla strony thank-you
      sessionStorage.setItem('orderData', JSON.stringify({
        numerZamowienia: result.numerZamowienia,
        kwota: result.kwota || sumaCalkowita.toFixed(2),
        email: data.email,
        metodaPlatnosci: data.metodaPlatnosci
      }))

      clearCart()
      router.push('/thank-you')
    } catch (error) {
      console.error('Błąd zamówienia:', error)
      alert(error instanceof Error ? error.message : 'Wystąpił błąd')
    }
  }

  // Hydration fix
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

  // Pusty koszyk
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-300" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Twój koszyk jest pusty
            </h1>
            <p className="text-gray-500 mb-8">
              Dodaj produkty do koszyka, aby kontynuować
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Wróć do sklepu
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/koszyk"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Wróć do koszyka</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Bezpieczna transakcja</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Finalizacja zamówienia
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Lewa kolumna - Formularz */}
            <div className="lg:col-span-3 space-y-6">
              {/* Dane kontaktowe */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Dane kontaktowe
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imię *
                    </label>
                    <input
                      type="text"
                      {...register('imie', { required: 'Imię jest wymagane' })}
                      className={`w-full h-12 border rounded-xl px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.imie ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Jan"
                    />
                    {errors.imie && (
                      <p className="mt-1 text-sm text-red-500">{errors.imie.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nazwisko *
                    </label>
                    <input
                      type="text"
                      {...register('nazwisko', { required: 'Nazwisko jest wymagane' })}
                      className={`w-full h-12 border rounded-xl px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.nazwisko ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Kowalski"
                    />
                    {errors.nazwisko && (
                      <p className="mt-1 text-sm text-red-500">{errors.nazwisko.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email jest wymagany',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Nieprawidłowy adres email'
                        }
                      })}
                      className={`w-full h-12 border rounded-xl px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="jan@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      {...register('telefon', {
                        required: 'Telefon jest wymagany',
                        minLength: { value: 9, message: 'Numer za krótki' }
                      })}
                      className={`w-full h-12 border rounded-xl px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.telefon ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="123 456 789"
                    />
                    {errors.telefon && (
                      <p className="mt-1 text-sm text-red-500">{errors.telefon.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Adres dostawy */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Adres dostawy
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ulica i numer *
                    </label>
                    <input
                      type="text"
                      {...register('ulica', { required: 'Adres jest wymagany' })}
                      className={`w-full h-12 border rounded-xl px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.ulica ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="ul. Przykładowa 15/3"
                    />
                    {errors.ulica && (
                      <p className="mt-1 text-sm text-red-500">{errors.ulica.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kod pocztowy *
                      </label>
                      <input
                        type="text"
                        {...register('kodPocztowy', {
                          required: 'Kod pocztowy jest wymagany',
                          pattern: {
                            value: /^\d{2}-\d{3}$/,
                            message: 'Format: 00-000'
                          }
                        })}
                        className={`w-full h-12 border rounded-xl px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                          errors.kodPocztowy ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="00-000"
                      />
                      {errors.kodPocztowy && (
                        <p className="mt-1 text-sm text-red-500">{errors.kodPocztowy.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Miasto *
                      </label>
                      <input
                        type="text"
                        {...register('miasto', { required: 'Miasto jest wymagane' })}
                        className={`w-full h-12 border rounded-xl px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                          errors.miasto ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Warszawa"
                      />
                      {errors.miasto && (
                        <p className="mt-1 text-sm text-red-500">{errors.miasto.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metoda płatności */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Metoda płatności
                </h2>

                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    metodaPlatnosci === 'przelew'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      {...register('metodaPlatnosci')}
                      value="przelew"
                      className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Przelew tradycyjny</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Dane do przelewu otrzymasz w mailu potwierdzającym
                      </p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    metodaPlatnosci === 'przy_odbiorze'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      {...register('metodaPlatnosci')}
                      value="przy_odbiorze"
                      className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Płatność przy odbiorze</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">+5 zł</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Zapłacisz gotówką lub kartą przy odbiorze przesyłki
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Uwagi */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Uwagi do zamówienia
                  <span className="text-sm font-normal text-gray-400 ml-2">(opcjonalne)</span>
                </h2>
                <textarea
                  {...register('uwagi')}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="Dodatkowe informacje dla kuriera..."
                />
              </div>
            </div>

            {/* Prawa kolumna - Podsumowanie */}
            <div className="lg:col-span-2">
              <div className="bg-gray-100 rounded-2xl p-6 lg:sticky lg:top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Podsumowanie zamówienia
                </h2>

                {/* Lista produktów */}
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        {item.zdjecie ? (
                          <Image
                            src={item.zdjecie}
                            alt={item.nazwa}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Package className="w-6 h-6" />
                          </div>
                        )}
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center">
                          {item.ilosc}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.nazwa}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.cena.toFixed(2)} zł × {item.ilosc}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {(item.cena * item.ilosc).toFixed(2)} zł
                      </div>
                    </div>
                  ))}
                </div>

                {/* Koszty */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Produkty</span>
                    <span className="font-medium text-gray-900">{sumaProduktow.toFixed(2)} zł</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Dostawa
                    </span>
                    <span className="font-medium text-gray-900">{KOSZT_DOSTAWY.toFixed(2)} zł</span>
                  </div>
                  {metodaPlatnosci === 'przy_odbiorze' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Płatność przy odbiorze</span>
                      <span className="font-medium text-gray-900">5.00 zł</span>
                    </div>
                  )}
                </div>

                {/* Suma całkowita */}
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-900 font-medium">Do zapłaty</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {(sumaCalkowita + (metodaPlatnosci === 'przy_odbiorze' ? 5 : 0)).toFixed(2)} zł
                    </span>
                  </div>
                </div>

                {/* ========== SUPER WIDOCZNY ZNACZNIK ========== */}
                <div style={{
                  border: '5px solid red',
                  padding: '20px',
                  background: 'yellow',
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: '20px',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '18px', marginBottom: '10px' }}>
                    🎟️ TU JESTEM! WPISZ KOD POLECAJĄCY:
                  </div>
                  <input
                    type="text"
                    {...register('kodRabatowy')}
                    placeholder="WPISZ KOD RABATOWY NP. JAN123"
                    style={{
                      border: '3px solid black',
                      width: '100%',
                      padding: '15px',
                      fontSize: '16px',
                      textTransform: 'uppercase',
                      background: 'white'
                    }}
                  />
                </div>
                {/* ========== KONIEC ZNACZNIKA ========== */}

                {/* Przycisk */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 mt-6 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Przetwarzanie...</span>
                    </>
                  ) : (
                    <span>Złóż zamówienie</span>
                  )}
                </button>

                {/* Info */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  Składając zamówienie akceptujesz regulamin sklepu
                </p>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Bezpieczna transakcja</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Truck className="w-4 h-4 text-emerald-500" />
                    <span>Wysyłka 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
