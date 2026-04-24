import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 z-50 bg-azul-medio text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:bg-azul-escuro transition-colors"
      title="Voltar ao topo"
    >
      <ChevronUp size={20} />
    </button>
  );
}
