import React, { useState, useRef } from 'react';
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

const Label = styled.div`
  color: #525252;
  font-family: Arial;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -1.02px;
  margin: 8.5px 0;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ECEBF1;
  border: none;
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
  margin-top: 20px;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background: #242424;
  box-shadow: 0 10px 20px 0 rgba(48, 48, 48, 0.1);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
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

    if (value.length > 2) {
      value = value.slice(0, 2);
    }

    if (value.length === 1) {
      setExpiryMonth(value);
    } else if (value.length === 2) {
      if (parseInt(value, 10) > 12) {
        setExpiryMonth('12');
      } else {
        setExpiryMonth(value);
      }
    }
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

  const handleCardOwnerChange = (e) => {
    const value = e.target.value;
    const filteredValue = value
      .toUpperCase()
      .replace(/[^A-Z\s]/g, '');
    setCardOwner(filteredValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullCardNumber = cardNumber.join('');

    if (fullCardNumber.length !== 16) {
      alert("카드 번호를 정확히 입력하여 주십시오.");
      return;
    }
    if (expiryYear.length !== 2) {
      alert("만료일 연도를 정확히 입력하여 주십시오.");
      return;
    }
    if (cvc.length !== 3) {
      alert("보안 코드를 정확히 입력하여 주십시오.");
      return;
    }

    const fullPasswordPrefix = passwordPrefix.join('');
    onAddCard({ cardNumber: fullCardNumber, expiry: `${expiryMonth} / ${expiryYear}`, cvc, cardOwner, passwordPrefix: fullPasswordPrefix });
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
        <Label> 카드 번호 </Label>
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
        <Label> 만료일 </Label>
        <ExpiryInputContainer>
          <Input
            style={{ width: "3ch", textAlign: "center" }}
            type="text"
            value={expiryMonth}
            placeholder="MM"
            onChange={handleExpiryMonthChange}
            onBlur={handleExpiryMonthBlur}
            ref={expiryMonthRef}
            required
            maxLength="2"
          />
          <Input
            style={{ width: "3ch", textAlign: "center" }}
            type="text"
            value={expiryYear}
            placeholder="YY"
            onChange={handleExpiryYearChange}
            ref={expiryYearRef}
            required
            maxLength="2"
          />
        </ExpiryInputContainer>
        <Label> 보안 코드(CVC/CVV) </Label>
        <Input
          style={{ width: "4.5ch", textAlign: "center", letterSpacing: 3 }}
          type="password"
          value={cvc}
          onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
          required
          maxLength="3"
        />
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Label> 카드 소유자 이름 </Label>
          <Label> {cardOwner.length + " / 30"} </Label>
        </div>
        <Input
          type="text"
          value={cardOwner}
          placeholder="카드에 표시된 이름과 동일하게 입력하세요."
          onChange={handleCardOwnerChange}
          required
          maxLength="30"
        />
        <Label> 카드 비밀번호 </Label>
        <PasswordInputContainer>
          {[0, 1].map((index) => (
            <Input
              style={{width: "1.5ch", textAlign: "center"}}
              type="password"
              key={index}
              value={passwordPrefix[index]}
              onChange={(e) => handlePasswordPrefixChange(index, e.target.value)}
              required
              maxLength="1"
            />
          ))}
          <div style={{
            marginBottom: 10,
            padding: 10,
            borderRadius: 4,
            fontFamily: "Arial"
          }}>
            •
          </div>
          <div style={{
            marginBottom: 10,
            padding: 10,
            borderRadius: 4,
            fontFamily: "Arial"
          }}>
            •
          </div>
        </PasswordInputContainer>
        <SubmitButton type="submit">작성 완료</SubmitButton>
      </Form>
    </ModalContainer>
  );
};

export default AddCardModal;
