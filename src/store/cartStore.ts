import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../types/shopify';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.variantId === item.variantId);
        if (existing) {
          return { items: state.items.map(i => i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i) };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (variantId) => set((state) => ({ items: state.items.filter(i => i.variantId !== variantId) })),
      updateQuantity: (variantId, qty) => set((state) => ({
        items: qty <= 0 ? state.items.filter(i => i.variantId !== variantId) : state.items.map(i => i.variantId === variantId ? { ...i, quantity: qty } : i)
      })),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'valwatt-cart' }
  )
);
