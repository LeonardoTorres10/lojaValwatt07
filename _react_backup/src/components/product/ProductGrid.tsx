import type { MockProduct } from '../../data/mockProducts';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

interface Props { products?: MockProduct[]; loading?: boolean; cols?: 3 | 4; }

export default function ProductGrid({ products, loading, cols = 4 }: Props) {
  const gridClass = cols === 3
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5';

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-16 text-cinza-700">
        <div className="text-5xl mb-3">📦</div>
        <p className="font-display font-bold text-xl">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
    </div>
  );
}
