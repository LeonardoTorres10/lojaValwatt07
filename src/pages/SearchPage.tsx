import { useState, useEffect, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const [input, setInput] = useState(q);

  useEffect(() => { setInput(q); }, [q]);

  const { data, isLoading } = useProducts({ first: 12, query: q ? `title:*${q}* OR tag:${q}` : undefined });
  const products = data?.edges.map(e => e.node) ?? [];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) setSearchParams({ q: input.trim() });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex border-2 border-azul-medio rounded-xl overflow-hidden max-w-2xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Buscar produtos..."
            className="flex-1 px-5 py-4 text-lg outline-none"
          />
          <button type="submit" className="bg-azul-medio px-6 flex items-center text-white hover:bg-azul-escuro transition-colors">
            <Search size={22} />
          </button>
        </div>
      </form>

      {q && (
        <h2 className="font-display font-bold text-2xl text-azul-escuro mb-5">
          Resultados para: <span className="text-azul-medio">"{q}"</span>
        </h2>
      )}

      {!isLoading && !products.length && q ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-3">🔍</div>
          <p className="font-semibold text-lg">Nenhum resultado para "{q}"</p>
          <p className="text-sm mt-2">Tente palavras-chave diferentes ou navegue pelas categorias.</p>
        </div>
      ) : (
        <ProductGrid products={products} loading={isLoading} />
      )}
    </div>
  );
}
