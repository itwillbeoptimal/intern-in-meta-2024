import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  width: 160px;
  height: 80px;
  background-color: #1a1a1a;
  border-radius: 5px;
  padding: 20px;
  color: white;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
`;

const CardChip = styled.div`
  width: 35px;
  height: 25px;
  background-color: #CBBA64;
  border-radius: 3px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const CardNumber = styled.div`
  font-size: 14px;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardInfoItem = styled.div`
  font-size: 12px;
`;

const formatCardNumber = (number) => {
  number = number.replace(/\D/g, '');
  const parts = number.match(/.{1,4}/g) || [];

  if (parts.length === 1) {
    return `${parts[0]}`;
  } else if (parts.length === 2) {
    return `${parts[0]} ${parts[1]}`;
  } else if (parts.length === 3) {
    return `${parts[0]} ${parts[1]} ${'●'.repeat(4)}`;
  } else if (parts.length >= 4) {
    return `${parts[0]} ${parts[1]} ${'●'.repeat(4)} ${'●'.repeat(4)}`;
  }
  return number;
};

const CreditCard = ({ cardNumber = '', expiryDate = '', cardholderName = '' }) => {
  const isCardNumberComplete = cardNumber.every(part => part.length === 4);
  const formattedExpiryDate = expiryDate.trim() ? expiryDate : '';

  return (
    <CardWrapper>
      <CardChip />
      {isCardNumberComplete && (
        <CardNumber>{formatCardNumber(cardNumber.join(''))}</CardNumber>
      )}
      <CardInfo>
        <CardInfoItem>
          <div>{cardholderName}</div>
        </CardInfoItem>
        <CardInfoItem>
          <div>{formattedExpiryDate}</div>
        </CardInfoItem>
      </CardInfo>
    </CardWrapper>
  );
};

export default CreditCard;
