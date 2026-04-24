export interface MockProduct {
  id: string; handle: string; title: string; vendor: string;
  productType: 'Elétrico' | 'Hidráulico' | 'Iluminação' | 'Ferramenta';
  price: number; compareAtPrice?: number;
  rating: number; reviewCount: number;
  badge?: 'novo' | 'oferta' | 'mais-vendido' | 'exclusivo';
  images: string[]; description: string;
  specs: { label: string; value: string }[];
  variantId: string;
}

export const mockProducts: MockProduct[] = [
  {
    id: '1', handle: 'disjuntor-63a-bifasico',
    title: 'Disjuntor Bipolar 63A Curva C', vendor: 'WEG',
    productType: 'Elétrico', price: 89.90, compareAtPrice: 129.90,
    rating: 4.8, reviewCount: 247, badge: 'mais-vendido',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    description: 'Disjuntor bipolar 63A curva C para proteção de circuitos elétricos residenciais e comerciais. Certificado pelo INMETRO.',
    specs: [{ label: 'Corrente', value: '63A' }, { label: 'Polos', value: '2' }, { label: 'Curva', value: 'C' }, { label: 'Tensão', value: '220V' }],
    variantId: 'gid://shopify/ProductVariant/1',
  },
  {
    id: '2', handle: 'fio-eletrico-10mm-100m',
    title: 'Cabo Flexível 10mm² 100m Vermelho', vendor: 'Ficap',
    productType: 'Elétrico', price: 349.90, compareAtPrice: 420.00,
    rating: 4.7, reviewCount: 183, badge: 'oferta',
    images: [
      'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&q=80',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80',
    ],
    description: 'Cabo flexível de cobre estanhado 10mm², rolo com 100 metros, cor vermelha. Ideal para instalações elétricas industriais.',
    specs: [{ label: 'Seção', value: '10mm²' }, { label: 'Comprimento', value: '100m' }, { label: 'Material', value: 'Cobre' }, { label: 'Cor', value: 'Vermelho' }],
    variantId: 'gid://shopify/ProductVariant/2',
  },
  {
    id: '3', handle: 'quadro-distribuicao-12-disjuntores',
    title: 'Quadro de Distribuição 12 Disjuntores Embutir', vendor: 'Schneider',
    productType: 'Elétrico', price: 189.90, compareAtPrice: 240.00,
    rating: 4.9, reviewCount: 92, badge: 'novo',
    images: [
      'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
    ],
    description: 'Quadro de distribuição para embutir, capacidade para 12 disjuntores, com barramento e tampa com visor.',
    specs: [{ label: 'Capacidade', value: '12 disjuntores' }, { label: 'Instalação', value: 'Embutir' }, { label: 'Material', value: 'Metálico' }, { label: 'Cor', value: 'Branco' }],
    variantId: 'gid://shopify/ProductVariant/3',
  },
  {
    id: '4', handle: 'tomada-20a-2p-t',
    title: 'Tomada 20A 2P+T Padrão NBR', vendor: 'Tramontina',
    productType: 'Elétrico', price: 24.90,
    rating: 4.6, reviewCount: 511,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
    description: 'Tomada 20A padrão brasileiro NBR 14136, com espelho, aro e módulo completo. Para equipamentos de alta potência.',
    specs: [{ label: 'Corrente', value: '20A' }, { label: 'Padrão', value: 'NBR 14136' }, { label: 'Polos', value: '2P+T' }],
    variantId: 'gid://shopify/ProductVariant/4',
  },
  {
    id: '5', handle: 'interruptor-triplo-10a',
    title: 'Interruptor Triplo 10A com Placa — Branco', vendor: 'Tramontina',
    productType: 'Elétrico', price: 31.50, compareAtPrice: 42.00,
    rating: 4.5, reviewCount: 388, badge: 'oferta',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
    description: 'Interruptor triplo 10A com placa, cor branca, linha Liz. Fácil instalação e design moderno para qualquer ambiente.',
    specs: [{ label: 'Corrente', value: '10A' }, { label: 'Módulos', value: '3' }, { label: 'Linha', value: 'Liz' }],
    variantId: 'gid://shopify/ProductVariant/5',
  },
  {
    id: '6', handle: 'eletroduto-corrugado-3-4-50m',
    title: 'Eletroduto Corrugado 3/4" Rolo 50m', vendor: 'Tigre',
    productType: 'Elétrico', price: 79.90,
    rating: 4.4, reviewCount: 156,
    images: ['https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&q=80'],
    description: 'Eletroduto corrugado flexível 3/4", rolo 50 metros, cor laranja. Para proteção de fiações em instalações elétricas.',
    specs: [{ label: 'Diâmetro', value: '3/4"' }, { label: 'Comprimento', value: '50m' }, { label: 'Material', value: 'PVC' }],
    variantId: 'gid://shopify/ProductVariant/6',
  },
  {
    id: '7', handle: 'registro-gaveta-1-pol',
    title: 'Registro de Gaveta 1" Latão Forjado', vendor: 'Tigre',
    productType: 'Hidráulico', price: 54.90, compareAtPrice: 74.90,
    rating: 4.8, reviewCount: 214, badge: 'mais-vendido',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
    ],
    description: 'Registro de gaveta 1" em latão forjado, acabamento cromado, para redes de distribuição de água fria e quente.',
    specs: [{ label: 'Diâmetro', value: '1"' }, { label: 'Material', value: 'Latão Forjado' }, { label: 'Acabamento', value: 'Cromado' }],
    variantId: 'gid://shopify/ProductVariant/7',
  },
  {
    id: '8', handle: 'tubo-pvc-soldavel-25mm-6m',
    title: 'Tubo PVC Soldável 25mm × 6m Água Fria', vendor: 'Amanco',
    productType: 'Hidráulico', price: 32.90,
    rating: 4.7, reviewCount: 329,
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80'],
    description: 'Tubo PVC soldável para água fria, diâmetro 25mm, barra de 6 metros. Alta resistência e durabilidade.',
    specs: [{ label: 'Diâmetro', value: '25mm' }, { label: 'Comprimento', value: '6m' }, { label: 'Uso', value: 'Água Fria' }],
    variantId: 'gid://shopify/ProductVariant/8',
  },
  {
    id: '9', handle: 'caixa-dagua-500l-polietileno',
    title: "Caixa d'Água 500L Polietileno Tampa Rosca", vendor: 'Fortlev',
    productType: 'Hidráulico', price: 289.90, compareAtPrice: 359.90,
    rating: 4.9, reviewCount: 87, badge: 'oferta',
    images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80'],
    description: "Caixa d'água 500 litros em polietileno atóxico com tampa de rosca e indicador de nível. Anti-UV e anti-bacteriana.",
    specs: [{ label: 'Capacidade', value: '500L' }, { label: 'Material', value: 'Polietileno' }, { label: 'Tampa', value: 'Rosca' }],
    variantId: 'gid://shopify/ProductVariant/9',
  },
  {
    id: '10', handle: 'bomba-dagua-1-cv',
    title: "Bomba d'Água 1CV Monofásica Periférica", vendor: 'Schneider',
    productType: 'Hidráulico', price: 449.90, compareAtPrice: 560.00,
    rating: 4.8, reviewCount: 143, badge: 'exclusivo',
    images: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    ],
    description: 'Bomba periférica 1CV monofásica 220V para residências e pequenas obras. Silenciosa, econômica e de alta vazão.',
    specs: [{ label: 'Potência', value: '1CV' }, { label: 'Alimentação', value: '220V' }, { label: 'Tipo', value: 'Periférica' }],
    variantId: 'gid://shopify/ProductVariant/10',
  },
  {
    id: '11', handle: 'lampada-led-bulbo-9w',
    title: 'Lâmpada LED Bulbo 9W 6500K Branco Frio (10un)', vendor: 'Osram',
    productType: 'Iluminação', price: 89.90, compareAtPrice: 120.00,
    rating: 4.9, reviewCount: 742, badge: 'mais-vendido',
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    description: 'Kit com 10 lâmpadas LED bulbo 9W, luz branca fria 6500K, base E27, 810 lúmens, vida útil 25.000 horas. Certificadas PROCEL A.',
    specs: [{ label: 'Potência', value: '9W' }, { label: 'Temperatura', value: '6500K' }, { label: 'Base', value: 'E27' }, { label: 'Lúmens', value: '810lm' }],
    variantId: 'gid://shopify/ProductVariant/11',
  },
  {
    id: '12', handle: 'painel-led-embutir-24w',
    title: 'Painel LED Embutir Redondo 24W 6500K', vendor: 'Elgin',
    productType: 'Iluminação', price: 69.90, compareAtPrice: 95.00,
    rating: 4.7, reviewCount: 218, badge: 'oferta',
    images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80'],
    description: 'Painel LED redondo para embutir 24W, luz branca fria 6500K, diâmetro de corte 20cm. Alta luminosidade para tetos rebaixados.',
    specs: [{ label: 'Potência', value: '24W' }, { label: 'Temperatura', value: '6500K' }, { label: 'Corte', value: 'Ø 20cm' }],
    variantId: 'gid://shopify/ProductVariant/12',
  },
];

export const getFeatured = () => mockProducts.filter(p => p.badge === 'mais-vendido');
export const getOffers   = () => mockProducts.filter(p => p.compareAtPrice);
export const getByType   = (type: string) => mockProducts.filter(p => p.productType === type);
export const getByHandle = (handle: string) => mockProducts.find(p => p.handle === handle);
