import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-azul-escuro text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1 - Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-amarelo rounded flex items-center justify-center">
              <span className="font-display font-bold text-azul-escuro text-lg">VW</span>
            </div>
            <div>
              <div className="font-display font-bold text-xl">VALWATT</div>
              <div className="text-white/65 text-xs">Elétrica & Hidráulica</div>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            Materiais elétricos e hidráulicos de qualidade para sua obra. Mais de 10 anos servindo Ourinhos e região.
          </p>
        </div>

        {/* Col 2 - Links Rápidos */}
        <div>
          <h4 className="font-display font-bold text-lg mb-4 text-amarelo">Links Rápidos</h4>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Início' },
              { to: '/produtos', label: 'Produtos' },
              { to: '/sobre', label: 'Sobre Nós' },
              { to: '/contato', label: 'Contato' },
            ].map(link => (
              <li key={link.to}>
                <Link to={link.to} className="text-white/70 hover:text-amarelo transition-colors text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 - Categorias */}
        <div>
          <h4 className="font-display font-bold text-lg mb-4 text-amarelo">Categorias</h4>
          <ul className="space-y-2">
            {[
              { to: '/categoria/eletrico', label: 'Materiais Elétricos' },
              { to: '/categoria/hidraulico', label: 'Materiais Hidráulicos' },
              { to: '/categoria/iluminacao', label: 'Iluminação' },
              { to: '/categoria/ferramentas', label: 'Ferramentas' },
            ].map(link => (
              <li key={link.to}>
                <Link to={link.to} className="text-white/70 hover:text-amarelo transition-colors text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 - Contato */}
        <div>
          <h4 className="font-display font-bold text-lg mb-4 text-amarelo">Contato</h4>
          <ul className="space-y-3">
            <li className="flex gap-2 text-sm text-white/70">
              <MapPin size={16} className="shrink-0 mt-0.5 text-amarelo" />
              <span>Rua das Indústrias, 450 — Ourinhos/SP</span>
            </li>
            <li className="flex gap-2 text-sm text-white/70">
              <Phone size={16} className="shrink-0 mt-0.5 text-amarelo" />
              <a href="tel:+5515999990000" className="hover:text-amarelo transition-colors">(15) 99999-0000</a>
            </li>
            <li className="flex gap-2 text-sm text-white/70">
              <Mail size={16} className="shrink-0 mt-0.5 text-amarelo" />
              <a href="mailto:contato@valwatt.com.br" className="hover:text-amarelo transition-colors">contato@valwatt.com.br</a>
            </li>
            <li className="flex gap-2 text-sm text-white/70">
              <Clock size={16} className="shrink-0 mt-0.5 text-amarelo" />
              <span>Seg-Sex 8h–18h | Sáb 8h–12h</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/60">
          <span>© {new Date().getFullYear()} Valwatt Elétrica & Hidráulica. Todos os direitos reservados.</span>
          <div className="flex items-center gap-3">
            <span>Pagamento seguro 🔒</span>
            <span className="bg-white/10 px-2 py-1 rounded text-xs">Pix</span>
            <span className="bg-white/10 px-2 py-1 rounded text-xs">Cartão</span>
            <span className="bg-white/10 px-2 py-1 rounded text-xs">Boleto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
