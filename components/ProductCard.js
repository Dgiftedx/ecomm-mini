import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  // Format price as Nigerian Naira
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  // Use a fallback image if the primary image fails to load
  const getImageSrc = (imagePath) => {
    // If it's already a full URL, use it as is
    if (imagePath && imagePath.startsWith && imagePath.startsWith('http')) {
      return imagePath;
    }
    // For local images, use the path directly
    return imagePath || '/products/placeholder.jpg';
  };

  const imageSrc = getImageSrc(product.images?.[0]);

  return (
    <div className="product-card">
      <Link href={`/products/${product.slug}`}>
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          <Image
            src={imageSrc}
            alt={product.title || 'Product image'}
            fill
            style={{ objectFit: 'cover' }}
            className="product-image"
            onError={({ currentTarget }) => {
              // Handle image loading errors gracefully
              currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+UHJvZHVjdCBJbWFnZTwvdGV4dD48L3N2Zz4=';
            }}
          />
        </div>
      </Link>
      <div className="product-info">
        <Link href={`/products/${product.slug}`}>
          <h3 className="product-title">{product.title}</h3>
        </Link>
        <p className="product-price">{formatPrice(product.price || 0)}</p>
        <p className="product-description">
          {product.description?.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
      </div>
    </div>
  );
}