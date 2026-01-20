'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  nazwa: string
  cena: number
  ilosc: number
  zdjecie?: string
}

interface CartContextType {
  items: CartItem[]
  dodajDoKoszyka: (item: Omit<CartItem, 'ilosc'>) => void
  usunZKoszyka: (id: string) => void
  zmienIlosc: (id: string, ilosc: number) => void
  wyczyscKoszyk: () => void
  suma: number
  iloscPrzedmiotow: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Wczytaj koszyk z localStorage po załadowaniu
  useEffect(() => {
    const saved = localStorage.getItem('koszyk')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Błąd wczytywania koszyka:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Zapisz koszyk do localStorage przy każdej zmianie
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('koszyk', JSON.stringify(items))
    }
  }, [items, isLoaded])

  const dodajDoKoszyka = (item: Omit<CartItem, 'ilosc'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, ilosc: i.ilosc + 1 } : i
        )
      }
      return [...prev, { ...item, ilosc: 1 }]
    })
  }

  const usunZKoszyka = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const zmienIlosc = (id: string, ilosc: number) => {
    if (ilosc <= 0) {
      usunZKoszyka(id)
      return
    }
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, ilosc } : i))
    )
  }

  const wyczyscKoszyk = () => {
    setItems([])
  }

  const suma = items.reduce((acc, item) => acc + item.cena * item.ilosc, 0)
  const iloscPrzedmiotow = items.reduce((acc, item) => acc + item.ilosc, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        dodajDoKoszyka,
        usunZKoszyka,
        zmienIlosc,
        wyczyscKoszyk,
        suma,
        iloscPrzedmiotow
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart musi być używany wewnątrz CartProvider')
  }
  return context
}
