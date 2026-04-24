import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';

const categoryMeta: Record<string, { label: string; icon: string }> = {
  eletrico: { label: 'Materiais Elétricos', icon: '⚡' },
  hidraulico: { label: 'Materiais Hidráulicos', icon: '🚿' },
  iluminacao: { label: 'Iluminação', icon: '💡' },
  ferramentas: { label: 'Ferramentas', icon: '🔧' },
  ofertas: { label: 'Ofertas', icon: '🏷️' },
};

export default function CategoryPage() {
  const { slug = '' } = useParams();
  const meta = categoryMeta[slug] ?? { label: slug, icon: '📦' };

  const isOffers = slug === 'ofertas';
  const query = isOffers ? 'compare_at_price:>0' : `product_type:${meta.label}`;

  const { data, isLoading } = useProducts({ first: 12, query });
  const products = data?.edges.map(e => e.node) ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-5 flex items-center gap-2">
        <Link to="/" className="hover:text-azul-medio">Início</Link>
        <span>/</span>
        <span className="text-azul-escuro font-medium">{meta.label}</span>
      </nav>

      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">{meta.icon}</span>
        <h1 className="font-display font-bold text-3xl text-azul-escuro">{meta.label}</h1>
      </div>

      <ProductGrid products={products} loading={isLoading} />
    </div>
  );
}
