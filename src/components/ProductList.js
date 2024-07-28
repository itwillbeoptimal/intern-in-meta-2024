import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const ProductListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const ProductList = ({products, addToCart, openMyCardsModal}) => (
  <ProductListContainer>
    {products.map((product) => (
      <ProductCard
        key={product.id}
        {...product}
        addToCart={addToCart}
        openMyCardsModal={openMyCardsModal}
      />
    ))}
  </ProductListContainer>
);

export default ProductList;
