import { MapPin, Clock, Phone, Award, Users, Wrench } from 'lucide-react';

export default function AboutPage() {
  const differentials = [
    { icon: <Award size={28} />, title: '+10 Anos de Experiência', desc: 'Atendendo Ourinhos e região desde 2013' },
    { icon: <Users size={28} />, title: 'Equipe Especializada', desc: 'Profissionais prontos para auxiliar na sua escolha' },
    { icon: <Wrench size={28} />, title: 'Produtos de Qualidade', desc: 'Trabalhamos apenas com marcas reconhecidas' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-azul-escuro to-azul-medio text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Sobre a Valwatt</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            A Valwatt Elétrica & Hidráulica é o lugar ideal para encontrar materiais hidráulicos e elétricos de qualidade com excelente atendimento. Preços acessíveis, localização conveniente e mais de 10 anos atendendo Ourinhos e região.
          </p>
        </div>
      </section>

      {/* Differentials */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-display font-bold text-3xl text-azul-escuro text-center mb-8">Nossos Diferenciais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentials.map((d, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-cinza-borda text-center">
              <div className="text-azul-medio flex justify-center mb-3">{d.icon}</div>
              <h3 className="font-display font-bold text-azul-escuro text-xl mb-2">{d.title}</h3>
              <p className="text-gray-500 text-sm">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Info */}
      <section className="bg-white border-y border-cinza-borda py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display font-bold text-3xl text-azul-escuro mb-4">Nossa Localização</h2>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin size={20} className="text-azul-medio shrink-0 mt-0.5" />
                <span className="text-gray-700">Rua das Indústrias, 450 — Ourinhos/SP, CEP 19900-000</span>
              </li>
              <li className="flex gap-3 items-start">
                <Phone size={20} className="text-azul-medio shrink-0 mt-0.5" />
                <a href="tel:+5515999990000" className="text-gray-700 hover:text-azul-medio">(15) 99999-0000</a>
              </li>
              <li className="flex gap-3 items-start">
                <Clock size={20} className="text-azul-medio shrink-0 mt-0.5" />
                <div className="text-gray-700">
                  <div>Segunda a Sexta: 8h às 18h</div>
                  <div>Sábado: 8h às 12h</div>
                  <div className="text-gray-400">Domingo: Fechado</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-azul-claro rounded-xl p-8 text-azul-escuro">
            <p className="text-lg leading-relaxed font-medium">
              "Nossa missão é oferecer os melhores materiais elétricos e hidráulicos com preço justo e atendimento de qualidade, contribuindo para o sucesso das obras de nossos clientes."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
