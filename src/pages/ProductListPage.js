import React from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';

const PageContainer = styled.div`
    max-width: 100%;
    width: 430px;
    margin: 0 auto;
    padding: 23px;
    box-sizing: border-box;
`;

const ProductListPage = ({ addToCart }) => {
    const products = [
        {
            id: 1,
            brand: '브랜드A',
            description: '편안하고 착용감이 좋은 신발',
            price: '35,000',
            imageUrl: '/assets/images/product_image1.jpg'
        },
        {
            id: 2,
            brand: '브랜드A',
            description: '힙한 컬러가 매력적인 신발',
            price: '25,000',
            imageUrl: '/assets/images/product_image2.jpg'
        },
        {
            id: 3,
            brand: '브랜드B',
            description: '편안하고 착용감이 좋은 신발',
            price: '35,000',
            imageUrl: '/assets/images/product_image3.jpg'
        },
        {
            id: 4,
            brand: '브랜드B',
            description: '힙한 컬러가 매력적인 신발',
            price: '35,000',
            imageUrl: '/assets/images/product_image4.jpg'
        },
        {
            id: 5,
            brand: '브랜드C',
            description: '편안하고 착용감이 좋은 신발',
            price: '35,000',
            imageUrl: '/assets/images/product_image5.jpg'
        },
        {
            id: 6,
            brand: '브랜드C',
            description: '힙한 컬러가 매력적인 신발',
            price: '35,000',
            imageUrl: '/assets/images/product_image6.jpg'
        },
    ];

    return (
        <PageContainer>
            <div style={{fontSize:'30px', fontWeight:800, marginBottom:'7px'}}>신발 상품 목록</div>
            <div style={{fontSize:'16px', fontWeight:400, marginBottom: '30px'}}>현재 {products.length}개의 상품이 있습니다.</div>
            <ProductList products={products} addToCart={addToCart} />
        </PageContainer>
    );
};

export default ProductListPage;
