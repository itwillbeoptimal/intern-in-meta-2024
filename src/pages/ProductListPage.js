import React from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
import { useCart } from './CartContext';

const PageContainer = styled.div`
  padding: 23px;
`;

const ProductListPage = ({ products, openMyCardsModal }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      brand: product.brand,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl
    }, 1);
  };

  return (
    <PageContainer>
      <div style={{ fontSize: '30px', fontWeight: 800, marginBottom: '7px' }}>신발 상품 목록</div>
      <div style={{ fontSize: '16px', fontWeight: 400, marginBottom: '30px' }}>현재 {products.length}개의 상품이 있습니다.</div>
      <ProductList
        products={products}
        addToCart={handleAddToCart}
        openMyCardsModal={openMyCardsModal}
      />
    </PageContainer>
  );
};

export default ProductListPage;
