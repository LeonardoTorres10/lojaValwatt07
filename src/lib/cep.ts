export interface EnderecoViaCEP {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface OpcaoFrete {
  id: string;
  nome: string;
  prazo: string;
  valor: number; // BRL decimal
}

export async function buscarCEP(cep: string): Promise<EnderecoViaCEP> {
  const digits = cep.replace(/\D/g, '');
  const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  if (!res.ok) throw new Error('CEP não encontrado');
  const data: EnderecoViaCEP = await res.json();
  if (data.erro) throw new Error('CEP não encontrado');
  return data;
}

export function calcularFrete(uf: string, subtotal: number): OpcaoFrete[] {
  const gratis = subtotal >= 350;
  const isOurinhos = uf === 'SP';

  const opcoes: OpcaoFrete[] = [
    {
      id: 'pac',
      nome: 'PAC – Correios',
      prazo: isOurinhos ? '3-5 dias úteis' : '7-12 dias úteis',
      valor: gratis ? 0 : isOurinhos ? 14.90 : 24.90,
    },
    {
      id: 'sedex',
      nome: 'SEDEX – Correios',
      prazo: isOurinhos ? '1-2 dias úteis' : '2-5 dias úteis',
      valor: isOurinhos ? 24.90 : 39.90,
    },
  ];

  if (isOurinhos) {
    opcoes.push({
      id: 'motoboy',
      nome: 'Motoboy – Entrega Local',
      prazo: 'Hoje (pedidos até 16h)',
      valor: gratis ? 0 : 8.00,
    });
  }

  return opcoes;
}
