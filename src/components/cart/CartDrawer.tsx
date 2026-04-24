import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useCheckout } from '../../hooks/useCheckout';
import { formatPrice } from '../../lib/shopify';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const checkout = useCheckout();

  if (!isOpen) return null;

  const total = totalPrice();

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-azul-escuro text-white">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} />
            <span className="font-display font-bold text-lg">Meu Carrinho</span>
          </div>
          <button onClick={closeCart} className="hover:text-amarelo transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500">
              <ShoppingCart size={48} className="text-gray-300" />
              <p className="font-semibold">Seu carrinho está vazio</p>
              <Link
                to="/produtos"
                onClick={closeCart}
                className="bg-amarelo text-azul-escuro font-bold px-6 py-2 rounded-lg hover:bg-amarelo-escuro transition-colors"
              >
                Ver Produtos
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.variantId} className="flex gap-3 border-b pb-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg bg-gray-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-azul-escuro line-clamp-2">{item.title}</p>
                    {item.variantTitle !== 'Default Title' && (
                      <p className="text-xs text-gray-500">{item.variantTitle}</p>
                    )}
                    <p className="text-azul-escuro font-bold mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-gray-400 hover:text-red-500 transition-colors self-start mt-1"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t bg-cinza-fundo space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">Subtotal</span>
              <span className="font-bold text-azul-escuro text-lg">{formatPrice(total)}</span>
            </div>
            <button
              onClick={() => checkout.mutate(items)}
              disabled={checkout.isPending}
              className="w-full bg-amarelo text-azul-escuro font-bold py-3 rounded-lg hover:bg-amarelo-escuro transition-colors disabled:opacity-60"
            >
              {checkout.isPending ? 'Redirecionando...' : 'Finalizar Compra'}
            </button>
            <button
              onClick={closeCart}
              className="w-full border-2 border-azul-escuro text-azul-escuro font-semibold py-2.5 rounded-lg hover:bg-azul-claro transition-colors"
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
