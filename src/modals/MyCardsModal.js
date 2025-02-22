import React from 'react';
import styled from 'styled-components';
import CreditCard from "../components/CreditCard";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
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
`;

const AddCardButton = styled.div`
  background-color: #E5E5E5;
  border-radius: 5px;
  color: #575757;
  cursor: pointer;
  font-size: 30px;
  min-height: 120px;
  max-height: 120px;
  width: 200px;
  text-align: center;
  align-content: center;
`;


const PayButton = styled.button`
  background-color: #FFEF64;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: black;
  font-size: 12px;
  margin: 20px 0 10px;
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
