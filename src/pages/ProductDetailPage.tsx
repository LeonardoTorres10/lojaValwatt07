import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, RotateCcw, Shield, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { getByHandle, getByType } from '../data/mockProducts';
import { formatPrice, calcDiscount } from '../lib/utils';
import { useSEO } from '../hooks/useSEO';
import { useCartStore } from '../store/cartStore';
import ProductGrid from '../components/product/ProductGrid';

const reviews = [
  { name: 'Paulo R.', rating: 5, text: 'Produto de ótima qualidade, chegou bem embalado e dentro do prazo. Recomendo!' },
  { name: 'Carla M.', rating: 4, text: 'Bom produto, compatível com o que foi descrito. Entrega rápida.' },
  { name: 'Eduardo S.', rating: 5, text: 'Excelente! Comprei para uso profissional e ficou perfeito. Voltarei a comprar.' },
];

export default function ProductDetailPage() {
  const { handle = '' } = useParams();
  const navigate = useNavigate();
  const product = getByHandle(handle);
  const { addItem, openCart } = useCartStore();
  useSEO({ title: product?.title, description: product?.description, image: product?.images[0] });

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [adding, setAdding] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-3xl font-display font-bold text-cinza-700 mb-4">Produto não encontrado</p>
        <Link to="/produtos" className="bg-amarelo-500 text-azul-900 font-bold px-6 py-3 rounded-xl hover:bg-amarelo-600 transition-colors inline-block">
          Ver todos os produtos
        </Link>
      </div>
    );
  }

  const discount = product.compareAtPrice ? calcDiscount(product.price, product.compareAtPrice) : null;
  const related = getByType(product.productType).filter(p => p.id !== product.id).slice(0, 4);

  const handleAdd = async () => {
    setAdding(true);
    await new Promise(r => setTimeout(r, 300));
    addItem({
      variantId: product.variantId,
      productId: product.id,
      title: product.title,
      variantTitle: 'Padrão',
      price: product.price,
      image: product.images[0] ?? '',
      quantity: qty,
    });
    openCart();
    toast.success(`${product.title} adicionado ao carrinho!`);
    setAdding(false);
  };

  return (
    <div>
      {/* Hero breadcrumb */}
      <div className="bg-gradient-azul py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-white/60 flex gap-2 mb-2">
            <Link to="/" className="hover:text-white">Início</Link><span>/</span>
            <Link to="/produtos" className="hover:text-white">Produtos</Link><span>/</span>
            <span className="text-white truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14">
          {/* Gallery */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-cinza-50 border border-cinza-200 mb-3" style={{ height: '480px' }}>
              {discount && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white font-bold text-sm px-3 py-1.5 rounded-lg">
                  −{discount}%
                </div>
              )}
              <img src={product.images[activeImg]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${i === activeImg ? 'border-azul-600' : 'border-cinza-200'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex gap-2 mb-3">
              <span className="bg-azul-50 text-azul-700 text-xs font-bold px-2.5 py-1 rounded-full">{product.vendor}</span>
              <span className="bg-cinza-100 text-cinza-700 text-xs px-2.5 py-1 rounded-full">{product.productType}</span>
            </div>

            <h1 className="font-display font-black text-azul-800 text-4xl mb-3 leading-tight">{product.title}</h1>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex">{[1,2,3,4,5].map(s => <span key={s} className={`text-lg ${s <= Math.round(product.rating) ? 'text-amarelo-500' : 'text-cinza-200'}`}>★</span>)}</div>
              <span className="text-cinza-700 text-sm">({product.reviewCount} avaliações)</span>
            </div>

            <div className="bg-azul-50 border border-azul-100 rounded-2xl p-5 mb-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-black text-azul-800 text-4xl">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-cinza-700 line-through text-lg">{formatPrice(product.compareAtPrice)}</span>
                )}
                {discount && <span className="bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-lg">−{discount}%</span>}
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-green-600" />
                <span className="text-green-700 font-semibold text-sm">
                  {formatPrice(product.price * 0.95)} no Pix (5% de desconto)
                </span>
              </div>
            </div>

            {/* Specs preview */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {product.specs.map((s, i) => (
                <div key={i} className={`p-3 rounded-xl text-sm ${i % 2 === 0 ? 'bg-cinza-50' : 'bg-white border border-cinza-200'}`}>
                  <span className="text-cinza-700">{s.label}: </span>
                  <span className="font-bold text-azul-800">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="font-semibold text-cinza-800 text-sm">Quantidade:</span>
              <div className="flex items-center border border-cinza-200 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2.5 hover:bg-cinza-100 font-bold text-lg text-azul-800">−</button>
                <span className="px-5 font-bold text-azul-800">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-2.5 hover:bg-cinza-100 font-bold text-lg text-azul-800">+</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button onClick={handleAdd} disabled={adding}
                className="flex-1 flex items-center justify-center gap-2 bg-amarelo-500 text-azul-900 font-bold py-3.5 rounded-xl hover:bg-amarelo-600 transition-all shadow-amarelo disabled:opacity-70">
                {adding ? <span className="w-5 h-5 border-2 border-azul-800 border-t-transparent rounded-full animate-spin" /> : <ShoppingCart size={18} />}
                {adding ? 'Adicionando...' : 'Adicionar ao Carrinho'}
              </button>
              <button onClick={() => { handleAdd(); navigate('/carrinho'); }}
                className="flex-1 bg-azul-800 text-white font-bold py-3.5 rounded-xl hover:bg-azul-900 transition-all shadow-azul">
                Comprar Agora
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-cinza-700">
              <div className="flex items-center gap-1.5"><Truck size={14} className="text-azul-600" />Entrega em 24h para Ourinhos</div>
              <div className="flex items-center gap-1.5"><Shield size={14} className="text-azul-600" />Compra 100% segura</div>
              <div className="flex items-center gap-1.5"><RotateCcw size={14} className="text-azul-600" />Troca em 7 dias</div>
            </div>

            <a href="https://wa.me/5515999990000" target="_blank" rel="noopener noreferrer"
              className="mt-5 flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 font-semibold text-sm px-4 py-3 rounded-xl hover:bg-green-100 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Dúvida sobre este produto? Fale no WhatsApp
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-14">
          <div className="flex border-b border-cinza-200 mb-6 gap-1">
            {([['desc','Descrição'],['specs','Especificações'],['reviews','Avaliações']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setTab(key as typeof tab)}
                className={`px-6 py-3 font-semibold text-sm border-b-2 -mb-px transition-colors ${tab === key ? 'border-azul-600 text-azul-800' : 'border-transparent text-cinza-700 hover:text-azul-800'}`}>
                {label}
              </button>
            ))}
          </div>

          {tab === 'desc' && (
            <p className="text-cinza-800 leading-relaxed max-w-3xl">{product.description}</p>
          )}
          {tab === 'specs' && (
            <div className="overflow-hidden rounded-xl border border-cinza-200 max-w-xl">
              {product.specs.map((s, i) => (
                <div key={i} className={`flex text-sm ${i % 2 === 0 ? 'bg-cinza-50' : 'bg-white'} border-b border-cinza-100 last:border-0`}>
                  <span className="px-4 py-3 font-semibold text-cinza-700 w-40">{s.label}</span>
                  <span className="px-4 py-3 text-azul-800 font-bold">{s.value}</span>
                </div>
              ))}
            </div>
          )}
          {tab === 'reviews' && (
            <div className="space-y-4 max-w-2xl">
              {reviews.map((r, i) => (
                <div key={i} className="bg-white border border-cinza-200 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-azul-800 text-white flex items-center justify-center font-bold text-sm">{r.name[0]}</div>
                    <div>
                      <p className="font-bold text-azul-800 text-sm">{r.name}</p>
                      <div className="flex">{[1,2,3,4,5].map(s => <span key={s} className={`text-sm ${s <= r.rating ? 'text-amarelo-500' : 'text-cinza-200'}`}>★</span>)}</div>
                    </div>
                  </div>
                  <p className="text-cinza-700 text-sm">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display font-black text-azul-800 text-2xl mb-6">Você também pode gostar</h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  );
}
