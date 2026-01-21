import { NextResponse } from 'next/server'

const N8N_WEBHOOK_URL = process.env.N8N_URL + '/webhook/zamowieniev2'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Walidacja podstawowa
    if (!body.email || !body.produkty || body.produkty.length === 0) {
      return NextResponse.json(
        { error: 'Brak wymaganych danych (email, produkty)' },
        { status: 400 }
      )
    }

    if (!body.adres) {
      return NextResponse.json(
        { error: 'Brak adresu dostawy' },
        { status: 400 }
      )
    }

    // Wyślij do n8n webhook
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Błąd n8n:', data)
      return NextResponse.json(
        { error: data.error || 'Błąd przetwarzania zamówienia' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Błąd API zamówienie:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    )
  }
}
