import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  width: 160px;
  height: 80px;
  background-color: #1a1a1a;
  border-radius: 5px;
  padding: 20px;
  color: white;
  font-family: Arial;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
`;

const CardChip = styled.div`
  width: 30px;
  height: 20px;
  background-color: #CBBA64;
  border-radius: 3px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const CardNumberWrapper = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  width: 100%;
  overflow: hidden;
`;

const CardNumber = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 13px;
  text-align: center;
  letter-spacing: 0.1em;
  white-space: nowrap;
`;

const CardNumberItem = styled.span`
  display: inline-block;
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardInfoItem = styled.div`
  font-size: 12px;
`;

const formatCardNumber = (number) => {
  if (typeof number !== 'string') {
    number = String(number);
  }
  number = number.replace(/\D/g, '');
  const parts = number.match(/.{1,4}/g) || [];

  return parts.map((part, index) => (
    index < 2 ? part : '●'.repeat(part.length)
  )).join(' ');
};

const CreditCard = ({cardNumber = '', expiryDate = '', cardholderName = ''}) => {
  const cardNumberString = String(cardNumber).replace(/\D/g, '');
  const isCardNumberComplete = cardNumberString.length === 16;

  const formattedCardNumber = isCardNumberComplete ? formatCardNumber(cardNumberString) : '';

  const cardNumberGroups = formattedCardNumber.split(' ').map((group, idx) => (
    <CardNumberItem key={idx}>{group}</CardNumberItem>
  ));

  const formattedExpiryDate = expiryDate.trim() ? expiryDate : '';

  return (
    <CardWrapper>
      <CardChip/>
      {/*{isCardNumberComplete && (*/}
      {/*  <CardNumberWrapper>*/}
      {/*    <CardNumber>*/}
      {/*      {cardNumberGroups}*/}
      {/*    </CardNumber>*/}
      {/*  </CardNumberWrapper>*/}
      {/*)}*/}
      <CardNumberWrapper>
        <CardNumber>
          {isCardNumberComplete ? cardNumberGroups : ' '}
        </CardNumber>
      </CardNumberWrapper>
      <CardInfo>
        <CardInfoItem>
          <div>{cardholderName === '' ? 'NAME' : cardholderName}</div>
        </CardInfoItem>
        <CardInfoItem>
          <div>{formattedExpiryDate === '' ? 'MM / YY' : formattedExpiryDate}</div>
        </CardInfoItem>
      </CardInfo>
    </CardWrapper>
  );
};

export default CreditCard;
