import { useQuery } from '@tanstack/react-query';
import { shopifyFetch } from '../lib/shopify';
import { GET_COLLECTIONS } from '../lib/queries';
import type { ShopifyCollection } from '../types/shopify';

export const useCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: () => shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>(GET_COLLECTIONS),
    select: (data) => data.collections.edges.map(e => e.node),
  });
};
