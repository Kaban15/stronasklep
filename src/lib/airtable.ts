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
    status: (record.fields.Status as 'aktywny' | 'nieaktywny' | 'wyprzedany') || 'aktywny'
  }
}

export async function pobierzProdukty(): Promise<Produkt[]> {
  const url = `https://api.airtable.com/v0/${BASE_ID}/Produkty?filterByFormula={Status}='aktywny'`

  const response = await fetch(url, {
    headers,
    next: {
      revalidate: 3600, // Cache na 1 godzinę (rewalidacja przez tag)
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
      revalidate: 3600, // Cache na 1 godzinę (rewalidacja przez tag)
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
      revalidate: 3600, // Cache na 1 godzinę (rewalidacja przez tag)
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
