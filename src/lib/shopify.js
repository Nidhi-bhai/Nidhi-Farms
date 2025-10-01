// Shopify Storefront API Configuration
// Replace these values with your actual Shopify store credentials

const SHOPIFY_STORE_DOMAIN = process.env.VITE_SHOPIFY_STORE_DOMAIN || 'your-store.myshopify.com'
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'your-storefront-access-token'

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`

// GraphQL query to fetch products
const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`

// GraphQL query to fetch a single product by handle
const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`

// Function to make GraphQL requests to Shopify
async function shopifyFetch({ query, variables = {} }) {
  try {
    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const json = await response.json()

    if (json.errors) {
      throw new Error(json.errors[0].message)
    }

    return json.data
  } catch (error) {
    console.error('Shopify API Error:', error)
    throw error
  }
}

// Fetch all products
export async function getProducts(count = 10) {
  try {
    const data = await shopifyFetch({
      query: PRODUCTS_QUERY,
      variables: { first: count },
    })

    return data.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      handle: node.handle,
      price: `₹${parseFloat(node.priceRange.minVariantPrice.amount).toFixed(0)}`,
      image: node.images.edges[0]?.node.url || '',
      altText: node.images.edges[0]?.node.altText || node.title,
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    // Return empty array if API fails
    return []
  }
}

// Fetch a single product by handle
export async function getProductByHandle(handle) {
  try {
    const data = await shopifyFetch({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    })

    const product = data.productByHandle

    if (!product) {
      return null
    }

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      handle: product.handle,
      price: `₹${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`,
      images: product.images.edges.map(({ node }) => ({
        url: node.url,
        altText: node.altText || product.title,
      })),
      variants: product.variants.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        price: `₹${parseFloat(node.priceV2.amount).toFixed(0)}`,
        availableForSale: node.availableForSale,
      })),
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Check if Shopify is configured
export function isShopifyConfigured() {
  return (
    SHOPIFY_STORE_DOMAIN !== 'your-store.myshopify.com' &&
    SHOPIFY_STOREFRONT_ACCESS_TOKEN !== 'your-storefront-access-token'
  )
}
