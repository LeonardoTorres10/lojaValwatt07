import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useCheckout } from '../hooks/useCheckout';

export default function CheckoutPage() {
  const { items } = useCartStore();
  const checkout = useCheckout();

  useEffect(() => {
    if (items.length > 0 && !checkout.isPending && !checkout.isError) {
      checkout.mutate(items);
    }
  }, []);

  if (checkout.isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">❌</div>
        <h2 className="font-display font-bold text-2xl text-red-500 mb-3">Erro ao criar checkout</h2>
        <p className="text-gray-500 mb-6">{checkout.error?.message}</p>
        <Link to="/carrinho" className="bg-amarelo text-azul-escuro font-bold px-8 py-3 rounded-lg hover:bg-amarelo-escuro transition-colors inline-block">
          Voltar ao Carrinho
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="animate-spin text-5xl mb-6 inline-block">⚡</div>
      <h2 className="font-display font-bold text-2xl text-azul-escuro mb-3">Preparando seu checkout...</h2>
      <p className="text-gray-500">Você será redirecionado para o pagamento seguro em instantes.</p>
    </div>
  );
}
