import { useState, type FormEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';

const navLinks = [
  { to: '/categoria/eletrico', label: 'Elétrico', icon: '⚡' },
  { to: '/categoria/hidraulico', label: 'Hidráulico', icon: '🔧' },
  { to: '/categoria/iluminacao', label: 'Iluminação', icon: '💡' },
  { to: '/categoria/ferramentas', label: 'Ferramentas', icon: '🔩' },
  { to: '/categoria/ofertas', label: 'Ofertas', icon: '🏷️', highlight: true },
  { to: '/produtos', label: 'Todos os Produtos', icon: '📦' },
];

export default function Header() {
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems, openCart } = useCartStore();
  const count = totalItems();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim()) { navigate(`/busca?q=${encodeURIComponent(search.trim())}`); setSearch(''); }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50"
      style={{ boxShadow: '0 2px 20px rgba(5,29,95,0.3)' }}
    >
      {/* Top bar */}
      <div className="bg-azul-900 text-white/70 text-xs px-4 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <MapPin size={11} />
            <span>Ourinhos/SP — Seg a Sex 8h–18h, Sáb 8h–12h</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone size={11} />
              <span>(15) 99999-0000</span>
            </div>
            <span className="text-amarelo-500 font-semibold">🚚 Frete grátis acima de R$ 299</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-azul-800 px-4" style={{ height: '72px' }}>
        <div className="max-w-7xl mx-auto h-full flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 bg-amarelo-500 rounded-xl flex items-center justify-center shadow-amarelo">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="#0D3B8C" stroke="#0D3B8C" strokeWidth="0.5"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-black text-white text-2xl leading-none tracking-wide">VALWATT</div>
              <div className="text-white/60 text-[11px] font-body">Elétrica & Hidráulica</div>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-[520px] hidden md:flex mx-auto">
            <div className="flex w-full rounded-[10px] overflow-hidden border-[2.5px] border-amarelo-500">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar produtos... (ex: disjuntor, registro, led)"
                className="flex-1 px-4 py-2.5 text-sm text-gray-800 outline-none"
              />
              <button type="submit" className="bg-amarelo-500 px-5 flex items-center justify-center hover:bg-amarelo-600 transition-colors">
                <Search size={20} className="text-azul-800" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Link to="/minha-conta" className="hidden lg:flex items-center gap-2 border-[1.5px] border-white/40 text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
              <User size={16} />
              <span>Minha Conta</span>
            </Link>
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 bg-amarelo-500 text-azul-900 text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-amarelo-600 transition-colors shadow-amarelo"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Carrinho</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
            <button className="md:hidden text-white p-1" onClick={() => setMobileOpen(o => !o)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-azul-600 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-[3px] transition-all ${
                  link.highlight
                    ? isActive ? 'text-amarelo-500 border-amarelo-500 bg-white/10' : 'text-amarelo-400 border-transparent hover:bg-white/10'
                    : isActive ? 'text-amarelo-500 border-amarelo-500' : 'text-white/90 border-transparent hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span className="text-xs">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-azul-900 border-t border-white/10">
          <form onSubmit={handleSearch} className="p-3 flex border-b border-white/10">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar produtos..."
              className="flex-1 px-3 py-2 text-sm rounded-l-lg outline-none"
            />
            <button type="submit" className="bg-amarelo-500 px-4 rounded-r-lg">
              <Search size={16} className="text-azul-800" />
            </button>
          </form>
          <div className="flex flex-col py-2">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b border-white/10 ${isActive ? 'text-amarelo-500 bg-white/5' : 'text-white/85'}`
                }
              >
                <span>{link.icon}</span>{link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}
