import Link from 'next/link';
import { useCart } from './CartProvider';

export default function Layout({ children }) {
  const { cart } = useCart();
  
  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <Link href="/" className="logo">
            <h1>MiniShop</h1>
          </Link>
          <nav>
            <Link href="/cart" className="cart-link">
              Cart {cartItemCount > 0 && <span className="cart-count">({cartItemCount})</span>}
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} MiniShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}