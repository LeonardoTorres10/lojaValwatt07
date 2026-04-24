import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useCheckout } from '../hooks/useCheckout';
import { formatPrice } from '../lib/shopify';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const checkout = useCheckout();
  const [coupon, setCoupon] = useState('');
  const [cep, setCep] = useState('');

  const total = totalPrice();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-200 mb-4" />
        <h2 className="font-display font-bold text-2xl text-gray-400 mb-4">Seu carrinho está vazio</h2>
        <Link to="/produtos" className="bg-amarelo text-azul-escuro font-bold px-8 py-3 rounded-lg hover:bg-amarelo-escuro transition-colors inline-block">
          Ver Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display font-bold text-3xl text-azul-escuro mb-8">Meu Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-cinza-borda overflow-hidden">
            <table className="w-full">
              <thead className="bg-cinza-fundo border-b border-cinza-borda">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Produto</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Preço</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">Qtd</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Total</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-cinza-borda">
                {items.map(item => (
                  <tr key={item.variantId}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-lg bg-gray-100 shrink-0" />
                        <div>
                          <p className="font-semibold text-azul-escuro text-sm line-clamp-2">{item.title}</p>
                          {item.variantTitle !== 'Default Title' && (
                            <p className="text-xs text-gray-500">{item.variantTitle}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-600 hidden sm:table-cell">
                      {formatPrice(item.price)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                          <Plus size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center font-bold text-azul-escuro text-sm hidden sm:table-cell">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                    <td className="px-4 py-4">
                      <button onClick={() => removeItem(item.variantId)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-cinza-borda p-5">
            <h3 className="font-display font-bold text-azul-escuro text-xl mb-4">Resumo</h3>

            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Calcular Frete</label>
              <div className="flex gap-2">
                <input
                  value={cep}
                  onChange={e => setCep(e.target.value)}
                  placeholder="00000-000"
                  className="flex-1 border border-cinza-borda rounded-lg px-3 py-2 text-sm outline-none focus:border-azul-medio"
                />
                <button className="bg-azul-claro text-azul-escuro font-semibold text-sm px-3 py-2 rounded-lg hover:bg-azul-medio hover:text-white transition-colors">
                  OK
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Cupom de Desconto</label>
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder="CUPOM10"
                  className="flex-1 border border-cinza-borda rounded-lg px-3 py-2 text-sm outline-none focus:border-azul-medio"
                />
                <button className="bg-azul-claro text-azul-escuro font-semibold text-sm px-3 py-2 rounded-lg hover:bg-azul-medio hover:text-white transition-colors">
                  Aplicar
                </button>
              </div>
            </div>

            <div className="border-t border-cinza-borda pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-600">Total</span>
                <span className="font-bold text-azul-escuro text-2xl">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => checkout.mutate(items)}
              disabled={checkout.isPending}
              className="w-full bg-amarelo text-azul-escuro font-bold py-3 rounded-lg hover:bg-amarelo-escuro transition-colors disabled:opacity-60 mb-3"
            >
              {checkout.isPending ? 'Redirecionando...' : 'Finalizar Compra'}
            </button>

            <Link to="/produtos" className="block text-center text-azul-medio text-sm hover:underline">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
