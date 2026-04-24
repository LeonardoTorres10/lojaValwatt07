import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/utils';

export default function PedidoConfirmadoPage() {
  useSEO({ title: 'Pedido Confirmado' });
  const cleared = useRef(false);
  const clearCart = useCartStore(s => s.clearCart);
  const location = useLocation();
  const state = location.state as { numeroPedido?: string; total?: number; metodo?: string } | null;

  const numeroPedido = state?.numeroPedido ?? `VW-${Math.floor(100000 + Math.random() * 900000)}`;
  const total = state?.total ?? 0;
  const metodo = state?.metodo ?? 'credito';

  useEffect(() => {
    if (!cleared.current) {
      clearCart();
      cleared.current = true;
    }
  }, [clearCart]);

  const mensagens: Record<string, string> = {
    pix: 'Seu pagamento Pix foi identificado. O pedido será processado em instantes.',
    boleto: 'Boleto gerado com sucesso. O pagamento é confirmado em até 2 dias úteis.',
    credito: 'Pagamento no cartão aprovado com sucesso.',
    debito: 'Pagamento no débito aprovado com sucesso.',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle size={48} className="text-green-500" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h1 className="font-display font-black text-azul-800 text-4xl mb-3">Pedido Confirmado!</h1>
        <p className="text-cinza-700 mb-2">{mensagens[metodo]}</p>
        <div className="inline-block bg-azul-50 border border-azul-200 rounded-xl px-5 py-2 mb-8">
          <span className="text-cinza-700 text-sm">Número do pedido: </span>
          <span className="font-bold text-azul-800">#{numeroPedido}</span>
        </div>

        {total > 0 && (
          <p className="text-cinza-700 mb-8">
            Total pago: <span className="font-bold text-azul-800">{formatPrice(total)}</span>
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: CheckCircle, label: 'Pedido confirmado', cor: 'text-green-500' },
            { icon: Package, label: 'Em preparação', cor: 'text-amarelo-500' },
            { icon: Truck, label: 'Entrega a caminho', cor: 'text-cinza-300' },
          ].map(({ icon: Icon, label, cor }, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-cinza-50">
              <Icon size={28} className={cor} />
              <span className="text-xs font-semibold text-cinza-700">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/produtos" className="bg-amarelo-500 text-azul-900 font-bold px-8 py-3 rounded-xl hover:bg-amarelo-600 transition-colors">
            Continuar Comprando
          </Link>
          <a
            href="https://wa.me/5515999990000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={18} />
            Suporte via WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}
