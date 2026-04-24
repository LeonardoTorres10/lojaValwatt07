import { Link, useNavigate } from 'react-router-dom';
import { Zap, Tag, CheckCircle, Phone } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';
import StarRating from '../components/ui/StarRating';

const categories = [
  { slug: 'eletrico', label: 'Materiais Elétricos', icon: '⚡', bg: 'bg-azul-escuro', text: 'text-white' },
  { slug: 'hidraulico', label: 'Materiais Hidráulicos', icon: '🚿', bg: 'bg-azul-medio', text: 'text-white' },
  { slug: 'iluminacao', label: 'Iluminação', icon: '💡', bg: 'bg-amarelo', text: 'text-azul-escuro' },
  { slug: 'ferramentas', label: 'Ferramentas', icon: '🔧', bg: 'bg-[#14213D]', text: 'text-white' },
];

const benefits = [
  { icon: <Zap size={28} />, title: 'Entrega Rápida', desc: 'Receba em casa ou retire na loja' },
  { icon: <Tag size={28} />, title: 'Preço Justo', desc: 'Melhores preços da região' },
  { icon: <CheckCircle size={28} />, title: 'Produto Original', desc: 'Garantia de autenticidade' },
  { icon: <Phone size={28} />, title: 'Suporte Técnico', desc: 'Equipe especializada' },
];

const testimonials = [
  { name: 'Carlos Souza', city: 'Ourinhos/SP', text: 'Excelente atendimento! Encontrei tudo para a reforma da minha casa. Preços justos e entrega rápida.', rating: 5 },
  { name: 'Maria Aparecida', city: 'Salto Grande/SP', text: 'Loja muito bem organizada, equipe super prestativa. Recomendo para todos!', rating: 5 },
  { name: 'Roberto Lima', city: 'Ourinhos/SP', text: 'Comprei materiais hidráulicos de ótima qualidade. Voltarei com certeza!', rating: 4 },
];

export default function HomePage() {
  const navigate = useNavigate();
  const bestsellers = useProducts({ first: 4 });
  const offers = useProducts({ first: 4, query: 'compare_at_price:>0' });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-azul-escuro to-azul-medio text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 text-[20rem] font-bold opacity-[0.04] leading-none select-none pointer-events-none">⚡</div>
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-2 leading-tight">
            Tudo que sua obra precisa
          </h1>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-amarelo mb-4">
            ELÉTRICO & HIDRÁULICO
          </h2>
          <p className="text-white/80 text-lg max-w-xl mb-8">
            Produtos de qualidade com os melhores preços. Atendemos Ourinhos e toda a região há mais de 10 anos.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/produtos')}
              className="bg-amarelo text-azul-escuro font-bold px-8 py-3 rounded-lg hover:bg-amarelo-escuro transition-colors text-lg"
            >
              Ver Produtos
            </button>
            <a
              href="https://wa.me/5515999990000"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-azul-escuro transition-colors text-lg"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-10 border-b border-cinza-borda">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="text-azul-medio shrink-0">{b.icon}</div>
              <div>
                <div className="font-bold text-azul-escuro text-sm">{b.title}</div>
                <div className="text-gray-500 text-xs">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-display font-bold text-3xl text-azul-escuro mb-6">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/categoria/${cat.slug}`}
              className={`${cat.bg} ${cat.text} rounded-xl p-6 flex flex-col items-center gap-3 text-center hover:opacity-90 transition-opacity cursor-pointer`}
            >
              <span className="text-4xl">{cat.icon}</span>
              <span className="font-display font-bold text-lg leading-snug">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="font-display font-bold text-3xl text-azul-escuro mb-6">Mais Vendidos</h2>
        <ProductGrid
          products={bestsellers.data?.edges.map(e => e.node)}
          loading={bestsellers.isLoading}
        />
      </section>

      {/* Offers */}
      <section className="bg-orange-50 border-y border-orange-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">🔥 PROMOÇÃO</span>
            <h2 className="font-display font-bold text-3xl text-azul-escuro">Ofertas da Semana</h2>
          </div>
          <ProductGrid
            products={offers.data?.edges.map(e => e.node)}
            loading={offers.isLoading}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-display font-bold text-3xl text-azul-escuro mb-6 text-center">O que nossos clientes dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-cinza-borda">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-azul-escuro flex items-center justify-center text-white font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-azul-escuro text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.city}</div>
                </div>
              </div>
              <StarRating rating={t.rating} />
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amarelo py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-azul-escuro mb-3">
            Dúvida sobre qual produto usar?
          </h2>
          <p className="text-azul-escuro/70 mb-6">Nossa equipe está pronta para te ajudar!</p>
          <a
            href="https://wa.me/5515999990000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-600 transition-colors text-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar pelo WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
