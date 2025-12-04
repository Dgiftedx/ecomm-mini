import { renderHook, act } from '@testing-library/react-hooks';
import { CartProvider, useCart } from '../components/CartProvider';

describe('CartProvider', () => {
  it('should add items to cart', () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: '1',
        title: 'Test Product',
        price: 1000,
        qty: 1,
        image: '/test.jpg',
        slug: 'test-product'
      });
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual({
      id: '1',
      title: 'Test Product',
      price: 1000,
      qty: 1,
      image: '/test.jpg',
      slug: 'test-product'
    });
  });

  it('should update item quantity', () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: '1',
        title: 'Test Product',
        price: 1000,
        qty: 1,
        image: '/test.jpg',
        slug: 'test-product'
      });
    });

    act(() => {
      result.current.updateQty('1', 3);
    });

    expect(result.current.cart[0].qty).toBe(3);
  });

  it('should calculate total correctly', () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        id: '1',
        title: 'Test Product 1',
        price: 1000,
        qty: 2,
        image: '/test1.jpg',
        slug: 'test-product-1'
      });
    });

    act(() => {
      result.current.addItem({
        id: '2',
        title: 'Test Product 2',
        price: 1500,
        qty: 1,
        image: '/test2.jpg',
        slug: 'test-product-2'
      });
    });

    expect(result.current.getTotal()).toBe(3500); // (1000 * 2) + (1500 * 1) = 3500
  });
});