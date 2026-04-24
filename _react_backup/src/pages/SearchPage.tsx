import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import ProductGrid from '../components/product/ProductGrid';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const [input, setInput] = useState(q);

  useEffect(() => { setInput(q); }, [q]);

  const results = useMemo(() => {
    if (!q) return mockProducts;
    const lower = q.toLowerCase();
    return mockProducts.filter(p =>
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.vendor.toLowerCase().includes(lower) ||
      p.productType.toLowerCase().includes(lower)
    );
  }, [q]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) setSearchParams({ q: input.trim() });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <form onSubmit={handleSearch} className="mb-10">
        <div className="flex border-2 border-azul-600 rounded-2xl overflow-hidden max-w-2xl mx-auto shadow-azul">
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder="Buscar produtos, marcas, categorias..."
            className="flex-1 px-6 py-4 text-lg outline-none" />
          <button type="submit" className="bg-azul-600 px-7 flex items-center text-white hover:bg-azul-800 transition-colors">
            <Search size={24} />
          </button>
        </div>
      </form>

      {q && (
        <h2 className="font-display font-bold text-2xl text-azul-800 mb-6">
          {results.length > 0 ? `${results.length} resultado${results.length !== 1 ? 's' : ''} para:` : 'Nenhum resultado para:'}{' '}
          <span className="text-azul-600">"{q}"</span>
        </h2>
      )}

      {!q && <p className="text-cinza-700 text-center mb-8">Digite algo para buscar produtos.</p>}

      <ProductGrid products={results} />
    </div>
  );
}
