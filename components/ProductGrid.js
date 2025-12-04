import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p>No products to display</p>;
  }
  
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}