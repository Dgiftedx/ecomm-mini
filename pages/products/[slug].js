import { useState } from 'react';
import Head from 'next/head';
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
            <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span>Product Image</span>
            </div>
            {product.images.length > 1 && (
              <div className="thumbnail-container">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    style={{ width: '80px', height: '80px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5px', cursor: 'pointer' }}
                    className={selectedImage === index ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                  >
                    <span>{index + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h1>{product.title}</h1>
            <p className="product-price">{formatPrice(product.price)}</p>
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