import React from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';

const PageContainer = styled.div`
  padding: 23px;
`;

const ProductListPage = ({ products, addToCart, openMyCardsModal }) => {
  return (
    <PageContainer>
      <div style={{ fontSize:'30px', fontWeight:800, marginBottom:'7px' }}>신발 상품 목록</div>
      <div style={{ fontSize:'16px', fontWeight:400, marginBottom: '30px' }}>현재 {products.length}개의 상품이 있습니다.</div>
      <ProductList products={products} addToCart={addToCart} openMyCardsModal={openMyCardsModal} />
    </PageContainer>
  );
};

export default ProductListPage;
