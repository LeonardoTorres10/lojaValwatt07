export interface MetodoPagamento {
  id: string;
  label: string;
  desconto: number; // percentual
  icone: string;
}

export const metodosPagamento: MetodoPagamento[] = [
  { id: 'pix', label: 'Pix', desconto: 5, icone: '⚡' },
  { id: 'boleto', label: 'Boleto Bancário', desconto: 3, icone: '📄' },
  { id: 'credito', label: 'Cartão de Crédito', desconto: 0, icone: '💳' },
  { id: 'debito', label: 'Cartão de Débito', desconto: 2, icone: '💳' },
];

export function calcularParcelamento(total: number): { parcelas: number; valorParcela: number; juros: boolean }[] {
  const opcoes = [];
  for (let i = 1; i <= 12; i++) {
    if (i <= 6) {
      opcoes.push({ parcelas: i, valorParcela: total / i, juros: false });
    } else {
      const taxa = 0.0199;
      const valor = (total * Math.pow(1 + taxa, i)) / i;
      opcoes.push({ parcelas: i, valorParcela: valor, juros: true });
    }
  }
  return opcoes;
}

export function calcularDescontoMetodo(total: number, metodoId: string): number {
  const metodo = metodosPagamento.find(m => m.id === metodoId);
  if (!metodo || metodo.desconto === 0) return 0;
  return total * (metodo.desconto / 100);
}

export function gerarCodigoPix(): string {
  return '00020126360014BR.GOV.BCB.PIX0114+5515999990000520400005303986540';
}

export function gerarCodigoBoleto(): string {
  const rand = () => Math.floor(Math.random() * 9) + 1;
  return `${rand()}${rand()}${rand()}90.${rand()}${rand()}${rand()}${rand()}${rand()} ${rand()}${rand()}${rand()}${rand()}${rand()}.${rand()}${rand()}${rand()}${rand()}${rand()}${rand()}0 ${rand()} 2${rand()}${rand()}${rand()}0000000${rand()}${rand()}${rand()}${rand()}${rand()}`;
}
