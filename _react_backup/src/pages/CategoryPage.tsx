import { useParams, Link } from 'react-router-dom';
import { getByType, getOffers } from '../data/mockProducts';
import ProductGrid from '../components/product/ProductGrid';

const meta: Record<string, { label: string; icon: string; img: string }> = {
  eletrico:    { label: 'Materiais Elétricos',   icon: '⚡', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80' },
  hidraulico:  { label: 'Materiais Hidráulicos', icon: '🚿', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80' },
  iluminacao:  { label: 'Iluminação',            icon: '💡', img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80' },
  ferramentas: { label: 'Ferramentas',           icon: '🔧', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=80' },
  ofertas:     { label: 'Ofertas da Semana',     icon: '🏷️', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80' },
};

const typeMap: Record<string, string> = {
  eletrico: 'Elétrico', hidraulico: 'Hidráulico', iluminacao: 'Iluminação', ferramentas: 'Ferramenta',
};

export default function CategoryPage() {
  const { slug = '' } = useParams();
  const info = meta[slug] ?? { label: slug, icon: '📦', img: '' };
  const products = slug === 'ofertas' ? getOffers() : getByType(typeMap[slug] ?? '');

  return (
    <div>
      {/* Hero banner */}
      <div className="relative h-56 overflow-hidden">
        {info.img && <img src={info.img} alt={info.label} className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <nav className="text-sm text-white/60 flex gap-2 mb-2">
            <Link to="/" className="hover:text-white">Início</Link>
            <span>/</span>
            <span className="text-white">{info.label}</span>
          </nav>
          <h1 className="font-display font-black text-white text-4xl">
            {info.icon} {info.label}
          </h1>
          <p className="text-white/70 mt-1">{products.length} produtos encontrados</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
