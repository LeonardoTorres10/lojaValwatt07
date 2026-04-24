import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useSEO } from '../hooks/useSEO';
import { maskPhone } from '../lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
  subject: z.string().min(1, 'Selecione um assunto'),
  message: z.string().min(10, 'Mensagem muito curta'),
});

type FormData = z.infer<typeof schema>;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-cinza-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function ContactPage() {
  useSEO({ title: 'Fale Conosco' });
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await emailjs.send(
        'service_valwatt',
        'template_contato',
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
        },
        'YOUR_EMAILJS_PUBLIC_KEY'
      );
      setSent(true);
      reset();
    } catch {
      // fallback: open WhatsApp
      const msg = encodeURIComponent(
        `Olá! Me chamo ${data.name}.\nAssunto: ${data.subject}\n${data.message}\nContato: ${data.email} | ${data.phone}`
      );
      toast.error('Falha no envio por e-mail. Abrindo WhatsApp como alternativa...', { duration: 3000 });
      setTimeout(() => window.open(`https://wa.me/5515999990000?text=${msg}`, '_blank'), 2000);
    }
  };

  const inputClass = 'w-full border border-cinza-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-azul-500 focus:ring-1 focus:ring-azul-500 transition-colors';

  return (
    <div>
      <div className="bg-gradient-azul py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display font-black text-white text-4xl">Fale Conosco</h1>
          <p className="text-white/70 mt-1">Estamos prontos para ajudar você</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-card border border-cinza-200 p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={36} className="text-green-500" />
              </div>
              <h2 className="font-display font-bold text-azul-800 text-2xl">Mensagem enviada!</h2>
              <p className="text-cinza-700 text-sm max-w-xs">
                Recebemos sua mensagem e retornaremos em breve pelo e-mail informado.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 bg-azul-800 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-azul-900 transition-colors text-sm"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <h2 className="font-display font-bold text-azul-800 text-2xl mb-2">Envie sua mensagem</h2>

              <Field label="Nome completo *" error={errors.name?.message}>
                <input {...register('name')} placeholder="Seu nome" className={inputClass} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="E-mail *" error={errors.email?.message}>
                  <input {...register('email')} type="email" placeholder="seu@email.com" className={inputClass} />
                </Field>
                <Field label="Telefone *" error={errors.phone?.message}>
                  <input
                    placeholder="(15) 99999-9999"
                    value={watch('phone') ?? ''}
                    onChange={e => setValue('phone', maskPhone(e.target.value), { shouldValidate: true })}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Assunto *" error={errors.subject?.message}>
                <select {...register('subject')} className={inputClass}>
                  <option value="">Selecione...</option>
                  <option value="orcamento">Orçamento</option>
                  <option value="pedido">Pedido / Rastreamento</option>
                  <option value="suporte">Suporte Técnico</option>
                  <option value="outro">Outro</option>
                </select>
              </Field>

              <Field label="Mensagem *" error={errors.message?.message}>
                <textarea {...register('message')} rows={5} placeholder="Escreva sua mensagem..." className={inputClass + ' resize-none'} />
              </Field>

              <button type="submit" disabled={isSubmitting}
                className="w-full bg-amarelo-500 text-azul-900 font-bold py-3.5 rounded-xl hover:bg-amarelo-600 transition-colors shadow-amarelo disabled:opacity-60 text-lg">
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-card border border-cinza-200 p-7">
            <h3 className="font-display font-bold text-azul-800 text-xl mb-5">Informações de Contato</h3>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, text: 'Rua das Indústrias, 450 — Ourinhos/SP' },
                { Icon: Phone, text: '(15) 99999-0000', href: 'tel:+5515999990000' },
                { Icon: Mail, text: 'contato@valwatt.com.br', href: 'mailto:contato@valwatt.com.br' },
                { Icon: Clock, text: 'Seg–Sex: 8h às 18h | Sáb: 8h às 12h' },
              ].map(({ Icon, text, href }, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <Icon size={18} className="text-azul-600 shrink-0 mt-0.5" />
                  {href ? <a href={href} className="text-cinza-700 text-sm hover:text-azul-600">{text}</a> : <span className="text-cinza-700 text-sm">{text}</span>}
                </li>
              ))}
            </ul>
          </div>

          <a href="https://wa.me/5515999990000" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 bg-green-500 text-white font-bold px-7 py-5 rounded-2xl hover:bg-green-600 transition-colors text-lg shadow-lg">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
