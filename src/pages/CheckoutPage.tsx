import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronRight, Copy, CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/utils';
import { maskCEP, maskPhone, maskCPF, maskCard } from '../lib/utils';
import { buscarCEP, calcularFrete } from '../lib/cep';
import type { OpcaoFrete } from '../lib/cep';
import { metodosPagamento, calcularParcelamento, gerarCodigoPix, gerarCodigoBoleto } from '../lib/pagamento';
import { useSEO } from '../hooks/useSEO';
import { toast } from 'sonner';

const stepIdSchema = z.object({
  nome: z.string().min(3, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  cpf: z.string().min(14, 'CPF inválido'),
  telefone: z.string().min(14, 'Telefone inválido'),
});

const stepEndSchema = z.object({
  cep: z.string().min(9, 'CEP inválido'),
  logradouro: z.string().min(3, 'Endereço obrigatório'),
  numero: z.string().min(1, 'Número obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(2, 'Bairro obrigatório'),
  cidade: z.string().min(2, 'Cidade obrigatória'),
  uf: z.string().length(2, 'UF inválida'),
});

type StepIdForm = z.infer<typeof stepIdSchema>;
type StepEndForm = z.infer<typeof stepEndSchema>;

const steps = ['Identificação', 'Entrega', 'Pagamento'];

export default function CheckoutPage() {
  useSEO({ title: 'Checkout' });
  const navigate = useNavigate();
  const { items, totalFinal, totalItems, subtotal, descontoCupom, freteValor, descontoMetodo, frete, setFrete, metodoPagamento, setMetodoPagamento } = useCartStore();
  const [step, setStep] = useState(0);

  const [idData, setIdData] = useState<StepIdForm | null>(null);
  const [endData, setEndData] = useState<StepEndForm | null>(null);
  const [opcoesFretes, setOpcoesFretes] = useState<OpcaoFrete[]>([]);
  const [cepLoading, setCepLoading] = useState(false);

  const [cardNum, setCardNum] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [parcelas, setParcelas] = useState(1);
  const [pixCopied, setPixCopied] = useState(false);
  const [boletoCopied, setBoletoCopied] = useState(false);

  const pixCode = gerarCodigoPix();
  const boletoCode = gerarCodigoBoleto();

  const formId = useForm<StepIdForm>({ resolver: zodResolver(stepIdSchema) });
  const formEnd = useForm<StepEndForm>({ resolver: zodResolver(stepEndSchema) });

  if (items.length === 0) {
    navigate('/carrinho');
    return null;
  }

  const total = totalFinal();
  const count = totalItems();

  const fetchCep = async (cep: string) => {
    const digits = cep.replace(/\D/g, '');
    if (digits.length !== 8) return;
    setCepLoading(true);
    try {
      const end = await buscarCEP(digits);
      formEnd.setValue('logradouro', end.logradouro);
      formEnd.setValue('bairro', end.bairro);
      formEnd.setValue('cidade', end.localidade);
      formEnd.setValue('uf', end.uf);
      const opcoes = calcularFrete(end.uf, subtotal());
      setOpcoesFretes(opcoes);
      if (!frete) setFrete(opcoes[0]);
    } catch {
      toast.error('CEP não encontrado');
    } finally {
      setCepLoading(false);
    }
  };

  const handleFinalizarPagamento = () => {
    const numeroPedido = `VW-${Math.floor(100000 + Math.random() * 900000)}`;
    navigate('/pedido-confirmado', {
      state: { numeroPedido, total, metodo: metodoPagamento },
    });
  };

  const parcelasOpcoes = calcularParcelamento(total);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-10 gap-0">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center">
            <div className={`flex items-center gap-2 ${i < step ? 'cursor-pointer' : ''}`} onClick={() => i < step && setStep(i)}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                i < step ? 'bg-green-500 text-white' : i === step ? 'bg-azul-800 text-white' : 'bg-cinza-200 text-cinza-700'
              }`}>
                {i < step ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span className={`text-sm font-semibold hidden sm:block ${i === step ? 'text-azul-800' : 'text-cinza-700'}`}>{label}</span>
            </div>
            {i < steps.length - 1 && <ChevronRight size={16} className="mx-2 text-cinza-300" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form area */}
        <div className="lg:col-span-2">

          {/* STEP 0 — Identificação */}
          {step === 0 && (
            <form onSubmit={formId.handleSubmit(data => { setIdData(data); setStep(1); })}
              className="bg-white rounded-2xl border border-cinza-200 shadow-card p-6 space-y-4">
              <h2 className="font-display font-bold text-azul-800 text-2xl mb-1">Identificação</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-cinza-700 mb-1 block">Nome completo *</label>
                  <input {...formId.register('nome')} placeholder="João Silva"
                    className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400" />
                  {formId.formState.errors.nome && <p className="text-red-500 text-xs mt-1">{formId.formState.errors.nome.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-cinza-700 mb-1 block">E-mail *</label>
                  <input {...formId.register('email')} type="email" placeholder="joao@email.com"
                    className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400" />
                  {formId.formState.errors.email && <p className="text-red-500 text-xs mt-1">{formId.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-cinza-700 mb-1 block">CPF *</label>
                  <input
                    placeholder="000.000.000-00"
                    value={formId.watch('cpf') ?? ''}
                    onChange={e => formId.setValue('cpf', maskCPF(e.target.value), { shouldValidate: true })}
                    className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400"
                  />
                  {formId.formState.errors.cpf && <p className="text-red-500 text-xs mt-1">{formId.formState.errors.cpf.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-cinza-700 mb-1 block">Telefone *</label>
                  <input
                    placeholder="(15) 99999-0000"
                    value={formId.watch('telefone') ?? ''}
                    onChange={e => formId.setValue('telefone', maskPhone(e.target.value), { shouldValidate: true })}
                    className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400"
                  />
                  {formId.formState.errors.telefone && <p className="text-red-500 text-xs mt-1">{formId.formState.errors.telefone.message}</p>}
                </div>
              </div>
              <button type="submit" className="w-full bg-azul-800 text-white font-bold py-3 rounded-xl hover:bg-azul-900 transition-colors mt-2">
                Continuar para Entrega →
              </button>
            </form>
          )}

          {/* STEP 1 — Entrega */}
          {step === 1 && (
            <form onSubmit={formEnd.handleSubmit(data => { setEndData(data); setStep(2); })}
              className="bg-white rounded-2xl border border-cinza-200 shadow-card p-6 space-y-4">
              <h2 className="font-display font-bold text-azul-800 text-2xl mb-1">Endereço de Entrega</h2>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-cinza-700 mb-1 block">CEP *</label>
                  <div className="flex gap-2">
                    <input
                      placeholder="00000-000"
                      maxLength={9}
                      value={formEnd.watch('cep') ?? ''}
                      onChange={e => {
                        const masked = maskCEP(e.target.value);
                        formEnd.setValue('cep', masked, { shouldValidate: true });
                        if (masked.replace(/\D/g, '').length === 8) fetchCep(masked);
                      }}
                      className="flex-1 border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400"
                    />
                    {cepLoading && <span className="text-xs text-cinza-700 self-center">Buscando...</span>}
                  </div>
                  {formEnd.formState.errors.cep && <p className="text-red-500 text-xs mt-1">{formEnd.formState.errors.cep.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-cinza-700 mb-1 block">UF *</label>
                  <input {...formEnd.register('uf')} maxLength={2}
                    className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-cinza-700 mb-1 block">Logradouro *</label>
                  <input {...formEnd.register('logradouro')} placeholder="Rua, Av, etc."
                    className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-cinza-700 mb-1 block">Número *</label>
                  <input {...formEnd.register('numero')} placeholder="123"
                    className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-cinza-700 mb-1 block">Complemento</label>
                  <input {...formEnd.register('complemento')} placeholder="Apto, Bloco..."
                    className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-cinza-700 mb-1 block">Bairro *</label>
                  <input {...formEnd.register('bairro')} placeholder="Bairro"
                    className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-cinza-700 mb-1 block">Cidade *</label>
                <input {...formEnd.register('cidade')} placeholder="Cidade"
                  className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400" />
              </div>

              {/* Frete options */}
              {opcoesFretes.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-cinza-700 mb-2">Opções de entrega:</p>
                  <div className="space-y-2">
                    {opcoesFretes.map(op => (
                      <label key={op.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${frete?.id === op.id ? 'border-azul-500 bg-azul-50' : 'border-cinza-200'}`}>
                        <input type="radio" name="frete" checked={frete?.id === op.id} onChange={() => setFrete(op)} className="accent-azul-600" />
                        <div className="flex-1">
                          <p className="font-semibold text-azul-800 text-sm">{op.nome}</p>
                          <p className="text-xs text-cinza-700">{op.prazo}</p>
                        </div>
                        <span className="font-bold text-sm">{op.valor === 0 ? 'Grátis' : formatPrice(op.valor)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(0)} className="flex-1 border border-cinza-200 text-cinza-700 font-semibold py-3 rounded-xl hover:bg-cinza-50 transition-colors">
                  ← Voltar
                </button>
                <button type="submit" className="flex-1 bg-azul-800 text-white font-bold py-3 rounded-xl hover:bg-azul-900 transition-colors">
                  Continuar para Pagamento →
                </button>
              </div>
            </form>
          )}

          {/* STEP 2 — Pagamento */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-cinza-200 shadow-card p-6 space-y-5">
              <h2 className="font-display font-bold text-azul-800 text-2xl mb-1">Pagamento</h2>

              {/* Method selector */}
              <div className="grid grid-cols-2 gap-2">
                {metodosPagamento.map(m => (
                  <button key={m.id} onClick={() => setMetodoPagamento(m.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-colors ${metodoPagamento === m.id ? 'border-azul-500 bg-azul-50 text-azul-800' : 'border-cinza-200 text-cinza-700 hover:bg-cinza-50'}`}>
                    <span>{m.icone}</span>
                    <span>{m.label}</span>
                    {m.desconto > 0 && <span className="ml-auto text-xs text-green-600 font-bold">−{m.desconto}%</span>}
                  </button>
                ))}
              </div>

              {/* PIX */}
              {metodoPagamento === 'pix' && (
                <div className="text-center space-y-4">
                  <p className="text-sm text-cinza-700">Escaneie o QR Code ou copie o código Pix abaixo:</p>
                  <div className="bg-cinza-50 border border-cinza-200 rounded-2xl p-6 inline-block mx-auto">
                    <div className="w-36 h-36 bg-white border border-cinza-300 rounded-xl flex items-center justify-center mx-auto text-5xl">
                      ▣
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input readOnly value={pixCode} className="flex-1 border border-cinza-200 rounded-xl px-3 py-2 text-xs bg-cinza-50 outline-none" />
                    <button
                      onClick={() => { navigator.clipboard.writeText(pixCode); setPixCopied(true); toast.success('Código copiado!'); }}
                      className="bg-azul-800 text-white px-4 rounded-xl hover:bg-azul-900 transition-colors flex items-center gap-1.5 text-sm font-semibold"
                    >
                      {pixCopied ? <CheckCircle size={14} /> : <Copy size={14} />}
                      {pixCopied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-800 text-sm font-semibold">
                    Total com 5% OFF Pix: {formatPrice(total * 0.95)}
                  </div>
                </div>
              )}

              {/* BOLETO */}
              {metodoPagamento === 'boleto' && (
                <div className="space-y-4">
                  <p className="text-sm text-cinza-700">Pague o boleto em qualquer banco ou casa lotérica até a data de vencimento.</p>
                  <div className="flex gap-2">
                    <input readOnly value={boletoCode} className="flex-1 border border-cinza-200 rounded-xl px-3 py-2 text-xs bg-cinza-50 outline-none" />
                    <button
                      onClick={() => { navigator.clipboard.writeText(boletoCode); setBoletoCopied(true); toast.success('Código copiado!'); }}
                      className="bg-azul-800 text-white px-4 rounded-xl hover:bg-azul-900 transition-colors flex items-center gap-1.5 text-sm font-semibold"
                    >
                      {boletoCopied ? <CheckCircle size={14} /> : <Copy size={14} />}
                      {boletoCopied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-yellow-800 text-sm">
                    O pedido é processado após confirmação do pagamento (até 2 dias úteis).
                  </div>
                </div>
              )}

              {/* CRÉDITO / DÉBITO */}
              {(metodoPagamento === 'credito' || metodoPagamento === 'debito') && (
                <div className="space-y-4">
                  {/* Card preview */}
                  <div className="bg-gradient-to-br from-azul-800 to-azul-600 rounded-2xl p-5 text-white shadow-azul">
                    <p className="font-mono text-lg tracking-widest mb-4">{cardNum || '•••• •••• •••• ••••'}</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-white/60">TITULAR</p>
                        <p className="font-bold uppercase">{cardName || 'NOME DO TITULAR'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/60">VALIDADE</p>
                        <p className="font-bold">{cardExp || 'MM/AA'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-cinza-700 mb-1 block">Número do Cartão</label>
                      <input
                        value={cardNum}
                        onChange={e => setCardNum(maskCard(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-cinza-700 mb-1 block">Nome no Cartão</label>
                      <input
                        value={cardName}
                        onChange={e => setCardName(e.target.value.toUpperCase())}
                        placeholder="NOME SOBRENOME"
                        className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-cinza-700 mb-1 block">Validade</label>
                      <input
                        value={cardExp}
                        onChange={e => {
                          const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setCardExp(v.length > 2 ? `${v.slice(0,2)}/${v.slice(2)}` : v);
                        }}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-cinza-700 mb-1 block">CVV</label>
                      <input
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="000"
                        maxLength={4}
                        className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400"
                      />
                    </div>
                  </div>

                  {metodoPagamento === 'credito' && (
                    <div>
                      <label className="text-xs font-semibold text-cinza-700 mb-1 block">Parcelamento</label>
                      <select
                        value={parcelas}
                        onChange={e => setParcelas(Number(e.target.value))}
                        className="w-full border border-cinza-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-azul-400"
                      >
                        {parcelasOpcoes.map(op => (
                          <option key={op.parcelas} value={op.parcelas}>
                            {op.parcelas}x de {formatPrice(op.valorParcela)}{op.juros ? ' (com juros)' : ' sem juros'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="flex-1 border border-cinza-200 text-cinza-700 font-semibold py-3 rounded-xl hover:bg-cinza-50 transition-colors">
                  ← Voltar
                </button>
                <button
                  onClick={handleFinalizarPagamento}
                  className="flex-1 bg-amarelo-500 text-azul-900 font-bold py-3 rounded-xl hover:bg-amarelo-600 transition-colors shadow-amarelo"
                >
                  Confirmar Pedido →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="bg-white rounded-2xl border border-cinza-200 shadow-card p-5 sticky top-28">
            <h3 className="font-display font-bold text-azul-800 text-lg mb-4">Resumo ({count} itens)</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
              {items.map(item => (
                <div key={item.variantId} className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover bg-cinza-100" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-azul-800 line-clamp-2">{item.title}</p>
                    <p className="text-xs text-cinza-700">Qtd: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-azul-800">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-cinza-100 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-cinza-700">
                <span>Subtotal</span><span>{formatPrice(subtotal())}</span>
              </div>
              {descontoCupom() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto cupom</span><span>−{formatPrice(descontoCupom())}</span>
                </div>
              )}
              <div className="flex justify-between text-cinza-700">
                <span>Frete</span>
                <span>{frete ? (freteValor() === 0 ? 'Grátis' : formatPrice(freteValor())) : 'A definir'}</span>
              </div>
              {descontoMetodo() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desc. pagamento</span><span>−{formatPrice(descontoMetodo())}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-azul-800 text-lg pt-1 border-t border-cinza-100">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* suppress unused warnings */}
      {idData && endData && <span className="hidden">{idData.nome}{endData.cidade}</span>}
    </div>
  );
}
