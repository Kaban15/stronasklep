'use server'

import { getDiscountCode } from '@/lib/airtable'

export interface ValidateDiscountResult {
  success: boolean
  discount?: number
  code?: string
  message?: string
}

export async function validateDiscountAction(code: string): Promise<ValidateDiscountResult> {
  if (!code || code.trim().length === 0) {
    return {
      success: false,
      message: 'Wprowadź kod rabatowy'
    }
  }

  try {
    const discountCode = await getDiscountCode(code)

    if (!discountCode) {
      return {
        success: false,
        message: 'Kod rabatowy jest nieprawidłowy lub nieaktywny'
      }
    }

    return {
      success: true,
      discount: discountCode.value,
      code: discountCode.code,
      message: `Kod ${discountCode.code} aktywny (-${Math.round(discountCode.value * 100)}%)`
    }
  } catch (error) {
    console.error('Błąd walidacji kodu rabatowego:', error)
    return {
      success: false,
      message: 'Wystąpił błąd podczas weryfikacji kodu'
    }
  }
}
