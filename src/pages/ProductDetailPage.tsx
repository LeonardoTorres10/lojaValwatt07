import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useProduct } from '../hooks/useProduct';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '../store/cartStore';
import { useCheckout } from '../hooks/useCheckout';
import { formatPrice } from '../lib/shopify';
import type { ShopifyVariant } from '../types/shopify';
import ProductGrid from '../components/product/ProductGrid';
import StarRating from '../components/ui/StarRating';

export default function ProductDetailPage() {
  const { handle = '' } = useParams();
  const { data: product, isLoading } = useProduct(handle);
  const { addItem, openCart } = useCartStore();
  const checkout = useCheckout();

  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'desc' | 'delivery'>('desc');

  const related = useProducts({ first: 4, query: product?.productType ? `product_type:${product.productType}` : undefined });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-square bg-gray-200 rounded-xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl font-display font-bold text-gray-400">Produto não encontrado</p>
        <Link to="/produtos" className="mt-4 inline-block text-azul-medio underline">Ver todos os produtos</Link>
      </div>
    );
  }

  const images = product.images.edges.map(e => e.node);
  const variants = product.variants.edges.map(e => e.node);
  const variant = selectedVariant ?? variants[0];
  const price = Number(variant?.price?.amount ?? product.priceRange.minVariantPrice.amount);
  const comparePrice = Number(variant?.compareAtPrice?.amount ?? product.compareAtPriceRange.minVariantPrice.amount);
  const hasDiscount = comparePrice > price && comparePrice > 0;

  const handleAdd = () => {
    if (!variant) return;
    addItem({
      variantId: variant.id,
      productId: product.id,
      title: product.title,
      variantTitle: variant.title,
      price,
      image: images[0]?.url ?? '',
      quantity,
    });
    openCart();
    toast.success('Produto adicionado ao carrinho!');
  };

  const handleBuyNow = () => {
    if (!variant) return;
    checkout.mutate([{
      variantId: variant.id,
      productId: product.id,
      title: product.title,
      variantTitle: variant.title,
      price,
      image: images[0]?.url ?? '',
      quantity,
    }]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-azul-medio">Início</Link>
        <span>/</span>
        <Link to="/produtos" className="hover:text-azul-medio">Produtos</Link>
        <span>/</span>
        <span className="text-azul-escuro font-medium truncate">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Gallery */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-white border border-cinza-borda mb-3">
            {images[activeImage] ? (
              <img src={images[activeImage].url} alt={images[activeImage].altText ?? product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl text-gray-200">⚡</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${i === activeImage ? 'border-azul-medio' : 'border-cinza-borda'}`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="font-display font-bold text-azul-escuro text-3xl mb-2">{product.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={4.5} />
            <span className="text-sm text-gray-500">(4.5)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-azul-escuro font-bold text-3xl">{formatPrice(price)}</span>
            {hasDiscount && <span className="text-gray-400 line-through">{formatPrice(comparePrice)}</span>}
          </div>
          <div className="flex items-center gap-2 mb-5">
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
              <Zap size={10} className="inline" /> 5% OFF no Pix
            </span>
          </div>

          {/* Variants */}
          {variants.length > 1 && (
            <div className="mb-5">
              <p className="font-semibold text-sm text-gray-700 mb-2">Variação</p>
              <div className="flex flex-wrap gap-2">
                {variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={!v.availableForSale}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                      variant?.id === v.id
                        ? 'border-azul-medio bg-azul-claro text-azul-escuro'
                        : 'border-cinza-borda text-gray-600 hover:border-azul-medio'
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-semibold text-sm text-gray-700">Quantidade:</span>
            <div className="flex items-center gap-2 border border-cinza-borda rounded-lg overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 font-bold text-lg">-</button>
              <span className="px-4 font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 hover:bg-gray-100 font-bold text-lg">+</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 flex items-center justify-center gap-2 bg-amarelo text-azul-escuro font-bold py-3 rounded-lg hover:bg-amarelo-escuro transition-colors"
            >
              <ShoppingCart size={18} />
              Adicionar ao Carrinho
            </button>
            <button
              onClick={handleBuyNow}
              disabled={checkout.isPending}
              className="flex-1 bg-azul-escuro text-white font-bold py-3 rounded-lg hover:bg-azul-medio transition-colors disabled:opacity-60"
            >
              {checkout.isPending ? 'Aguarde...' : 'Comprar Agora'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <div className="flex border-b border-cinza-borda mb-6">
          {(['desc', 'delivery'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === tab ? 'border-azul-medio text-azul-medio' : 'border-transparent text-gray-500 hover:text-azul-escuro'
              }`}
            >
              {tab === 'desc' ? 'Descrição' : 'Entrega'}
            </button>
          ))}
        </div>

        {activeTab === 'desc' ? (
          <div
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml ?? `<p>${product.description}</p>` }}
          />
        ) : (
          <div className="bg-azul-claro rounded-xl p-6 text-azul-escuro">
            <h3 className="font-bold mb-3">Informações de Entrega</h3>
            <ul className="space-y-2 text-sm">
              <li>🚚 Entrega para Ourinhos/SP e região</li>
              <li>🏪 Retirada na loja: Rua das Indústrias, 450 — Ourinhos/SP</li>
              <li>📦 Prazo: 1 a 5 dias úteis</li>
              <li>📞 Dúvidas: (15) 99999-0000</li>
            </ul>
          </div>
        )}
      </div>

      {/* Related */}
      {related.data?.edges.length && (
        <div>
          <h2 className="font-display font-bold text-2xl text-azul-escuro mb-5">Produtos Relacionados</h2>
          <ProductGrid products={related.data.edges.map(e => e.node)} />
        </div>
      )}
    </div>
  );
}
