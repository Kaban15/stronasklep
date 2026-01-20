import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret token do autoryzacji - zmień na własny!
const REVALIDATE_SECRET = 'niemiecka_chemia_top_secret'

export async function GET(request: NextRequest) {
  // Pobierz secret z query params
  const secret = request.nextUrl.searchParams.get('secret')

  // Sprawdź autoryzację
  if (!secret || secret !== REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Invalid or missing secret token' },
      { status: 401 }
    )
  }

  try {
    // Rewaliduj wszystkie dane oznaczone tagiem 'products'
    revalidateTag('products')

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'Cache produktów został odświeżony'
    })
  } catch (error) {
    console.error('Błąd rewalidacji:', error)
    return NextResponse.json(
      { error: 'Revalidation failed', message: String(error) },
      { status: 500 }
    )
  }
}

// Opcjonalnie obsługa POST (dla n8n webhook)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const secret = body.secret

    if (!secret || secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or missing secret token' },
        { status: 401 }
      )
    }

    revalidateTag('products')

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'Cache produktów został odświeżony'
    })
  } catch (error) {
    console.error('Błąd rewalidacji:', error)
    return NextResponse.json(
      { error: 'Revalidation failed', message: String(error) },
      { status: 500 }
    )
  }
}
