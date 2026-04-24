interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'danger' | 'success' | 'warning';
  className?: string;
}

const variants = {
  default: 'bg-azul-claro text-azul-escuro',
  danger: 'bg-red-100 text-red-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amarelo/20 text-amarelo-escuro',
};

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
