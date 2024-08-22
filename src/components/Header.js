import React from 'react';
import styled from 'styled-components';
import {ReactComponent as BasketIcon} from "../assets/icons/basket_icon.svg";
import {ReactComponent as BackButton} from "../assets/icons/header_back_button.svg";
import {useNavigate, useLocation} from 'react-router-dom';
import {useCart} from '../pages/CartContext';

const HeaderContainer = styled.header`
  display: flex;
  background-color: black;
  height: 70px;
  margin-bottom: 9px;
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

const BasketContainer = styled.div`
  padding: 10px 25px;
  cursor: pointer;
`;

const CartInfo = styled.div`
  position: absolute;
  top: 35px;
  right: 16px;
  background-color: white;
  color: black;
  border-radius: 50%;
  width: 19px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {items} = useCart();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleBackClick = () => {
    navigate(-1);
  };

  const showBackButton = location.pathname !== '/';

  return (<HeaderContainer>
      {showBackButton ? <div style={{padding: 25, cursor: "pointer"}}>
        <BackButton onClick={handleBackClick}/>
      </div> : <div/>}
      <BasketContainer onClick={() => navigate('/cart')}>
        <BasketIcon/>
        {cartItemCount !== 0 && <CartInfo>{cartItemCount}</CartInfo>}
      </BasketContainer>
    </HeaderContainer>);
};

export default Header;
