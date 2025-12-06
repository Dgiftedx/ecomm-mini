import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../components/CartProvider';

export default function CartPage() {
  const { cart, removeItem, updateQty, getTotal, clearCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  // Format price as Nigerian Naira
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Create WhatsApp message
    let message = 'Hi, I want to place an order:\n';
    
    cart.forEach(item => {
      // Ensure item has the required properties
      if (item && item.title && item.qty && item.price) {
        const itemTotal = item.price * item.qty;
        message += `- ${item.title} x${item.qty} — ${formatPrice(itemTotal)}\n`;
      }
    });
    
    const total = getTotal();
    message += `Total: ${formatPrice(total)}\n`;
    message += `Name: ${name}\n`;
    message += `Address: ${address}\n`;
    message += `Preferred delivery time: ${deliveryTime}`;
    
    // Get WhatsApp number from environment variable
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    
    if (!whatsappNumber) {
      // For local testing, show an alert with the message that would be sent
      alert(`WhatsApp number not configured. This is the message that would be sent:\n\n${message}`);
      // Clear cart after "successful" checkout in local testing
      clearCart();
      return;
    }
    
    // Open WhatsApp with pre-filled message
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // Clear cart after successful checkout
    clearCart();
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

  return (
    <div>
      <Head>
        <title>Shopping Cart - MiniShop</title>
        <meta name="description" content="Your shopping cart" />
      </Head>

      <div className="container cart-page">
        <h1>Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div>
            <p>Your cart is empty</p>
            <Link href="/">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div>
              {cart.map((item) => {
                // Ensure item has required properties
                if (!item || !item.id) return null;
                
                return (
                  <div key={item.id} className="cart-item">
                    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                      <Image
                        src={getImageSrc(item.image)}
                        alt={item.title || 'Product image'}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="cart-item-image"
                        onError={({ currentTarget }) => {
                          // Handle image loading errors gracefully
                          currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+UHJvZHVjdCBJbWFnZTwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                    </div>
                    <div className="cart-item-details">
                      <Link href={`/products/${item.slug || ''}`}>
                        <h3 className="cart-item-title">{item.title || 'Untitled Product'}</h3>
                      </Link>
                      <p className="cart-item-price">{formatPrice(item.price || 0)}</p>
                      <div className="cart-item-actions">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                        >
                          -
                        </button>
                        <span>{item.qty || 1}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                        >
                          +
                        </button>
                        <button 
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <p>Subtotal: {formatPrice(getTotal())}</p>
              <p>Shipping: Free</p>
              <p><strong>Total: {formatPrice(getTotal())}</strong></p>
              
              <h3>Delivery Information</h3>
              <div>
                <div>
                  <label>Name:</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                  />
                </div>
                <div>
                  <label>Address:</label>
                  <textarea 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Delivery address"
                    style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                  />
                </div>
                <div>
                  <label>Preferred Delivery Time:</label>
                  <input 
                    type="text" 
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    placeholder="When would you like delivery?"
                    style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
                  />
                </div>
              </div>
              
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Checkout via WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}