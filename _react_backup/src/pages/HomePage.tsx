import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { getOffers, getByType } from '../data/mockProducts';
import { formatPrice } from '../lib/utils';
import { useSEO } from '../hooks/useSEO';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ProductGrid from '../components/product/ProductGrid';

// ── Hero slides ──────────────────────────────────────────────────
const slides = [
  {
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85',
    line1: 'FORÇA TOTAL NO SEU',
    line2: 'CANTEIRO DE OBRAS',
    sub: 'Materiais elétricos e hidráulicos de qualidade premium. Entrega rápida para Ourinhos e região.',
    cta: { label: 'Ver Produtos', to: '/produtos' },
    ctaAlt: { label: 'Falar no WhatsApp', href: 'https://wa.me/5515999990000' },
  },
  {
    img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&q=85',
    line1: 'ILUMINAÇÃO',
    line2: 'LED PREMIUM',
    sub: 'Economize até 80% de energia com nossa linha LED certificada PROCEL.',
    cta: { label: 'Ver Iluminação', to: '/categoria/iluminacao' },
  },
  {
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1400&q=85',
    line1: 'INSTALAÇÕES',
    line2: 'HIDRÁULICAS',
    sub: "Registros, tubos, bombas e acessórios das melhores marcas do Brasil.",
    cta: { label: 'Ver Hidráulico', to: '/categoria/hidraulico' },
  },
];

// ── Benefits ─────────────────────────────────────────────────────
const benefits = [
  { icon: '🚚', title: 'Entrega Rápida', sub: 'Ourinhos e região em 24h' },
  { icon: '🏷️', title: 'Pix sem Juros', sub: '5% de desconto à vista' },
  { icon: '✅', title: 'Garantia de Origem', sub: 'Só marcas certificadas' },
  { icon: '🛠️', title: 'Suporte Técnico', sub: 'Tire dúvidas pelo WhatsApp' },
];

// ── Brands ───────────────────────────────────────────────────────
const brands = ['WEG', 'Tigre', 'Schneider Electric', 'Osram', 'Amanco', 'Fortlev', 'Tramontina', 'Ficap'];

// ── Testimonials ─────────────────────────────────────────────────
const testimonials = [
  { name: 'João Carlos M.', city: 'Ourinhos/SP', text: 'Comprei os materiais para a reforma completa da minha casa. Tudo de qualidade, preço justo e entregaram em menos de 24h. Recomendo demais!' },
  { name: 'Ana Paula S.', city: 'Ourinhos/SP', text: 'O atendimento técnico pelo WhatsApp me ajudou a escolher o disjuntor correto para meu ar-condicionado. Pessoal muito capacitado.' },
  { name: 'Roberto L.', city: 'Chavantes/SP', text: 'Melhor loja de materiais elétricos e hidráulicos da região. Preços muito competitivos e produtos sempre disponíveis em estoque.' },
];

// ── Countdown ────────────────────────────────────────────────────
function useCountdown() {
  const end = new Date(); end.setHours(23, 59, 59, 0);
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const diff = end.getTime() - Date.now();
      if (diff <= 0) { setTime('00:00:00'); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ── Section title ─────────────────────────────────────────────────
function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-1 h-12 bg-gradient-azul rounded-full shrink-0 mt-1" />
      <div>
        <h2 className="font-display font-black text-azul-800 text-3xl md:text-4xl">{title}</h2>
        {sub && <p className="text-cinza-700 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

export default function HomePage() {
  useSEO();
  const [activeTab, setActiveTab] = useState<'Elétrico' | 'Hidráulico' | 'Iluminação'>('Elétrico');
  const countdown = useCountdown();
  const benefitsAnim = useScrollAnimation();
  const categoriesAnim = useScrollAnimation();
  const bestsellersAnim = useScrollAnimation();
  const offersAnim = useScrollAnimation();
  const testimonialsAnim = useScrollAnimation();
  const galleryAnim = useScrollAnimation();

  const tabProducts = getByType(activeTab);
  const offers = getOffers();

  return (
    <div>
      {/* ── 1. HERO SLIDER ───────────────────────────────────── */}
      <section className="relative h-[560px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full">
                <img src={slide.img} alt={slide.line1} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-dark" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <h1 className="font-display font-black text-white leading-tight">
                      <span className="block text-4xl md:text-6xl">{slide.line1}</span>
                      <span className="block text-4xl md:text-6xl text-amarelo-500">{slide.line2}</span>
                    </h1>
                    <p className="text-white/80 text-lg mt-4 mb-8 max-w-xl">{slide.sub}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link to={slide.cta.to}
                        className="bg-amarelo-500 text-azul-900 font-bold px-8 py-3.5 rounded-xl hover:bg-amarelo-600 transition-colors text-lg shadow-amarelo">
                        {slide.cta.label}
                      </Link>
                      {slide.ctaAlt && (
                        <a href={slide.ctaAlt.href} target="_blank" rel="noopener noreferrer"
                          className="glass text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-colors text-lg">
                          {slide.ctaAlt.label}
                        </a>
                      )}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 bg-amarelo-500/20 border border-amarelo-500/40 text-amarelo-400 text-sm font-semibold px-4 py-2 rounded-full animate-pulse">
                      ⚡ Frete grátis acima de R$ 299
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ── 2. BENEFITS BAR ─────────────────────────────────── */}
      <section className="bg-white border-b border-cinza-200 py-6">
        <div ref={benefitsAnim.ref} className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={benefitsAnim.visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-3xl">{b.icon}</span>
                <div>
                  <div className="font-bold text-azul-800 text-sm">{b.title}</div>
                  <div className="text-cinza-700 text-xs">{b.sub}</div>
                </div>
                {i < 3 && <div className="hidden md:block w-px h-10 bg-cinza-200 ml-auto" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CATEGORY BANNERS ─────────────────────────────── */}
      <section ref={categoriesAnim.ref} className="max-w-7xl mx-auto px-4 py-12">
        <SectionTitle title="Nossas Categorias" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Big banners */}
          {[
            { slug: 'eletrico', title: 'MATERIAIS ELÉTRICOS', sub: 'Disjuntores, cabos, tomadas e mais', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80' },
            { slug: 'hidraulico', title: 'MATERIAIS HIDRÁULICOS', sub: "Registros, tubos, bomba d'água e mais", img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80' },
          ].map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              animate={categoriesAnim.visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link to={`/categoria/${cat.slug}`}
                className="relative h-[280px] rounded-2xl overflow-hidden img-zoom block group">
                <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-azul-900/85 to-azul-900/20" />
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <h3 className="font-display font-black text-white text-3xl">{cat.title}</h3>
                  <p className="text-white/70 mt-1 mb-3">{cat.sub}</p>
                  <span className="inline-flex w-fit bg-amarelo-500 text-azul-900 font-bold text-sm px-4 py-2 rounded-lg group-hover:bg-amarelo-600 transition-colors">
                    Comprar agora →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Small banners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { slug: 'iluminacao', title: '💡 ILUMINAÇÃO', bg: 'from-amber-500/80 to-amber-600/80', img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80' },
            { slug: 'ferramentas', title: '🔧 FERRAMENTAS', bg: 'from-cinza-900/80 to-cinza-800/80', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80' },
            { slug: 'ofertas', title: '🏷️ OFERTAS', sub: 'Até 40% OFF', isSolid: true },
          ].map((cat) => (
            <Link key={cat.slug} to={`/categoria/${cat.slug}`}
              className={`relative h-[180px] rounded-2xl overflow-hidden group flex flex-col justify-end p-5 ${cat.isSolid ? 'bg-gradient-amarelo' : 'img-zoom'}`}>
              {!cat.isSolid && cat.img && (
                <>
                  <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.bg}`} />
                </>
              )}
              <div className="relative z-10">
                <h3 className={`font-display font-black text-xl ${cat.isSolid ? 'text-azul-900' : 'text-white'}`}>{cat.title}</h3>
                {cat.sub && <p className="text-azul-900 font-bold text-lg">{cat.sub}</p>}
                <span className={`text-xs font-bold mt-1 block ${cat.isSolid ? 'text-azul-800' : 'text-white/80'}`}>Ver coleção →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 4. BESTSELLERS WITH TABS ─────────────────────────── */}
      <section ref={bestsellersAnim.ref} className="bg-cinza-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="MAIS VENDIDOS" sub="Escolha dos profissionais" />

          {/* Tab pills */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {(['Elétrico', 'Hidráulico', 'Iluminação'] as const).map(tab => (
              <button key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${activeTab === tab ? 'bg-azul-800 text-white shadow-azul' : 'bg-white text-cinza-800 border border-cinza-200 hover:border-azul-500'}`}>
                {tab}
              </button>
            ))}
          </div>

          <ProductGrid products={tabProducts.slice(0, 4)} />
        </div>
      </section>

      {/* ── 5. PROMO BANNER FULL WIDTH ───────────────────────── */}
      <section className="bg-gradient-amarelo py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=60)', backgroundSize: 'cover', mixBlendMode: 'multiply' }} />
        <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="font-display font-black text-azul-900 text-7xl md:text-8xl leading-none mb-3">ATÉ<br />40% OFF</div>
            <p className="text-azul-800 text-lg font-semibold mb-6">
              Nas melhores marcas: WEG, Tigre, Schneider, Osram, Amanco, Fortlev
            </p>
            <Link to="/categoria/ofertas"
              className="inline-block bg-azul-800 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-azul-900 transition-colors shadow-azul text-lg">
              Ver Ofertas
            </Link>
          </div>
          {/* Mini offers card */}
          <div className="bg-white rounded-2xl shadow-card-hover p-5 space-y-3">
            <h4 className="font-display font-bold text-azul-800 text-lg mb-4">Destaques da Promoção</h4>
            {offers.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center gap-3 border-b border-cinza-100 pb-3 last:border-0 last:pb-0">
                <img src={p.images[0]} alt={p.title} className="w-12 h-12 object-cover rounded-lg bg-cinza-100" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-azul-800 line-clamp-1">{p.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-cinza-700 line-through text-xs">{formatPrice(p.compareAtPrice!)}</span>
                    <span className="text-azul-800 font-bold text-sm">{formatPrice(p.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. OFFERS WITH COUNTDOWN ─────────────────────────── */}
      <section ref={offersAnim.ref} className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-1 h-12 bg-red-500 rounded-full shrink-0 mt-1" />
            <div>
              <h2 className="font-display font-black text-azul-800 text-3xl">🏷️ OFERTAS DA SEMANA</h2>
              <p className="text-cinza-700">Aproveite antes que acabe!</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-azul-900 text-white px-5 py-3 rounded-xl">
            <span className="text-xs text-white/60 uppercase tracking-wide">Termina em</span>
            <span className="font-display font-black text-amarelo-500 text-xl tracking-widest">{countdown}</span>
          </div>
        </div>

        <ProductGrid products={offers} />
      </section>

      {/* ── 7. LIFESTYLE GALLERY ─────────────────────────────── */}
      <section ref={galleryAnim.ref} className="bg-cinza-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Soluções para Toda Obra" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{ gridAutoRows: '200px' }}>
            {[
              { img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80', label: 'Instalações Residenciais', span: 'row-span-2' },
              { img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80', label: 'Iluminação Comercial' },
              { img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80', label: 'Sistemas Hidráulicos' },
              { img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80', label: 'Ferramentas Profissionais', span: 'col-span-2' },
              { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', label: 'Elétrica Industrial' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={galleryAnim.visible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative rounded-xl overflow-hidden img-zoom group ${item.span ?? ''}`}
              >
                <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-azul-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white font-display font-bold text-lg">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. BRANDS CAROUSEL ──────────────────────────────── */}
      <section className="bg-white py-10 border-b border-cinza-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-cinza-700 font-semibold mb-6 uppercase tracking-widest text-sm">Marcas que Você Pode Confiar</p>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={3000}
            loop
            slidesPerView="auto"
            spaceBetween={24}
            allowTouchMove={false}
            className="brands-swiper"
          >
            {[...brands, ...brands].map((brand, i) => (
              <SwiperSlide key={i} style={{ width: 'auto' }}>
                <div className="bg-cinza-50 border border-cinza-200 rounded-xl px-7 py-4 flex items-center justify-center min-w-[140px] shadow-card">
                  <span className="font-display font-bold text-azul-800 text-lg whitespace-nowrap">{brand}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ── 9. TESTIMONIALS ─────────────────────────────────── */}
      <section ref={testimonialsAnim.ref} className="bg-gradient-azul py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display font-black text-white text-3xl md:text-4xl text-center mb-10">
            O que nossos clientes dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={testimonialsAnim.visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-amarelo-500 flex items-center justify-center font-display font-black text-azul-900 text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-white/60 text-xs">{t.city}</div>
                  </div>
                </div>
                <div className="flex mb-3">{[1,2,3,4,5].map(s => <span key={s} className="text-amarelo-500 text-sm">★</span>)}</div>
                <p className="text-white/80 text-sm leading-relaxed">"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CTA WHATSAPP + LOCATION ─────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-amarelo-500 p-12 flex flex-col justify-center">
          <h2 className="font-display font-black text-azul-900 text-4xl mb-3">💬 Fale com nosso especialista</h2>
          <p className="text-azul-800 mb-8 leading-relaxed">
            Tire dúvidas sobre produtos, orçamentos e instalações com quem entende do assunto.
          </p>
          <a href="https://wa.me/5515999990000" target="_blank" rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-3 bg-green-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors text-lg shadow-lg">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chamar no WhatsApp
          </a>
        </div>
        <div className="bg-azul-800 p-12 flex flex-col justify-center text-white">
          <h2 className="font-display font-black text-3xl mb-4">📍 Nos encontre</h2>
          <div className="space-y-2 text-white/70 mb-6">
            <p>📍 Rua das Indústrias, 450 — Ourinhos/SP</p>
            <p>📞 (15) 99999-0000</p>
            <p>🕐 Seg–Sex 8h–18h | Sáb 8h–12h</p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-xl h-40 flex items-center justify-center text-white/40 font-display font-bold text-lg">
            📍 Ourinhos / SP
          </div>
        </div>
      </section>
    </div>
  );
}
