import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MinusButton } from '../assets/icons/minus_button.svg';
import { ReactComponent as PlusButton } from '../assets/icons/plus_button.svg';
import { useCart } from './CartContext';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 23px;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 350px;
  border-radius: 20px;
  object-fit: cover;

  @media (max-width: 400px) {
    width: 300px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;

  @media (max-width: 400px) {
    width: 300px;
  }
`;

const ProductInfo = styled.div`
  margin-top: 20px;
`;

const QuantitySelector = styled.div`
  display: flex;
  flex-direction: row;
  align-self: end;
  align-items: center;
  margin: 10px 0;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const AddToCartButton = styled.button`
  margin-top: 20px;
  width: 100%;
  height: 60px;
  border-radius: 30px;
  background: #242424;
  box-shadow: 0 10px 20px 0 rgba(48, 48, 48, 0.25);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
`;

const ProductDetailPage = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      brand: product.brand,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl
    }, quantity);
  };

  return (
    <DetailContainer>
      <ProductImage src={product.imageUrl} alt={product.description} />
      <InfoContainer>
        <ProductInfo>
          <div style={{ fontSize: '30px', fontFamily: 'Montserrat', fontWeight: 700 }}>{product.brand}</div>
          <div style={{ fontSize: '16px', fontFamily: 'Montserrat', fontWeight: 400, marginTop: '7px' }}>{product.description}</div>
          <div style={{ fontSize: '20px', fontFamily: 'Montserrat', fontWeight: 500, marginTop: '10px' }}>{product.price.toLocaleString()}원</div>
        </ProductInfo>
        <QuantitySelector>
          <QuantityButton onClick={handleDecrease}>
            <MinusButton />
          </QuantityButton>
          <div style={{ fontSize: '18px', fontFamily: 'Montserrat', fontWeight: 600, padding: '15px', width: '1em', textAlign: 'center' }}>{quantity.toString().padStart(2, '0')}</div>
          <QuantityButton onClick={handleIncrease}>
            <PlusButton />
          </QuantityButton>
        </QuantitySelector>
        <AddToCartButton onClick={handleAddToCart}>
          장바구니 담기
        </AddToCartButton>
      </InfoContainer>
    </DetailContainer>
  );
};

export default ProductDetailPage;
