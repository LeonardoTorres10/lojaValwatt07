import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatInstallment(total: number, parcelas: number): string {
  return `${parcelas}x de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total / parcelas)}`;
}

export function calcDiscount(price: number, compareAt: number): number {
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function isValidCEP(cep: string): boolean {
  return /^\d{8}$/.test(cep.replace(/\D/g, ''));
}

export function maskCEP(value: string): string {
  return value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 10) return digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

export function maskCPF(value: string): string {
  return value.replace(/\D/g, '').slice(0, 11)
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

export function maskCard(value: string): string {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
}
