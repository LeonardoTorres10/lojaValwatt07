export const GET_PRODUCTS = `
  query GetProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      edges {
        cursor
        node {
          id title handle description
          priceRange { minVariantPrice { amount currencyCode } }
          compareAtPriceRange { minVariantPrice { amount currencyCode } }
          images(first: 3) { edges { node { url altText } } }
          variants(first: 10) {
            edges { node { id title availableForSale price { amount } selectedOptions { name value } } }
          }
          tags vendor productType
        }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id title handle descriptionHtml
      priceRange { minVariantPrice { amount currencyCode } }
      compareAtPriceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 20) {
        edges { node { id title availableForSale price { amount } compareAtPrice { amount } selectedOptions { name value } } }
      }
      options { id name values }
      tags vendor productType
    }
  }
`;

export const GET_COLLECTIONS = `
  query GetCollections {
    collections(first: 10) {
      edges {
        node {
          id title handle
          image { url altText }
          products(first: 4) {
            edges { node { id title handle priceRange { minVariantPrice { amount } } images(first: 1) { edges { node { url altText } } } } }
          }
        }
      }
    }
  }
`;

export const CHECKOUT_CREATE = `
  mutation CheckoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout { id webUrl totalPriceV2 { amount currencyCode } }
      checkoutUserErrors { code field message }
    }
  }
`;
