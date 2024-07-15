import React, { useState } from 'react';
import styled from 'styled-components';

const ProductCardContainer = styled.div`
    border: 1px solid #ddd;
    border-radius: 12px;
    text-align: left;
    overflow: hidden;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 115px;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
`;

const ProductInfo = styled.div`
    margin: 20px;
`;

const ProductBrand = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin: 8px 0 7px;
`;

const ProductDescription = styled.div`
    color: #7C7A7A;
    font-size: 12px;
    font-weight: 400;
    margin: 0 0 7px;
    white-space: nowrap;
`;

const ProductPrice = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 7px;
`;

const AddButton = styled.button`
    background-color: ${props => props.isAdded ? '#d8d8d8' : 'black'};
    color: ${props => props.isAdded ? 'black' : 'white'};
    border: none;
    width: 48px;
    height: 24px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: -0.5px;
`;

const ProductCard = ({ id, brand, description, price, imageUrl, addToCart }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        setIsAdded(!isAdded);
        addToCart(id, !isAdded);
    };

    return (
        <ProductCardContainer>
            <ProductImage src={imageUrl} />
            <ProductInfo>
                <ProductBrand>{brand}</ProductBrand>
                <ProductDescription>{description}</ProductDescription>
                <ProductPrice>{price}원</ProductPrice>
                <AddButton onClick={handleAddToCart} isAdded={isAdded}>
                    {isAdded ? '담음!' : '담기'}
                </AddButton>
            </ProductInfo>
        </ProductCardContainer>
    );
};

export default ProductCard;
