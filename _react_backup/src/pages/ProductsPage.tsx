import { useState, useMemo } from 'react';
import { mockProducts, getByType } from '../data/mockProducts';
import type { MockProduct } from '../data/mockProducts';
import ProductGrid from '../components/product/ProductGrid';

const categories = ['Todos', 'Elétrico', 'Hidráulico', 'Iluminação', 'Ferramenta'] as const;
type Cat = typeof categories[number];

export default function ProductsPage() {
  const [category, setCategory] = useState<Cat>('Todos');
  const [sort, setSort] = useState('relevancia');
  const [maxPrice, setMaxPrice] = useState(600);

  const filtered = useMemo(() => {
    let list: MockProduct[] = category === 'Todos' ? mockProducts : getByType(category);
    list = list.filter(p => p.price <= maxPrice);
    if (sort === 'price_asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, sort, maxPrice]);

  return (
    <div>
      {/* Banner */}
      <div className="bg-gradient-azul text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display font-black text-4xl">📦 TODOS OS PRODUTOS</h1>
          <p className="text-white/70 mt-1">Encontre tudo que sua obra precisa</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-5">
          <div className="bg-white rounded-2xl shadow-card border border-cinza-200 p-5">
            <h3 className="font-display font-bold text-azul-800 text-lg mb-4">Filtros</h3>

            <div className="mb-5">
              <h4 className="text-sm font-bold text-cinza-800 mb-3 uppercase tracking-wide">Categoria</h4>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm text-cinza-800 hover:text-azul-800">
                    <input type="radio" name="cat" value={cat} checked={category === cat}
                      onChange={() => setCategory(cat)} className="accent-azul-600" />
                    {cat === 'Todos' ? 'Todos os produtos' : cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h4 className="text-sm font-bold text-cinza-800 mb-3 uppercase tracking-wide">Preço máximo</h4>
              <input type="range" min="20" max="600" step="10" value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-azul-600" />
              <div className="flex justify-between text-xs text-cinza-700 mt-1">
                <span>R$ 20</span>
                <span className="font-bold text-azul-800">Até R$ {maxPrice}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-cinza-800 mb-3 uppercase tracking-wide">Ordenar</h4>
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="w-full border border-cinza-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-azul-500">
                <option value="relevancia">Relevância</option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
                <option value="rating">Mais Avaliados</option>
              </select>
            </div>

            <button onClick={() => { setCategory('Todos'); setSort('relevancia'); setMaxPrice(600); }}
              className="mt-4 w-full text-sm text-cinza-700 hover:text-red-500 underline text-center">
              Limpar filtros
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-azul-800 text-2xl">{category === 'Todos' ? 'Todos os Produtos' : category}</h2>
            <span className="text-cinza-700 text-sm bg-cinza-100 px-3 py-1 rounded-full">{filtered.length} produto{filtered.length !== 1 ? 's' : ''}</span>
          </div>
          <ProductGrid products={filtered} cols={3} />
        </div>
      </div>
    </div>
  );
}
