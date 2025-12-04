import Link from 'next/link';

export default function ProductCard({ product }) {
  // Format price as Nigerian Naira
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  return (
    <div className="product-card">
      <div style={{ height: '200px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span>Product Image</span>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className="product-description">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
        <Link href={`/products/${product.slug}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}
