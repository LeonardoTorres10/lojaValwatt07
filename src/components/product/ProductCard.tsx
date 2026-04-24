import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import type { MockProduct } from '../../data/mockProducts';
import { formatPrice, calcDiscount } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';

const badgeConfig = {
  'mais-vendido': { label: 'MAIS VENDIDO', className: 'bg-azul-800 text-white' },
  'oferta':       { label: 'OFERTA',        className: 'bg-red-500 text-white' },
  'novo':         { label: 'NOVO',          className: 'bg-emerald-500 text-white' },
  'exclusivo':    { label: 'EXCLUSIVO',     className: 'bg-purple-600 text-white' },
};

interface Props { product: MockProduct; index?: number; }

export default function ProductCard({ product, index = 0 }: Props) {
  const navigate = useNavigate();
  const { addItem, openCart } = useCartStore();
  const [adding, setAdding] = useState(false);
  const [hovered, setHovered] = useState(false);

  const discount = product.compareAtPrice ? calcDiscount(product.price, product.compareAtPrice) : null;
  const image = product.images[0];

  const handleAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdding(true);
    await new Promise(r => setTimeout(r, 300));
    addItem({
      variantId: product.variantId,
      productId: product.id,
      title: product.title,
      variantTitle: 'Padrão',
      price: product.price,
      image: image ?? '',
      quantity: 1,
    });
    openCart();
    toast.success(`${product.title} adicionado!`, {
      description: formatPrice(product.price),
    });
    setAdding(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-white rounded-2xl shadow-card border border-cinza-200 overflow-hidden cursor-pointer group"
      style={{ transition: 'box-shadow 0.3s, transform 0.3s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/produtos/${product.handle}`)}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(13,59,140,0.20)' }}
    >
      {/* Image */}
      <div className="relative h-56 img-zoom bg-cinza-50">
        {image ? (
          <img src={image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl text-azul-100">⚡</div>
        )}

        {/* Badge type */}
        {product.badge && (
          <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-1 rounded-md ${badgeConfig[product.badge].className}`}>
            {badgeConfig[product.badge].label}
          </span>
        )}

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-2.5 right-2.5 bg-amarelo-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
            −{discount}%
          </span>
        )}

        {/* Hover overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-azul-900/30 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            className="flex items-center gap-2 bg-white text-azul-800 font-semibold text-sm px-4 py-2 rounded-full shadow-lg"
          >
            <Eye size={15} />
            Ver detalhes
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-azul-50 text-azul-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{product.vendor}</span>
          <span className="text-cinza-700 text-[10px]">{product.productType}</span>
        </div>

        <h3 className="font-display font-bold text-azul-800 text-[17px] leading-snug line-clamp-2 mb-1.5 group-hover:text-azul-600 transition-colors">
          {product.title}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex">
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="13" height="13" viewBox="0 0 24 24"
                fill={i <= Math.round(product.rating) ? '#F5C518' : 'none'}
                stroke={i <= Math.round(product.rating) ? '#F5C518' : '#CBD5E1'}
                strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-cinza-700 text-xs">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-bold text-azul-800 text-xl">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-cinza-700 line-through text-sm">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
        <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-3">
          5% OFF no Pix
        </span>

        <button
          onClick={handleAdd}
          disabled={adding}
          className="w-full flex items-center justify-center gap-2 bg-amarelo-500 text-azul-900 font-bold text-sm py-2.5 rounded-[10px] hover:bg-azul-800 hover:text-white transition-all duration-300 disabled:opacity-70"
        >
          {adding ? (
            <span className="w-4 h-4 border-2 border-azul-800 border-t-transparent rounded-full animate-spin" />
          ) : (
            <ShoppingCart size={16} />
          )}
          {adding ? 'Adicionando...' : 'Adicionar ao Carrinho'}
        </button>
      </div>
    </motion.div>
  );
}
