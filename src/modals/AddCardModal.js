import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CreditCard from "../components/CreditCard";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: Arial;
`;

const CardNumberContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const PasswordInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ExpiryInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SubmitButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const CardPreview = styled.div`
  margin-bottom: 20px;
`;

const AddCardModal = ({ onAddCard, onClose }) => {
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardOwner, setCardOwner] = useState('');
  const [passwordPrefix, setPasswordPrefix] = useState(['', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const expiryMonthRef = useRef(null);
  const expiryYearRef = useRef(null);

  const handleCardNumberChange = (index, value) => {
    const newCardNumber = [...cardNumber];
    newCardNumber[index] = value.replace(/\D/g, '').slice(0, 4);
    setCardNumber(newCardNumber);

    if (value.length === 4 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleExpiryMonthChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    setExpiryMonth(value.slice(0, 2));
  };

  const handleExpiryMonthBlur = () => {
    if (expiryMonth.length === 1) {
      setExpiryMonth('0' + expiryMonth);
    }
  };

  const handleExpiryYearChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setExpiryYear(value.slice(0, 2));
  };

  const handlePasswordPrefixChange = (index, value) => {
    const newPrefix = [...passwordPrefix];
    newPrefix[index] = value.replace(/\D/g, '').slice(0, 1);
    setPasswordPrefix(newPrefix);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCardNumber = cardNumber.join('');
    const expiry = expiryMonth && expiryYear ? `${expiryMonth} / ${expiryYear}` : '';
    const fullPasswordPrefix = passwordPrefix.join('');
    onAddCard({ cardNumber: fullCardNumber, expiry, cvc, cardOwner, passwordPrefix: fullPasswordPrefix });
    onClose();
  };

  return (
    <ModalContainer>
      <CardPreview>
        <CreditCard
          cardNumber={cardNumber}
          expiryDate={expiryMonth && expiryYear ? `${expiryMonth} / ${expiryYear}` : ''}
          cardholderName={cardOwner}
          securityCode={cvc}
          passwordPrefix={passwordPrefix.join('')}
        />
      </CardPreview>
      <Form onSubmit={handleSubmit}>
        <CardNumberContainer>
          {[0, 1, 2, 3].map((index) => (
            <Input
              style={{ width: "5ch", textAlign: "center" }}
              key={index}
              ref={inputRefs[index]}
              type={index < 2 ? "text" : "password"}
              value={cardNumber[index]}
              onChange={(e) => handleCardNumberChange(index, e.target.value)}
              maxLength="4"
              required
            />
          ))}
        </CardNumberContainer>
        <ExpiryInputContainer>
          <Input
            style={{ width: "3ch", textAlign: "center" }}
            type="text"
            placeholder="MM"
            value={expiryMonth}
            onChange={handleExpiryMonthChange}
            onBlur={handleExpiryMonthBlur}
            ref={expiryMonthRef}
            required
            maxLength="2"
          />
          <Input
            style={{ width: "3ch", textAlign: "center" }}
            type="text"
            placeholder="YY"
            value={expiryYear}
            onChange={handleExpiryYearChange}
            ref={expiryYearRef}
            required
            maxLength="2"
          />
        </ExpiryInputContainer>
        <Input
          style={{ width: "4ch", textAlign: "center" }}
          type="password"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
          required
          maxLength="3"
        />
        <Input
          type="text"
          placeholder="카드 소유자 이름"
          value={cardOwner}
          onChange={(e) => setCardOwner(e.target.value)}
          required
          maxLength="30"
        />
        <PasswordInputContainer>
          {[0, 1].map((index) => (
            <Input
              style={{ width: "1.5ch", textAlign: "center" }}
              key={index}
              type="password"
              value={passwordPrefix[index]}
              onChange={(e) => handlePasswordPrefixChange(index, e.target.value)}
              required
              maxLength="1"
            />
          ))}
        </PasswordInputContainer>
        <SubmitButton type="submit">이 카드 정보 등록하기</SubmitButton>
      </Form>
    </ModalContainer>
  );
};

export default AddCardModal;
