import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  nazwa: string
  cena: number
  ilosc: number
  zdjecie?: string
  cenaJednostkowa?: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Akcje
  addItem: (item: Omit<CartItem, 'ilosc'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, ilosc: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void

  // Computed
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, ilosc: i.ilosc + 1 } : i
              ),
              isOpen: true
            }
          }

          return {
            items: [...state.items, { ...item, ilosc: 1 }],
            isOpen: true
          }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id)
        }))
      },

      updateQuantity: (id, ilosc) => {
        if (ilosc <= 0) {
          get().removeItem(id)
          return
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, ilosc } : i
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.ilosc, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((acc, item) => acc + item.cena * item.ilosc, 0)
      }
    }),
    {
      name: 'koszyk-storage',
      // Nie zapisujemy isOpen do localStorage
      partialize: (state) => ({ items: state.items })
    }
  )
)
