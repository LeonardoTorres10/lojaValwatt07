import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import type { ShopifyProduct } from '../../types/shopify';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../lib/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem, openCart } = useCartStore();

  const image = product.images.edges[0]?.node;
  const price = Number(product.priceRange.minVariantPrice.amount);
  const comparePrice = Number(product.compareAtPriceRange.minVariantPrice.amount);
  const hasDiscount = comparePrice > price && comparePrice > 0;
  const firstVariant = product.variants.edges[0]?.node;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!firstVariant) return;
    addItem({
      variantId: firstVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: firstVariant.title,
      price,
      image: image?.url ?? '',
      quantity: 1,
    });
    openCart();
    toast.success('Produto adicionado ao carrinho!');
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-md border border-cinza-borda"
      onClick={() => navigate(`/produtos/${product.handle}`)}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden bg-gray-50">
        {image ? (
          <img src={image.url} alt={image.altText ?? product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">⚡</div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            OFERTA
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-bold text-azul-escuro text-base leading-snug line-clamp-2 mb-2">
          {product.title}
        </h3>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-azul-escuro font-bold text-lg">{formatPrice(price)}</span>
          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm">{formatPrice(comparePrice)}</span>
          )}
        </div>

        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded mb-3">
          5% OFF no Pix
        </span>

        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 bg-amarelo text-azul-escuro font-semibold text-sm py-2.5 rounded-lg hover:bg-azul-escuro hover:text-white transition-colors"
        >
          <ShoppingCart size={16} />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
