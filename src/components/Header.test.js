import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders Header component with zero items', () => {
  render(<Header cartItems={[]} />);
  const cartInfo = screen.queryByText(/0/i);
  expect(cartInfo).toBeNull(); // or expect(cartInfo).not.toBeInTheDocument();
});

test('renders Header component with cart items', () => {
  render(<Header cartItems={[{ id: 1, quantity: 2 }]} />);
  const cartInfo = screen.getByText(/2/i);
  expect(cartInfo).toBeInTheDocument();
});
