import { useState, type FormEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Zap } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/categoria/eletrico', label: 'Elétrico' },
  { to: '/categoria/hidraulico', label: 'Hidráulico' },
  { to: '/categoria/iluminacao', label: 'Iluminação' },
  { to: '/categoria/ferramentas', label: 'Ferramentas' },
  { to: '/categoria/ofertas', label: 'Ofertas' },
  { to: '/produtos', label: 'Todos' },
];

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems, openCart } = useCartStore();
  const count = totalItems();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-azul-escuro px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-amarelo rounded flex items-center justify-center">
              <span className="font-display font-bold text-azul-escuro text-lg leading-none">VW</span>
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-white text-xl leading-none tracking-wide">VALWATT</div>
              <div className="text-white/65 text-xs font-body">Elétrica & Hidráulica</div>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
            <div className="flex w-full border-2 border-amarelo rounded-lg overflow-hidden">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar produtos elétricos e hidráulicos..."
                className="flex-1 px-4 py-2 text-gray-800 text-sm outline-none"
              />
              <button type="submit" className="bg-amarelo px-4 flex items-center justify-center hover:bg-amarelo-escuro transition-colors">
                <Search size={18} className="text-azul-escuro" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Link to="/sobre" className="hidden md:flex items-center gap-1 border border-white/50 text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
              <User size={16} />
              <span>Minha Conta</span>
            </Link>
            <button
              onClick={() => openCart()}
              className="relative flex items-center gap-1 bg-amarelo text-azul-escuro text-sm font-semibold px-3 py-2 rounded-lg hover:bg-amarelo-escuro transition-colors"
            >
              <ShoppingCart size={18} />
              <span className="hidden md:inline">Carrinho</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
            <button className="md:hidden text-white" onClick={() => setMobileOpen(o => !o)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="mt-3 flex md:hidden border-2 border-amarelo rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar produtos..."
            className="flex-1 px-4 py-2 text-gray-800 text-sm outline-none"
          />
          <button type="submit" className="bg-amarelo px-4 flex items-center justify-center">
            <Search size={18} className="text-azul-escuro" />
          </button>
        </form>
      </div>

      {/* Navbar */}
      <nav className="bg-azul-medio hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-4 py-3 text-sm font-semibold font-body transition-colors border-b-2 ${
                  isActive ? 'text-amarelo border-amarelo' : 'text-white/90 border-transparent hover:text-white hover:border-white/40'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-azul-escuro border-t border-white/20">
          <div className="flex flex-col">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-6 py-3 text-sm font-semibold border-b border-white/10 ${
                    isActive ? 'text-amarelo bg-white/5' : 'text-white/90'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/contato" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-sm text-white/90 border-b border-white/10">
              Contato
            </Link>
          </div>
        </div>
      )}

      {/* Unused import suppressor */}
      <span className="hidden"><Zap /></span>
    </header>
  );
}
