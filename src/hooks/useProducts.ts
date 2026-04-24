import { useQuery } from '@tanstack/react-query';
import { shopifyFetch } from '../lib/shopify';
import { GET_PRODUCTS } from '../lib/queries';
import type { ShopifyProduct } from '../types/shopify';

interface ProductsData {
  products: { edges: { node: ShopifyProduct; cursor: string }[]; pageInfo: { hasNextPage: boolean; endCursor: string } };
}

export const useProducts = (options?: { first?: number; query?: string; after?: string }) => {
  return useQuery({
    queryKey: ['products', options],
    queryFn: () => shopifyFetch<ProductsData>(GET_PRODUCTS, { first: options?.first ?? 12, query: options?.query, after: options?.after }),
    select: (data) => data.products,
  });
};
