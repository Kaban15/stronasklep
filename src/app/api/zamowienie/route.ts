import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('--- API /api/zamowienie ---');
    console.log('Received order data');

    // ============================================
    // PRZYGOTOWANIE BEZPIECZNYCH DANYCH
    // ============================================

    // Bezpieczne wartości tekstowe
    const safeSummary = String(body.PodsumowanieKoszyka || 'Brak podsumowania');
    const safeNotes = String(body.Notatki || '');

    // Bezpieczne wartości liczbowe
    const safeTotal = Number(body.total) || 0;
    const safeSubtotal = Number(body.subtotal) || 0;
    const safeShipping = Number(body.shipping) || 0;
    const safePaymentFee = Number(body.paymentFee) || 0;
    const safeDiscountAmount = Number(body.discountAmount) || 0;
    const safeDiscountPercent = Number(body.discountPercent) || 0;

    console.log('safeSummary:', safeSummary);
    console.log('safeNotes:', safeNotes);
    console.log('safeTotal:', safeTotal);

    // ============================================
    // WYŚLIJ TYLKO DO N8N - N8N TWORZY ZAMÓWIENIE W AIRTABLE
    // ============================================
    const N8N_URL = 'https://n8n.kaban.click/webhook/zamowieniev2';

    // Payload z nadpisanymi bezpiecznymi wartościami
    const n8nPayload = {
      ...body,
      // Nadpisz pola obliczonymi bezpiecznymi stringami
      PodsumowanieKoszyka: safeSummary,
      Notatki: safeNotes,
      total: safeTotal,
      subtotal: safeSubtotal,
      shipping: safeShipping,
      paymentFee: safePaymentFee,
      discountAmount: safeDiscountAmount,
      discountPercent: safeDiscountPercent
    };

    console.log('Sending to n8n...');

    const n8nResponse = await fetch(N8N_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(n8nPayload),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('n8n webhook failed:', n8nResponse.status, errorText);
      return NextResponse.json(
        { error: 'Błąd przetwarzania zamówienia' },
        { status: 500 }
      );
    }

    // Pobierz odpowiedź z n8n (oczekujemy numeru zamówienia)
    const n8nResult = await n8nResponse.json();

    console.log('n8n response:', JSON.stringify(n8nResult));

    // n8n powinien zwrócić: { success: true, id: "recXXX", numerZamowienia: 89 }
    // lub podobną strukturę - dostosuj do tego co zwraca Twój workflow n8n
    return NextResponse.json({
      success: true,
      id: n8nResult.id || n8nResult.airtableRecordId || null,
      numerZamowienia: n8nResult.numerZamowienia || n8nResult.orderNumber || null
    });

  } catch (error) {
    console.error('Błąd API:', error);
    return NextResponse.json(
      { error: 'Wewnętrzny błąd serwera' },
      { status: 500 }
    );
  }
}
