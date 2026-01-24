import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // NOWY ADRES N8N (V2)
    const N8N_URL = 'https://n8n.kaban.click/webhook/zamowieniev2';

    // DEBUG: Loguj kluczowe pola przed wysłaniem
    console.log('=== ZAMÓWIENIE DEBUG ===');
    console.log('PodsumowanieKoszyka:', body.PodsumowanieKoszyka);
    console.log('Notatki:', body.Notatki);
    console.log('Total:', body.total);
    console.log('Produkty:', JSON.stringify(body.produkty));
    console.log('========================');

    const response = await fetch(N8N_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('Błąd n8n:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Błąd połączenia z CRM' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Błąd API:', error);
    return NextResponse.json(
      { error: 'Wewnętrzny błąd serwera' },
      { status: 500 }
    );
  }
}
