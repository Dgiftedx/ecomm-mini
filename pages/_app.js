import '../styles/globals.css';
import { CartProvider } from '../components/CartProvider';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;