import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useCart } from '../../components/CartProvider';
import productsData from '../../data/products.json';

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [notification, setNotification] = useState(null);
  const { addItem } = useCart();

  // Format price as Nigerian Naira
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      qty: quantity,
      image: product.images[0],
      slug: product.slug
    });

    // Show notification
    setNotification(`${product.title} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  // Ensure product title is a string
  const pageTitle = product && typeof product.title === 'string' 
    ? `${product.title} - MiniShop` 
    : 'Product - MiniShop';

  if (!product) {
    return <div>Product not found</div>;
  }

  // Use a fallback image if the primary image fails to load
  const getImageSrc = (imagePath) => {
    // If it's already a full URL, use it as is
    if (imagePath && imagePath.startsWith && imagePath.startsWith('http')) {
      return imagePath;
    }
    // For local images, use the path directly
    return imagePath || '/products/placeholder.jpg';
  };

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={product.description} />
      </Head>

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="container">
        <div className="product-detail">
          {/* Product Images */}
          <div className="product-images">
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
              <Image
                src={getImageSrc(product.images[selectedImage])}
                alt={product.title || 'Product image'}
                fill
                style={{ objectFit: 'cover' }}
                className="product-main-image"
                onError={({ currentTarget }) => {
                  // Handle image loading errors gracefully
                  currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+UHJvZHVjdCBJbWFnZTwvdGV4dD48L3N2Zz4=';
                }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="thumbnail-container">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    style={{ position: 'relative', width: '80px', height: '80px', margin: '5px', cursor: 'pointer' }}
                    className={selectedImage === index ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={getImageSrc(image)}
                      alt={`${product.title || 'Product'} ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onError={({ currentTarget }) => {
                        // Handle image loading errors gracefully
                        currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+UHJvZHVjdCBJbWFnZTwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h1>{product.title}</h1>
            <p className="product-price">{formatPrice(product.price || 0)}</p>
            <p>{product.description}</p>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="quantity-input"
              />
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = productsData.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = productsData.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  // Ensure the product data is properly formatted
  const cleanProduct = {
    id: product.id || '',
    slug: product.slug || '',
    title: product.title || 'Untitled Product',
    description: product.description || '',
    price: product.price || 0,
    images: Array.isArray(product.images) ? product.images : ['/products/placeholder.jpg']
  };

  return {
    props: {
      product: cleanProduct,
    },
  };
}