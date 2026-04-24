import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(8, 'Telefone inválido'),
  subject: z.string().min(1, 'Selecione um assunto'),
  message: z.string().min(10, 'Mensagem muito curta'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise(r => setTimeout(r, 800));
    toast.success('Mensagem enviada! Entraremos em contato em breve.');
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-display font-bold text-3xl text-azul-escuro mb-8 text-center">Fale Conosco</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-cinza-borda p-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Nome *</label>
            <input
              {...register('name')}
              placeholder="Seu nome completo"
              className="w-full border border-cinza-borda rounded-lg px-3 py-2.5 text-sm outline-none focus:border-azul-medio"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">E-mail *</label>
              <input
                {...register('email')}
                type="email"
                placeholder="seu@email.com"
                className="w-full border border-cinza-borda rounded-lg px-3 py-2.5 text-sm outline-none focus:border-azul-medio"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Telefone *</label>
              <input
                {...register('phone')}
                placeholder="(15) 99999-9999"
                className="w-full border border-cinza-borda rounded-lg px-3 py-2.5 text-sm outline-none focus:border-azul-medio"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Assunto *</label>
            <select
              {...register('subject')}
              className="w-full border border-cinza-borda rounded-lg px-3 py-2.5 text-sm outline-none focus:border-azul-medio"
            >
              <option value="">Selecione...</option>
              <option value="orcamento">Orçamento</option>
              <option value="pedido">Pedido / Rastreamento</option>
              <option value="suporte">Suporte Técnico</option>
              <option value="outro">Outro</option>
            </select>
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Mensagem *</label>
            <textarea
              {...register('message')}
              rows={5}
              placeholder="Escreva sua mensagem..."
              className="w-full border border-cinza-borda rounded-lg px-3 py-2.5 text-sm outline-none focus:border-azul-medio resize-none"
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amarelo text-azul-escuro font-bold py-3 rounded-lg hover:bg-amarelo-escuro transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
        </form>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-cinza-borda p-6">
            <h3 className="font-display font-bold text-azul-escuro text-xl mb-4">Informações de Contato</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin size={20} className="text-azul-medio shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">Rua das Indústrias, 450 — Ourinhos/SP</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={20} className="text-azul-medio shrink-0" />
                <a href="tel:+5515999990000" className="text-gray-700 text-sm hover:text-azul-medio">(15) 99999-0000</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={20} className="text-azul-medio shrink-0" />
                <a href="mailto:contato@valwatt.com.br" className="text-gray-700 text-sm hover:text-azul-medio">contato@valwatt.com.br</a>
              </li>
              <li className="flex gap-3 items-start">
                <Clock size={20} className="text-azul-medio shrink-0 mt-0.5" />
                <div className="text-gray-700 text-sm">
                  <div>Seg–Sex: 8h às 18h</div>
                  <div>Sáb: 8h às 12h</div>
                </div>
              </li>
            </ul>
          </div>

          <a
            href="https://wa.me/5515999990000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 text-white font-bold px-6 py-4 rounded-xl hover:bg-green-600 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
