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

  &:hover {
    transform: scale(1.05);
  }
`;

const AddCardButton = styled.div`
  align-content: center;
  background-color: #E5E5E5;
  text-align: center;
  color: #575757;
  font-size: 30px;
  width: 200px;
  height: 120px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PayButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const MyCardsModal = ({ cards, openAddCardModal, onSelectCard }) => {
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
                cardNumber={card.cardNumber}
                expiryDate={card.expiry}
                cardholderName={card.cardOwner}
                securityCode={card.cvc}
                passwordPrefix={card.passwordPrefix}
              />
            </CardItem>
          ))}
        </CardList>
      )}
      <AddCardButton onClick={openAddCardModal}>
        +
      </AddCardButton>
      {cards.length > 0 && (
        <PayButton onClick={() => handlePayment(cards[0])}>
          이 카드로 결제하기
        </PayButton>
      )}
    </ModalContainer>
  );
};

export default MyCardsModal;
