import fs from 'fs';
import path from 'path';

export default function TestPage({ products }) {
  return (
    <div>
      <h1>Test Page</h1>
      <p>Number of products: {products?.length || 0}</p>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}

export async function getStaticProps() {
  // Read the products data directly from the file system
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const productsData = JSON.parse(jsonData);
  
  // Make sure we're returning an array
  const products = Array.isArray(productsData) ? productsData : [];
  
  return {
    props: {
      products
    }
  };
}