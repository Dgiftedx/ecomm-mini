import Head from 'next/head';
import ProductGrid from '../components/ProductGrid';
import fs from 'fs';
import path from 'path';

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>MiniShop - Online Store</title>
        <meta name="description" content="Browse our collection of quality products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <h1>Our Products</h1>
        <p>Number of products: {products?.length || 0}</p>
        {products && products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    // Read the products data directly from the file system
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const productsData = JSON.parse(jsonData);
    
    // Make sure we're returning an array and clean the data
    const products = Array.isArray(productsData) 
      ? productsData.map(product => ({
          id: product.id || '',
          slug: product.slug || '',
          title: product.title || 'Untitled Product',
          description: product.description || '',
          price: product.price || 0,
          images: Array.isArray(product.images) ? product.images : ['/products/placeholder.jpg']
        }))
      : [];
    
    return {
      props: {
        products
      }
    };
  } catch (error) {
    console.error('Error loading products:', error);
    return {
      props: {
        products: []
      }
    };
  }
}