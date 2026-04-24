import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ShoppingCart, Lock, Shield, Truck, Tag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/utils';
import { buscarCEP, calcularFrete } from '../lib/cep';
import type { OpcaoFrete } from '../lib/cep';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { useSEO } from '../hooks/useSEO';
import { maskCEP } from '../lib/utils';

export default function CartPage() {
  useSEO({ title: 'Meu Carrinho' });
  const navigate = useNavigate();
  const {
    items, removeItem, updateQuantity, totalItems, subtotal,
    descontoCupom, freteValor, descontoMetodo, totalFinal,
    cupom, cupomErro, aplicarCupom, removerCupom,
    frete, setFrete,
  } = useCartStore();

  const [cepInput, setCepInput] = useState('');
  const [cepErro, setCepErro] = useState('');
  const [opcoesFretes, setOpcoesFretes] = useState<OpcaoFrete[]>([]);
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [cupomInput, setCupomInput] = useState('');
  const [confirmItem, setConfirmItem] = useState<string | null>(null);

  const count = totalItems();

  const calcularFreteHandler = async () => {
    const digits = cepInput.replace(/\D/g, '');
    if (digits.length !== 8) { setCepErro('CEP inválido'); return; }
    setCarregandoCep(true);
    setCepErro('');
    try {
      const end = await buscarCEP(digits);
      const opcoes = calcularFrete(end.uf, subtotal());
      setOpcoesFretes(opcoes);
      setFrete(opcoes[0]);
    } catch {
      setCepErro('CEP não encontrado');
    } finally {
      setCarregandoCep(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <ShoppingCart size={72} className="mx-auto text-cinza-200 mb-5" />
        <h2 className="font-display font-black text-3xl text-cinza-700 mb-4">Seu carrinho está vazio</h2>
        <p className="text-cinza-700 mb-8">Adicione produtos e volte aqui para finalizar sua compra.</p>
        <Link to="/produtos" className="bg-amarelo-500 text-azul-900 font-bold px-10 py-3.5 rounded-xl hover:bg-amarelo-600 transition-colors text-lg inline-block shadow-amarelo">
          Ver Produtos
        </Link>
      </div>
    );
  }

  const sub = subtotal();
  const descCupom = descontoCupom();
  const freteVal = freteValor();
  const descMetodo = descontoMetodo();
  const total = totalFinal();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-display font-black text-azul-800 text-3xl mb-8">
        Meu Carrinho ({count} {count === 1 ? 'item' : 'itens'})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-card border border-cinza-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-cinza-50 border-b border-cinza-200">
                <tr>
                  <th className="text-left px-5 py-4 text-sm font-bold text-cinza-700">Produto</th>
                  <th className="text-center px-4 py-4 text-sm font-bold text-cinza-700 hidden sm:table-cell">Preço</th>
                  <th className="text-center px-4 py-4 text-sm font-bold text-cinza-700">Qtd</th>
                  <th className="text-center px-4 py-4 text-sm font-bold text-cinza-700 hidden sm:table-cell">Total</th>
                  <th className="px-3 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-cinza-100">
                {items.map(item => (
                  <tr key={item.variantId} className="hover:bg-cinza-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title}
                          className="w-16 h-16 object-cover rounded-xl bg-cinza-100 shrink-0"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div>
                          <p className="font-bold text-azul-800 text-sm line-clamp-2">{item.title}</p>
                          <p className="text-xs text-cinza-700 mt-0.5">{item.variantTitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-cinza-700 hidden sm:table-cell">
                      {formatPrice(item.price)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => {
                          if (item.quantity === 1) setConfirmItem(item.variantId);
                          else updateQuantity(item.variantId, item.quantity - 1);
                        }}
                          className="w-8 h-8 rounded-lg border border-cinza-200 flex items-center justify-center hover:bg-cinza-100">
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm text-azul-800">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-cinza-200 flex items-center justify-center hover:bg-cinza-100">
                          <Plus size={13} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center font-black text-azul-800 text-sm hidden sm:table-cell">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                    <td className="px-3 py-4">
                      <button onClick={() => setConfirmItem(item.variantId)}
                        className="text-cinza-700 hover:text-red-500 transition-colors p-1">
                        <X size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl shadow-card border border-cinza-200 p-6 sticky top-28 space-y-5">
            <h3 className="font-display font-bold text-azul-800 text-xl">Resumo do Pedido</h3>

            {/* CEP / Frete */}
            <div>
              <label className="text-sm font-semibold text-cinza-700 block mb-1.5 flex items-center gap-1.5">
                <Truck size={14} /> Calcular Frete
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  value={cepInput}
                  onChange={e => setCepInput(maskCEP(e.target.value))}
                  placeholder="00000-000"
                  maxLength={9}
                  className="flex-1 border border-cinza-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-azul-500"
                />
                <button
                  onClick={calcularFreteHandler}
                  disabled={carregandoCep}
                  className="bg-azul-100 text-azul-800 font-semibold text-sm px-3 py-2 rounded-xl hover:bg-azul-200 transition-colors disabled:opacity-60"
                >
                  {carregandoCep ? '...' : 'OK'}
                </button>
              </div>
              {cepErro && <p className="text-red-500 text-xs">{cepErro}</p>}
              {opcoesFretes.length > 0 && (
                <div className="space-y-2 mt-2">
                  {opcoesFretes.map(op => (
                    <label key={op.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${frete?.id === op.id ? 'border-azul-500 bg-azul-50' : 'border-cinza-200'}`}>
                      <input type="radio" name="frete" checked={frete?.id === op.id} onChange={() => setFrete(op)} className="accent-azul-600" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-azul-800 text-xs">{op.nome}</p>
                        <p className="text-xs text-cinza-700">{op.prazo}</p>
                      </div>
                      <span className="font-bold text-sm text-azul-800 shrink-0">
                        {op.valor === 0 ? 'Grátis' : formatPrice(op.valor)}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Cupom */}
            <div>
              <label className="text-sm font-semibold text-cinza-700 block mb-1.5 flex items-center gap-1.5">
                <Tag size={14} /> Cupom de Desconto
              </label>
              {cupom ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                  <span className="text-green-700 font-bold text-sm">{cupom.codigo}</span>
                  <button onClick={removerCupom} className="text-green-600 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      value={cupomInput}
                      onChange={e => setCupomInput(e.target.value.toUpperCase())}
                      placeholder="VALWATT10"
                      className="flex-1 border border-cinza-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-azul-500"
                    />
                    <button
                      onClick={() => aplicarCupom(cupomInput)}
                      className="bg-azul-100 text-azul-800 font-semibold text-sm px-3 py-2 rounded-xl hover:bg-azul-200 transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                  {cupomErro && <p className="text-red-500 text-xs mt-1">{cupomErro}</p>}
                </>
              )}
            </div>

            {/* Totals */}
            <div className="border-t border-cinza-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-cinza-700">
                <span>Subtotal ({count} itens)</span>
                <span>{formatPrice(sub)}</span>
              </div>
              {descCupom > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto cupom ({cupom?.valor}%)</span>
                  <span>−{formatPrice(descCupom)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-cinza-700">
                <span>Frete</span>
                <span className={freteVal === 0 && frete ? 'text-green-600 font-semibold' : ''}>
                  {frete ? (freteVal === 0 ? 'Grátis' : formatPrice(freteVal)) : 'A calcular'}
                </span>
              </div>
              {descMetodo > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto do pagamento</span>
                  <span>−{formatPrice(descMetodo)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-cinza-100">
                <span className="font-bold text-azul-800">Total</span>
                <span className="font-black text-azul-800 text-2xl">{formatPrice(total)}</span>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2 text-center">
                <span className="text-green-700 font-semibold text-sm">
                  Pagando no Pix: {formatPrice(total * 0.95)} (5% OFF extra)
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-amarelo-500 text-azul-900 font-bold py-3.5 rounded-xl hover:bg-amarelo-600 transition-colors shadow-amarelo text-lg"
            >
              Finalizar Compra
            </button>
            <Link to="/produtos" className="block text-center text-azul-600 text-sm hover:underline">
              Continuar Comprando
            </Link>
            <div className="flex justify-center gap-4 text-xs text-cinza-700">
              <span className="flex items-center gap-1"><Lock size={12} /> Pagamento Seguro</span>
              <span className="flex items-center gap-1"><Shield size={12} /> Compra Garantida</span>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmItem}
        onOpenChange={(open) => { if (!open) setConfirmItem(null); }}
        title="Remover item"
        description="Deseja remover este produto do carrinho?"
        confirmLabel="Remover"
        destructive
        onConfirm={() => { if (confirmItem) removeItem(confirmItem); setConfirmItem(null); }}
      />
    </div>
  );
}
