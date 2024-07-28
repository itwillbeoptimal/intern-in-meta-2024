import React from 'react';
import styled from 'styled-components';
import CreditCard from "../components/CreditCard";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const CardItem = styled.li`
  cursor: pointer;
  transition: transform 0.2s;
`;

const AddCardButton = styled.div`
  align-content: center;
  background-color: #E5E5E5;
  border: none;
  border-radius: 5px;
  color: #575757;
  cursor: pointer;
  display: flex;
  font-size: 30px;
  height: 120px;
  justify-content: center;
  text-align: center;
  width: 200px;
  align-items: center;
`;


const PayButton = styled.button`
  background-color: #FFEF64;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  height: auto;
  margin: 20px 0;
  padding: 10px 20px;
  width: 200px;
`;

const MyCardsModal = ({cards, openAddCardModal, onSelectCard}) => {
  const handlePayment = (card) => {
    onSelectCard(card);
  };

  return (
    <ModalContainer>
      {cards.length === 0 ? (
        <div style={{fontSize: 14, color: "#575757", fontWeight: 500, textAlign: "center", marginBottom: 9}}>
          새로운 카드를 등록해 주세요.
        </div>
      ) : (
        <CardList>
          {cards.map((card, index) => (
            <CardItem key={index} onClick={() => handlePayment(card)}>
              <CreditCard
                cardNumber={String(card.cardNumber)}
                expiryDate={card.expiry}
                cardholderName={card.cardOwner}
                securityCode={card.cvc}
                passwordPrefix={card.passwordPrefix}
              />
              <PayButton onClick={() => handlePayment(cards[index])}>
                이 카드로 결제하기
              </PayButton>
            </CardItem>
          ))}
        </CardList>
      )}
      <AddCardButton onClick={openAddCardModal}>
        +
      </AddCardButton>
    </ModalContainer>
  );
};

export default MyCardsModal;
