import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

const product = {
  id: 1,
  brand: '브랜드A',
  description: '편안하고 착용감이 좋은 신발',
  price: 35000,
  imageUrl: '/assets/images/product_image1.jpg'
};

test('renders ProductCard component', () => {
  render(<ProductCard {...product} addToCart={jest.fn()} />);
  const brandElement = screen.getByText(/브랜드A/i);
  expect(brandElement).toBeInTheDocument();
  const descriptionElement = screen.getByText(/편안하고 착용감이 좋은 신발/i);
  expect(descriptionElement).toBeInTheDocument();
  const priceElement = screen.getByText(/35,000원/i);
  expect(priceElement).toBeInTheDocument();
});

test('add to cart button toggles', () => {
  const addToCartMock = jest.fn();
  render(<ProductCard {...product} addToCart={addToCartMock} />);
  const button = screen.getByText(/담기/i);

  fireEvent.click(button);
  expect(button).toHaveTextContent('담음!');
  expect(addToCartMock).toHaveBeenCalledWith(1, true);

  fireEvent.click(button);
  expect(button).toHaveTextContent('담기');
  expect(addToCartMock).toHaveBeenCalledWith(1, false);
});
