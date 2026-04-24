import { useQuery } from '@tanstack/react-query';
import { shopifyFetch } from '../lib/shopify';
import { GET_PRODUCT_BY_HANDLE } from '../lib/queries';
import type { ShopifyProduct } from '../types/shopify';

export const useProduct = (handle: string) => {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: () => shopifyFetch<{ product: ShopifyProduct }>(GET_PRODUCT_BY_HANDLE, { handle }),
    select: (data) => data.product,
    enabled: !!handle,
  });
};
