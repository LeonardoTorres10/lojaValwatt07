import { useEffect, useState } from 'react';

export default function PageLoading() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(40), 100);
    const t2 = setTimeout(() => setProgress(70), 400);
    const t3 = setTimeout(() => setProgress(90), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-azul-800 flex items-center justify-center shadow-azul">
        <span className="text-amarelo-400 font-display font-black text-2xl">V</span>
      </div>
      <div className="w-48 h-1.5 bg-cinza-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-azul-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
