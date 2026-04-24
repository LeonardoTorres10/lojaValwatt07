import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const timeline = [
  { year: '2014', title: 'Fundação', desc: 'Valwatt abre as portas em Ourinhos/SP com foco em materiais elétricos.' },
  { year: '2018', title: 'Expansão', desc: 'Ampliação do estoque com linha completa de materiais hidráulicos.' },
  { year: '2022', title: 'Loja Online', desc: 'Lançamento da plataforma digital para atender toda a região.' },
  { year: '2024', title: '10 Anos', desc: 'Uma década de qualidade, confiança e atendimento especializado.' },
];

const values = [
  { icon: '🏆', title: 'Qualidade', desc: 'Trabalhamos apenas com marcas reconhecidas e produtos certificados.' },
  { icon: '🤝', title: 'Confiança', desc: 'Relacionamentos duradouros com clientes e fornecedores.' },
  { icon: '💬', title: 'Atendimento', desc: 'Suporte técnico especializado para ajudar na melhor escolha.' },
];

export default function AboutPage() {
  const anim = useScrollAnimation();

  return (
    <div>
      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80" alt="Valwatt" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-azul-900/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="font-display font-black text-white text-5xl mb-3">Sobre a Valwatt</h1>
          <p className="text-white/80 text-lg max-w-xl">Mais de 10 anos levando qualidade e confiança para sua obra.</p>
        </div>
      </div>

      {/* Who we are */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display font-black text-azul-800 text-4xl mb-5">Quem Somos</h2>
            <p className="text-cinza-700 leading-relaxed text-lg mb-4">
              A Valwatt Elétrica & Hidráulica é o lugar ideal para encontrar materiais hidráulicos e elétricos de qualidade com excelente atendimento. Preços acessíveis, localização conveniente e mais de 10 anos atendendo Ourinhos e região.
            </p>
            <p className="text-cinza-700 leading-relaxed">
              Nossa missão é oferecer os melhores produtos das marcas mais confiáveis do mercado, com orientação técnica especializada para que cada cliente faça a escolha certa para sua obra.
            </p>
          </div>
          <div className="bg-azul-50 border border-azul-100 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-5 text-center">
              {[['10+', 'Anos de experiência'], ['5.000+', 'Clientes atendidos'], ['2.000+', 'Produtos em estoque'], ['4.8★', 'Avaliação média']].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display font-black text-azul-800 text-4xl">{num}</div>
                  <div className="text-cinza-700 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cinza-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display font-black text-azul-800 text-4xl text-center mb-12">Nossa História</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-azul-200" />
            {timeline.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-8 mb-8 last:mb-0"
              >
                <div className="w-16 h-16 rounded-full bg-azul-800 text-white flex flex-col items-center justify-center shrink-0 z-10 shadow-azul">
                  <span className="font-display font-black text-sm leading-none">{item.year}</span>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-card border border-cinza-200 flex-1 mt-2">
                  <h3 className="font-display font-bold text-azul-800 text-xl mb-1">{item.title}</h3>
                  <p className="text-cinza-700 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={anim.ref} className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="font-display font-black text-azul-800 text-4xl text-center mb-10">Nossos Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={anim.visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white border border-cinza-200 rounded-2xl p-8 text-center shadow-card">
              <div className="text-5xl mb-4">{v.icon}</div>
              <h3 className="font-display font-bold text-azul-800 text-2xl mb-2">{v.title}</h3>
              <p className="text-cinza-700">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
