import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BasketIcon } from "../assets/icons/basket_icon.svg";

const HeaderContainer = styled.header`
    display: flex;
    background-color: black;
    height: 70px;
    margin-bottom: 9px;
    position: relative;
    align-items: center;
    justify-content: flex-end;
`;

const BasketContainer = styled.div`
    padding: 10px 25px 10px 25px;
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

const Header = ({ cartItems = [] }) => {
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <HeaderContainer>
            <BasketContainer>
                <BasketIcon />
            </BasketContainer>
            {cartItemCount !== 0 && <CartInfo>{cartItemCount}</CartInfo>}
        </HeaderContainer>
    );
};

export default Header;
