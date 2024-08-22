import React from 'react';
import styled from 'styled-components';
import { useCart } from "./CartContext";
import { ReactComponent as MinusButton } from '../assets/icons/minus_button.svg';
import { ReactComponent as PlusButton } from '../assets/icons/plus_button.svg';

const Page = styled.div`
  font-family: sans-serif;
  padding: 23px;
`;

const ItemList = styled.ul`
  width: 100%;
  min-width: 300px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  display: flex;
  border-bottom: 1px solid lightgray;
  padding: 20px 0;
`;

const ItemImage = styled.img`
  width: 140px;
  height: 135px;
  border-radius: 30px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
`;

const ItemName = styled.div`
  margin: 0 0 10px;
  color: #000;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`;

const ItemPrice = styled.div`
  margin: 0 0 25px;
  color: #202020;
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.3px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const Quantity = styled.div`
  width: 50px;
  text-align: center;
  font-family: Sansation;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  margin-top: 3px;
`;

const Summary = styled.div`
  font-family: Sansation;
  font-weight: 700;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #242424;
  box-shadow: 0 10px 20px 0 rgba(48, 48, 48, 0.25);  
  color: #fff;
  border: none;
  border-radius: 48px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 35px;
`;

const CartItem = ({item, onUpdateQuantity}) => (
  <Item>
    <ItemImage src={item.imageUrl} alt={item.description}/>
    <ItemDetails>
      <ItemName>{item.brand}</ItemName>
      <ItemPrice>{parseFloat(item.price).toLocaleString()}원</ItemPrice>
      <QuantityControl>
        <MinusButton style={{cursor: "pointer"}} onClick={() => onUpdateQuantity(item.id, -1)} />
        <Quantity>{item.quantity}</Quantity>
        <PlusButton style={{cursor: "pointer"}} onClick={() => onUpdateQuantity(item.id, 1)} />
      </QuantityControl>
    </ItemDetails>
  </Item>
);

const CartPage = () => {
  const {items, updateQuantity, total = 0, shipping = 0} = useCart();

  return (
    <Page>
      <div style={{fontSize: '30px', fontWeight: 800, marginBottom: '7px'}}>장바구니</div>
      <div style={{fontSize: '16px', fontWeight: 400, marginBottom: '15px'}}>현재 {items.length}개의 상품이 있습니다.</div>
      <ItemList>
        {items.map(item => (
          <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity}/>
        ))}
      </ItemList>
      <Summary style={{borderBottom: '1px solid lightgray', marginBottom: 12}}>
        <SummaryRow style={{marginBottom: 7}}>
          <span style={{ fontWeight: 600 }}>상품 금액</span>
          <span style={{ fontSize: 24 }}>{total.toLocaleString()}원</span>
        </SummaryRow>
        <SummaryRow style={{marginBottom: 12}}>
          <span style={{ fontWeight: 600 }}>배송비</span>
          <span style={{ fontSize: 24 }}>{shipping.toLocaleString()}원</span>
        </SummaryRow>
      </Summary>
      <Summary>
        <SummaryRow>
          <div style={{ fontWeight: 600 }}>총 금액</div>
          <div style={{ fontSize: 24 }}>{(total + shipping).toLocaleString()}원</div>
        </SummaryRow>
      </Summary>
      <CheckoutButton>결제하기</CheckoutButton>
    </Page>
  );
};

export default CartPage;
