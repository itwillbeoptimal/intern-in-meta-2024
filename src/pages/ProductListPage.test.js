import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductListPage from './ProductListPage';

test('renders ProductListPage component', () => {
  render(<ProductListPage addToCart={jest.fn()} />);
  const headerElement = screen.getByText(/신발 상품 목록/i);
  expect(headerElement).toBeInTheDocument();
  const productCountElement = screen.getByText(/현재 6개의 상품이 있습니다./i);
  expect(productCountElement).toBeInTheDocument();
});
