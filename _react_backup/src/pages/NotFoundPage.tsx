import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function NotFoundPage() {
  useSEO({ title: 'Página não encontrada' });
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="text-8xl font-display font-black text-azul-100 mb-4 select-none">404</div>
      <h1 className="font-display font-black text-azul-800 text-3xl mb-3">Página não encontrada</h1>
      <p className="text-cinza-700 mb-8 max-w-md">
        O endereço que você acessou não existe ou foi movido. Que tal buscar o que precisa?
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); if (query.trim()) navigate(`/busca?q=${encodeURIComponent(query.trim())}`); }}
        className="flex w-full max-w-sm mb-8"
      >
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar produto..."
          className="flex-1 border border-cinza-200 rounded-l-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400"
        />
        <button type="submit" className="bg-azul-800 text-white px-5 rounded-r-xl hover:bg-azul-900 transition-colors">
          <Search size={18} />
        </button>
      </form>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/" className="bg-amarelo-500 text-azul-900 font-bold px-6 py-3 rounded-xl hover:bg-amarelo-600 transition-colors">
          Ir para a Home
        </Link>
        <Link to="/produtos" className="bg-white border border-cinza-200 text-azul-800 font-semibold px-6 py-3 rounded-xl hover:bg-cinza-50 transition-colors">
          Ver Produtos
        </Link>
      </div>
    </div>
  );
}
