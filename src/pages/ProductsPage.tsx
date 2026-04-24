import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';
import type { ShopifyProduct } from '../types/shopify';

const categoryOptions = [
  { value: '', label: 'Todos' },
  { value: 'product_type:Elétrico', label: 'Materiais Elétricos' },
  { value: 'product_type:Hidráulico', label: 'Materiais Hidráulicos' },
  { value: 'product_type:Iluminação', label: 'Iluminação' },
  { value: 'product_type:Ferramentas', label: 'Ferramentas' },
];

export default function ProductsPage() {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [cursor, setCursor] = useState<string | undefined>();
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);

  const query = [category].filter(Boolean).join(' ');
  const { data, isLoading } = useProducts({ first: 12, query: query || undefined, after: cursor });

  const products = data?.edges.map(e => e.node) ?? [];
  const displayProducts = cursor ? [...allProducts, ...products] : products;

  const handleLoadMore = () => {
    if (data?.pageInfo.endCursor) {
      setAllProducts(displayProducts);
      setCursor(data.pageInfo.endCursor);
    }
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setCursor(undefined);
    setAllProducts([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-cinza-borda">
            <h3 className="font-display font-bold text-azul-escuro text-lg mb-4">Filtros</h3>

            <div className="mb-5">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Categoria</h4>
              <ul className="space-y-2">
                {categoryOptions.map(opt => (
                  <li key={opt.value}>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-azul-escuro">
                      <input
                        type="radio"
                        name="category"
                        value={opt.value}
                        checked={category === opt.value}
                        onChange={() => handleCategoryChange(opt.value)}
                        className="accent-azul-medio"
                      />
                      {opt.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Ordenar</h4>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="w-full border border-cinza-borda rounded-lg px-3 py-2 text-sm outline-none focus:border-azul-medio"
              >
                <option value="">Relevância</option>
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
                <option value="title_asc">A-Z</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-display font-bold text-azul-escuro text-3xl">Todos os Produtos</h1>
            {data && (
              <span className="text-gray-500 text-sm">
                {displayProducts.length} produto{displayProducts.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          <ProductGrid products={displayProducts} loading={isLoading && !cursor} />

          {data?.pageInfo.hasNextPage && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="bg-azul-escuro text-white font-semibold px-8 py-3 rounded-lg hover:bg-azul-medio transition-colors disabled:opacity-60"
              >
                {isLoading ? 'Carregando...' : 'Carregar mais'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
