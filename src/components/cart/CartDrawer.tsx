import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../lib/utils';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCartStore();
  const total = subtotal();
  const count = totalItems();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-azul-800 text-white">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} />
                <span className="font-display font-bold text-lg">Meu Carrinho ({count})</span>
              </div>
              <button onClick={closeCart} className="hover:text-amarelo-500 transition-colors">
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-cinza-700">
                  <ShoppingCart size={56} className="text-cinza-200" />
                  <p className="font-display font-bold text-xl">Carrinho vazio</p>
                  <button onClick={closeCart} className="bg-amarelo-500 text-azul-900 font-bold px-6 py-2.5 rounded-xl hover:bg-amarelo-600 transition-colors">
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map(item => (
                    <li key={item.variantId} className="flex gap-3 border-b border-cinza-100 pb-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-xl bg-cinza-100 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-azul-800 line-clamp-2">{item.title}</p>
                        <p className="font-bold text-azul-600 mt-0.5">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg border border-cinza-200 flex items-center justify-center hover:bg-cinza-100">
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg border border-cinza-200 flex items-center justify-center hover:bg-cinza-100">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.variantId)}
                        className="text-cinza-700 hover:text-red-500 transition-colors self-start mt-1">
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-cinza-100 bg-cinza-50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-cinza-800 font-semibold">Subtotal</span>
                  <span className="text-azul-800 font-black text-xl">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-cinza-700 text-center">💳 5% de desconto no Pix</p>
                <Link to="/carrinho" onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full border-2 border-azul-800 text-azul-800 font-bold py-2.5 rounded-xl hover:bg-azul-50 transition-colors">
                  Ver Carrinho
                </Link>
                <button
                  onClick={() => { closeCart(); navigate('/checkout'); }}
                  className="w-full flex items-center justify-center gap-2 bg-amarelo-500 text-azul-900 font-bold py-3 rounded-xl hover:bg-amarelo-600 transition-colors shadow-amarelo">
                  Finalizar Compra <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
