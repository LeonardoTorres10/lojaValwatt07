import { useMutation } from '@tanstack/react-query';
import { shopifyFetch } from '../lib/shopify';
import { CHECKOUT_CREATE } from '../lib/queries';
import type { CartItem } from '../types/shopify';

export const useCheckout = () => {
  return useMutation({
    mutationFn: async (items: CartItem[]) => {
      const lineItems = items.map(item => ({ variantId: item.variantId, quantity: item.quantity }));
      const data = await shopifyFetch<{ checkoutCreate: { checkout: { webUrl: string }; checkoutUserErrors: { message: string }[] } }>(
        CHECKOUT_CREATE, { input: { lineItems } }
      );
      if (data.checkoutCreate.checkoutUserErrors.length > 0) {
        throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
      }
      return data.checkoutCreate.checkout;
    },
    onSuccess: (checkout) => { window.location.href = checkout.webUrl; },
  });
};
