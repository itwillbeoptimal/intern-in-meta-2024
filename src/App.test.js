import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const headerElement = screen.getByText(/신발 상품 목록/i);
  expect(headerElement).toBeInTheDocument();
});

test('adds and removes items from cart', () => {
  render(<App />);
  const addButton = screen.getAllByText(/담기/i)[0];
  fireEvent.click(addButton);

  let cartInfo = screen.getByText(/1/i);
  expect(cartInfo).toBeInTheDocument();

  fireEvent.click(addButton);
  expect(cartInfo).not.toBeInTheDocument();
});
