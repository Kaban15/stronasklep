// Klient Airtable do pobierania danych

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!
const BASE_ID = process.env.AIRTABLE_BASE_ID!

const headers = {
  'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json'
}

export interface Produkt {
  id: string
  nazwa: string
  opis: string
  cena: number
  zdjecia: { url: string; filename: string }[]
  iloscMagazynowa: number
  kategoria: 'chemia' | 'zabawki'
  status: 'aktywny' | 'nieaktywny' | 'wyprzedany'
  efficiency: number | null
  unit: string | null
  category?: string
  brand?: string
}

export interface ProduktRaw {
  id: string
  fields: {
    Nazwa?: string
    Opis?: string
    Cena?: number
    Zdjecia?: { url: string; filename: string }[]
    IloscMagazynowa?: number
    Kategoria?: string
    Status?: string
    Wydajnosc?: number
    Jednostka?: string
    Marka?: string
  }
}

function mapProdukt(record: ProduktRaw): Produkt {
  return {
    id: record.id,
    nazwa: record.fields.Nazwa || 'Bez nazwy',
    opis: record.fields.Opis || '',
    cena: record.fields.Cena || 0,
    zdjecia: record.fields.Zdjecia || [],
    iloscMagazynowa: record.fields.IloscMagazynowa || 0,
    kategoria: (record.fields.Kategoria as 'chemia' | 'zabawki') || 'chemia',
    status: (record.fields.Status as 'aktywny' | 'nieaktywny' | 'wyprzedany') || 'aktywny',
    efficiency: record.fields.Wydajnosc ?? null,
    unit: record.fields.Jednostka ?? null,
    category: record.fields.Kategoria || undefined,
    brand: record.fields.Marka || undefined
  }
}

export async function pobierzProdukty(): Promise<Produkt[]> {
  const url = `https://api.airtable.com/v0/${BASE_ID}/Produkty?filterByFormula={Status}='aktywny'`

  const response = await fetch(url, {
    headers,
    next: {
      revalidate: 600, // ISR: odświeżanie co 10 minut
      tags: ['products']
    }
  })

  if (!response.ok) {
    console.error('Błąd pobierania produktów:', await response.text())
    return []
  }

  const data = await response.json()
  return (data.records as ProduktRaw[]).map(mapProdukt)
}

export async function pobierzProdukt(id: string): Promise<Produkt | null> {
  const url = `https://api.airtable.com/v0/${BASE_ID}/Produkty/${id}`

  const response = await fetch(url, {
    headers,
    next: {
      revalidate: 600, // ISR: odświeżanie co 10 minut
      tags: ['products']
    }
  })

  if (!response.ok) {
    console.error('Błąd pobierania produktu:', await response.text())
    return null
  }

  const record = await response.json() as ProduktRaw
  return mapProdukt(record)
}

export async function pobierzProduktyWedlugKategorii(kategoria: string): Promise<Produkt[]> {
  const url = `https://api.airtable.com/v0/${BASE_ID}/Produkty?filterByFormula=AND({Status}='aktywny',{Kategoria}='${kategoria}')`

  const response = await fetch(url, {
    headers,
    next: {
      revalidate: 600, // ISR: odświeżanie co 10 minut
      tags: ['products']
    }
  })

  if (!response.ok) {
    console.error('Błąd pobierania produktów:', await response.text())
    return []
  }

  const data = await response.json()
  return (data.records as ProduktRaw[]).map(mapProdukt)
}

// Interfejs zamówienia
export interface Zamowienie {
  id: string
  numerZamowienia: number
  email: string
  produkty: string
  ilosciProduktow: string
  kwotaCalkowita: number
  status: 'nowe' | 'oplacone' | 'wysłane' | 'dostarczone' | 'anulowane'
  metodaPlatnosci: 'przelew' | 'przy_odbiorze'
  adresDostawy: string
  dataZamowienia: string
}

interface ZamowienieRaw {
  id: string
  fields: {
    NumerZamowienia?: number
    EmailGosc?: string
    Produkty?: { id: string }[]
    IlosciProduktow?: string
    KwotaCalkowita?: number
    Status?: string
    MetodaPlatnosci?: string
    AdresDostawy?: string
    DataZamowienia?: string
  }
}

function mapZamowienie(record: ZamowienieRaw): Zamowienie {
  return {
    id: record.id,
    numerZamowienia: record.fields.NumerZamowienia || 0,
    email: record.fields.EmailGosc || '',
    produkty: record.fields.Produkty?.map(p => p.id).join(', ') || '',
    ilosciProduktow: record.fields.IlosciProduktow || '[]',
    kwotaCalkowita: record.fields.KwotaCalkowita || 0,
    status: (record.fields.Status as Zamowienie['status']) || 'nowe',
    metodaPlatnosci: (record.fields.MetodaPlatnosci as Zamowienie['metodaPlatnosci']) || 'przelew',
    adresDostawy: record.fields.AdresDostawy || '',
    dataZamowienia: record.fields.DataZamowienia || ''
  }
}

export async function pobierzZamowieniaUzytkownika(email: string): Promise<Zamowienie[]> {
  // Kodowanie email dla URL i formuły Airtable
  const encodedFormula = encodeURIComponent(`{EmailGosc}='${email}'`)
  const url = `https://api.airtable.com/v0/${BASE_ID}/Zamowienia?filterByFormula=${encodedFormula}&sort%5B0%5D%5Bfield%5D=DataZamowienia&sort%5B0%5D%5Bdirection%5D=desc`

  const response = await fetch(url, {
    headers,
    cache: 'no-store' // Zawsze pobieraj świeże dane dla zamówień
  })

  if (!response.ok) {
    console.error('Błąd pobierania zamówień:', await response.text())
    return []
  }

  const data = await response.json()
  return (data.records as ZamowienieRaw[]).map(mapZamowienie)
}

// Interfejs kodu rabatowego
export interface DiscountCode {
  code: string
  value: number // wartość procentowa, np. 0.1 = 10%
}

interface DiscountCodeRaw {
  id: string
  fields: {
    Kod?: string
    Wartosc?: number
    Aktywny?: boolean
  }
}

export async function getDiscountCode(code: string): Promise<DiscountCode | null> {
  // Sanityzacja kodu - usunięcie znaków specjalnych dla bezpieczeństwa formuły
  const sanitizedCode = code.trim().toUpperCase().replace(/['"\\]/g, '')

  if (!sanitizedCode) {
    return null
  }

  const formula = encodeURIComponent(`AND({Kod}='${sanitizedCode}',{Aktywny}=1)`)
  const url = `https://api.airtable.com/v0/${BASE_ID}/KodyRabatowe?filterByFormula=${formula}&maxRecords=1`

  const response = await fetch(url, {
    headers,
    cache: 'no-store' // Zawsze sprawdzaj aktualność kodu
  })

  if (!response.ok) {
    console.error('Błąd pobierania kodu rabatowego:', await response.text())
    return null
  }

  const data = await response.json()
  const records = data.records as DiscountCodeRaw[]

  if (records.length === 0) {
    return null
  }

  const record = records[0]
  return {
    code: record.fields.Kod || sanitizedCode,
    value: record.fields.Wartosc || 0
  }
}

// ============================================
// TWORZENIE ZAMÓWIENIA W AIRTABLE
// ============================================

export interface OrderData {
  imie: string
  nazwisko: string
  email: string
  telefon: string
  adres: {
    ulica: string
    kodPocztowy: string
    miasto: string
  }
  metodaPlatnosci: 'przelew' | 'przy_odbiorze'
  produkty: Array<{
    id: string
    nazwa: string
    ilosc: number
    cena: number
  }>
  total: number
  subtotal: number
  shipping: number
  paymentFee: number
  discountAmount: number
  discountPercent: number
  uzyty_kod_rabatowy: string
  Notatki: string
  PodsumowanieKoszyka: string
}

export interface CreateOrderResult {
  success: boolean
  id?: string
  numerZamowienia?: number
  error?: string
}

export async function createOrder(orderData: OrderData): Promise<CreateOrderResult> {
  // 🔥 DEBUG: Co przyszło do funkcji?
  console.log('🔥🔥🔥 CREATE ORDER WYWOŁANE 🔥🔥🔥')
  console.log('🔥 orderData.PodsumowanieKoszyka:', orderData.PodsumowanieKoszyka)
  console.log('🔥 orderData.Notatki:', orderData.Notatki)
  console.log('🔥 orderData.produkty:', JSON.stringify(orderData.produkty))

  // CRITICAL: Buduj summary - WYMUŚ wartość do Airtable
  let summary = ''
  if (orderData.PodsumowanieKoszyka && orderData.PodsumowanieKoszyka.trim() !== '') {
    summary = orderData.PodsumowanieKoszyka
    console.log('✅ Używam PodsumowanieKoszyka z inputu:', summary.substring(0, 50))
  } else if (orderData.produkty && orderData.produkty.length > 0) {
    summary = orderData.produkty
      .map(p => `${p.nazwa} x${p.ilosc} (${(p.cena * p.ilosc).toFixed(2)} zł)`)
      .join('\n')
    console.log('✅ Zbudowałem summary z produktów:', summary)
  } else {
    // DEBUG: Wymuś tekst żeby w Airtable było widać że coś nie działa
    summary = `[DEBUG] Brak danych - produkty: ${orderData.produkty?.length || 0}, timestamp: ${new Date().toISOString()}`
    console.error('❌ Brak produktów i brak PodsumowanieKoszyka! Używam debug string')
  }

  const notes = orderData.Notatki?.trim() || ''

  console.log('🔥🔥🔥 FINAL VALUES FOR AIRTABLE 🔥🔥🔥')
  console.log('🔥 summary length:', summary.length)
  console.log('🔥 summary:', summary)
  console.log('🔥 notes:', notes || '(empty)')

  // Pełny adres jako string
  const adresDostawy = `${orderData.imie} ${orderData.nazwisko}\n${orderData.adres.ulica}\n${orderData.adres.kodPocztowy} ${orderData.adres.miasto}\nTel: ${orderData.telefon}`

  const url = `https://api.airtable.com/v0/${BASE_ID}/Zamowienia`

  // Payload dla Airtable - klucze MUSZĄ pasować DOKŁADNIE do nazw kolumn
  const airtablePayload = {
    fields: {
      "EmailGosc": orderData.email,
      "AdresDostawy": adresDostawy,
      "MetodaPlatnosci": orderData.metodaPlatnosci,
      "KwotaCalkowita": orderData.total,
      "Status": "nowe",
      "PodsumowanieKoszyka": summary,  // <-- TO MUSI BYĆ WYPEŁNIONE
      "Notatki": notes,                 // <-- I TO
      "UzytyKodRabatowy": orderData.uzyty_kod_rabatowy || '',
      "Subtotal": orderData.subtotal,
      "KosztDostawy": orderData.shipping,
      "OplataPobranie": orderData.paymentFee,
      "KwotaRabatu": orderData.discountAmount
    }
  }

  // 🔥 CRITICAL: Sprawdź co DOKŁADNIE wysyłamy do Airtable
  console.log('🔥🔥🔥 WYSYŁAM DO AIRTABLE 🔥🔥🔥')
  console.log('🔥 PodsumowanieKoszyka w payload:', airtablePayload.fields.PodsumowanieKoszyka)
  console.log('🔥 Notatki w payload:', airtablePayload.fields.Notatki)
  console.log('🔥 Full payload:', JSON.stringify(airtablePayload, null, 2))

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(airtablePayload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Błąd tworzenia zamówienia w Airtable:', errorText)
      return {
        success: false,
        error: `Airtable error: ${response.status} - ${errorText}`
      }
    }

    const result = await response.json()

    console.log('--- AIRTABLE RESPONSE ---')
    console.log('Created record ID:', result.id)
    console.log('-------------------------')

    return {
      success: true,
      id: result.id,
      numerZamowienia: result.fields?.NumerZamowienia
    }
  } catch (error) {
    console.error('Błąd createOrder:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
