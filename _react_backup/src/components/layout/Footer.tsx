import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const brands = ['WEG', 'Tigre', 'Schneider', 'Osram', 'Amanco', 'Fortlev', 'Tramontina', 'Ficap'];

export default function Footer() {
  return (
    <footer className="bg-azul-900 text-white">
      {/* Brands bar */}
      <div className="border-b border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-white/50 text-xs text-center mb-3 uppercase tracking-widest">Marcas que trabalhamos</p>
          <div className="flex flex-wrap justify-center gap-3">
            {brands.map(b => (
              <span key={b} className="bg-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full border border-white/20">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 bg-amarelo-500 rounded-xl flex items-center justify-center">
              <span className="font-display font-black text-azul-800 text-lg">VW</span>
            </div>
            <div>
              <div className="font-display font-black text-xl tracking-wide">VALWATT</div>
              <div className="text-white/50 text-xs">Elétrica & Hidráulica</div>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            Mais de 10 anos levando qualidade e confiança para obras residenciais, comerciais e industriais em Ourinhos e região.
          </p>
          <div className="flex gap-2 flex-wrap">
            {['Pix', 'Cartão', 'Boleto', 'Parcelado'].map(m => (
              <span key={m} className="bg-white/10 border border-white/20 text-white/70 text-[10px] font-semibold px-2.5 py-1 rounded-md">{m}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display font-bold text-lg mb-4 text-amarelo-500">Links Rápidos</h4>
          <ul className="space-y-2">
            {[['/', 'Início'], ['/produtos', 'Produtos'], ['/sobre', 'Sobre Nós'], ['/contato', 'Contato']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-white/60 hover:text-amarelo-500 transition-colors text-sm">→ {label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-display font-bold text-lg mb-4 text-amarelo-500">Categorias</h4>
          <ul className="space-y-2">
            {[
              ['/categoria/eletrico', '⚡ Materiais Elétricos'],
              ['/categoria/hidraulico', '🚿 Materiais Hidráulicos'],
              ['/categoria/iluminacao', '💡 Iluminação LED'],
              ['/categoria/ferramentas', '🔧 Ferramentas'],
              ['/categoria/ofertas', '🏷️ Ofertas da Semana'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-white/60 hover:text-amarelo-500 transition-colors text-sm">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-lg mb-4 text-amarelo-500">Contato</h4>
          <ul className="space-y-3">
            <li className="flex gap-2 text-sm text-white/60">
              <MapPin size={15} className="shrink-0 mt-0.5 text-amarelo-500" />
              <span>Rua das Indústrias, 450 — Ourinhos/SP</span>
            </li>
            <li className="flex gap-2 text-sm text-white/60">
              <Phone size={15} className="shrink-0 mt-0.5 text-amarelo-500" />
              <a href="tel:+5515999990000" className="hover:text-amarelo-500">(15) 99999-0000</a>
            </li>
            <li className="flex gap-2 text-sm text-white/60">
              <Mail size={15} className="shrink-0 mt-0.5 text-amarelo-500" />
              <a href="mailto:contato@valwatt.com.br" className="hover:text-amarelo-500">contato@valwatt.com.br</a>
            </li>
            <li className="flex gap-2 text-sm text-white/60">
              <Clock size={15} className="shrink-0 mt-0.5 text-amarelo-500" />
              <div><div>Seg–Sex: 8h às 18h</div><div>Sáb: 8h às 12h</div></div>
            </li>
          </ul>
        </div>
      </div>

      {/* Trust seals */}
      <div className="border-t border-white/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-4 text-xs text-white/50">
            {['🔒 SSL Seguro', '✅ CNPJ Ativo', '📦 Entrega Garantida', '💳 Parcelamento'].map(s => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center">
            © {new Date().getFullYear()} Valwatt Elétrica & Hidráulica — Desenvolvido com ❤️ para Ourinhos/SP
          </p>
        </div>
      </div>
    </footer>
  );
}
