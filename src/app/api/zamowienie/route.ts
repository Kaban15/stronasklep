import { NextResponse } from 'next/server';
import { createOrder, OrderData } from '@/lib/airtable';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // DEBUG: Loguj kluczowe pola
    console.log('=== ZAMÓWIENIE DEBUG ===');
    console.log('PodsumowanieKoszyka:', body.PodsumowanieKoszyka);
    console.log('Notatki:', body.Notatki);
    console.log('Total:', body.total);
    console.log('========================');

    // 1. ZAPISZ BEZPOŚREDNIO DO AIRTABLE
    const orderData: OrderData = {
      imie: body.imie,
      nazwisko: body.nazwisko,
      email: body.email,
      telefon: body.telefon,
      adres: body.adres,
      metodaPlatnosci: body.metodaPlatnosci,
      produkty: body.produkty,
      total: body.total,
      subtotal: body.subtotal,
      shipping: body.shipping,
      paymentFee: body.paymentFee,
      discountAmount: body.discountAmount || 0,
      discountPercent: body.discountPercent || 0,
      uzyty_kod_rabatowy: body.uzyty_kod_rabatowy || '',
      Notatki: body.Notatki || '',
      PodsumowanieKoszyka: body.PodsumowanieKoszyka || ''
    };

    const airtableResult = await createOrder(orderData);

    if (!airtableResult.success) {
      console.error('Błąd zapisu do Airtable:', airtableResult.error);
      return NextResponse.json(
        { error: 'Błąd zapisu zamówienia: ' + airtableResult.error },
        { status: 500 }
      );
    }

    console.log('Zamówienie zapisane w Airtable, ID:', airtableResult.id);

    // 2. WYŚLIJ DO N8N (dla maili)
    const N8N_URL = 'https://n8n.kaban.click/webhook/zamowieniev2';

    try {
      const n8nResponse = await fetch(N8N_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body,
          airtableRecordId: airtableResult.id
        }),
      });

      if (!n8nResponse.ok) {
        console.warn('n8n webhook failed, but order saved to Airtable');
      }
    } catch (n8nError) {
      console.warn('n8n webhook error (order still saved):', n8nError);
    }

    // Zwróć sukces z ID z Airtable
    return NextResponse.json({
      success: true,
      id: airtableResult.id,
      numerZamowienia: airtableResult.numerZamowienia
    });

  } catch (error) {
    console.error('Błąd API:', error);
    return NextResponse.json(
      { error: 'Wewnętrzny błąd serwera' },
      { status: 500 }
    );
  }
}
