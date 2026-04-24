import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calcularDescontoMetodo } from '../lib/pagamento';
import type { OpcaoFrete } from '../lib/cep';

export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  variantTitle: string;
  price: number; // BRL decimal
  image: string;
  quantity: number;
}

interface Cupom {
  codigo: string;
  tipo: 'percentual' | 'frete_gratis';
  valor: number;
}

const CUPONS: Cupom[] = [
  { codigo: 'VALWATT10', tipo: 'percentual', valor: 10 },
  { codigo: 'PRIMEIRACOMPRA', tipo: 'percentual', valor: 15 },
  { codigo: 'FRETE0', tipo: 'frete_gratis', valor: 0 },
];

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  cupom: Cupom | null;
  cupomErro: string;
  frete: OpcaoFrete | null;
  metodoPagamento: string;

  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  aplicarCupom: (codigo: string) => void;
  removerCupom: () => void;
  setFrete: (frete: OpcaoFrete | null) => void;
  setMetodoPagamento: (id: string) => void;

  totalItems: () => number;
  subtotal: () => number;
  descontoCupom: () => number;
  freteValor: () => number;
  descontoMetodo: () => number;
  totalFinal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      cupom: null,
      cupomErro: '',
      frete: null,
      metodoPagamento: 'credito',

      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find(i => i.variantId === newItem.variantId);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.variantId === newItem.variantId
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, newItem] };
        }),

      removeItem: (variantId) =>
        set((state) => ({ items: state.items.filter(i => i.variantId !== variantId) })),

      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter(i => i.variantId !== variantId)
            : state.items.map(i => i.variantId === variantId ? { ...i, quantity } : i),
        })),

      clearCart: () => set({ items: [], cupom: null, cupomErro: '', frete: null }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      aplicarCupom: (codigo) => {
        const found = CUPONS.find(c => c.codigo === codigo.trim().toUpperCase());
        if (!found) {
          set({ cupomErro: 'Cupom inválido ou expirado.', cupom: null });
        } else {
          set({ cupom: found, cupomErro: '' });
        }
      },

      removerCupom: () => set({ cupom: null, cupomErro: '' }),

      setFrete: (frete) => set({ frete }),
      setMetodoPagamento: (id) => set({ metodoPagamento: id }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      descontoCupom: () => {
        const { cupom, subtotal } = get();
        if (!cupom || cupom.tipo !== 'percentual') return 0;
        return Math.round(subtotal() * (cupom.valor / 100));
      },

      freteValor: () => {
        const { cupom, frete } = get();
        if (!frete) return 0;
        if (cupom?.tipo === 'frete_gratis') return 0;
        return frete.valor;
      },

      descontoMetodo: () => {
        const { metodoPagamento, subtotal, descontoCupom } = get();
        const base = subtotal() - descontoCupom();
        return calcularDescontoMetodo(base, metodoPagamento);
      },

      totalFinal: () => {
        const { subtotal, descontoCupom, freteValor, descontoMetodo } = get();
        return subtotal() - descontoCupom() + freteValor() - descontoMetodo();
      },
    }),
    { name: 'valwatt-premium-cart' }
  )
);
