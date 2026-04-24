export interface ShopifyImage { url: string; altText: string | null; }
export interface ShopifyPrice { amount: string; currencyCode: string; }
export interface ShopifyVariant {
  id: string; title: string; availableForSale: boolean;
  price: ShopifyPrice; compareAtPrice?: ShopifyPrice;
  selectedOptions: { name: string; value: string }[];
}
export interface ShopifyProduct {
  id: string; title: string; handle: string;
  description: string; descriptionHtml?: string;
  priceRange: { minVariantPrice: ShopifyPrice };
  compareAtPriceRange: { minVariantPrice: ShopifyPrice };
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
  options?: { id: string; name: string; values: string[] }[];
  tags: string[]; vendor: string; productType: string;
}
export interface ShopifyCollection {
  id: string; title: string; handle: string;
  image?: ShopifyImage;
  products: { edges: { node: Partial<ShopifyProduct> }[] };
}
export interface CartItem {
  variantId: string; productId: string; title: string;
  variantTitle: string; price: number; image: string; quantity: number;
}
