import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const BASE_TITLE = 'Valwatt Elétrica & Hidráulica';
const BASE_DESC = 'Materiais elétricos e hidráulicos de qualidade em Ourinhos/SP. Entrega rápida, melhores preços.';

export function useSEO({ title, description, image, url }: SEOProps = {}) {
  const fullTitle = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
  const desc = description ?? BASE_DESC;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', desc);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', desc, 'property');
    if (image) setMeta('og:image', image, 'property');
    if (url) setMeta('og:url', url, 'property');
  }, [fullTitle, desc, image, url]);
}
