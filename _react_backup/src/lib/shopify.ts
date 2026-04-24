const DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN;
const TOKEN  = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

export const shopifyFetch = async <T>(query: string, variables: Record<string, unknown> = {}): Promise<T> => {
  const res = await fetch(`https://${DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': TOKEN },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
};

export const formatPrice = (amount: string | number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(amount));

export const calcDiscount = (price: string | number, compareAt: string | number) => {
  const p = Number(price); const c = Number(compareAt);
  if (!c || c <= p) return null;
  return Math.round(((c - p) / c) * 100);
};
