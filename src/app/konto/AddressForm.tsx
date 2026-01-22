'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { MapPin, Phone, Save, Loader2, CheckCircle } from 'lucide-react'

interface AddressData {
  phone: string
  street: string
  zip: string
  city: string
}

export default function AddressForm() {
  const { user, isLoaded } = useUser()
  const [formData, setFormData] = useState<AddressData>({
    phone: '',
    street: '',
    zip: '',
    city: ''
  })
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Załaduj zapisane dane z unsafeMetadata
  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.unsafeMetadata as {
        phone?: string
        address?: { street?: string; zip?: string; city?: string }
      }

      setFormData({
        phone: metadata?.phone || '',
        street: metadata?.address?.street || '',
        zip: metadata?.address?.zip || '',
        city: metadata?.address?.city || ''
      })
    }
  }, [isLoaded, user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSaving(true)
    try {
      await user.update({
        unsafeMetadata: {
          phone: formData.phone,
          address: {
            street: formData.street,
            zip: formData.zip,
            city: formData.city
          }
        }
      })
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Błąd zapisywania danych:', error)
      alert('Wystąpił błąd podczas zapisywania danych.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Telefon */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          <Phone className="w-4 h-4 inline mr-2" />
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="123 456 789"
          className="w-full h-12 border border-gray-200 rounded-xl px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        />
      </div>

      {/* Ulica */}
      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4 inline mr-2" />
          Ulica i numer
        </label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="ul. Przykładowa 15/3"
          className="w-full h-12 border border-gray-200 rounded-xl px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
        />
      </div>

      {/* Kod pocztowy i miasto */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
            Kod pocztowy
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="00-000"
            className="w-full h-12 border border-gray-200 rounded-xl px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            Miasto
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Warszawa"
            className="w-full h-12 border border-gray-200 rounded-xl px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Przycisk zapisu */}
      <button
        type="submit"
        disabled={isSaving}
        className="w-full h-12 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSaving ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Zapisywanie...</span>
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            <span>Zapisz dane</span>
          </>
        )}
      </button>

      {/* Toast sukcesu */}
      {showSuccess && (
        <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Dane zostały zapisane!</span>
        </div>
      )}
    </form>
  )
}
