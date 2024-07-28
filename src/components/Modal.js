import React from 'react';
import styled from 'styled-components';
import {ReactComponent as BackIcon} from "../assets/icons/back_button.svg";
import {ReactComponent as CloseIcon} from "../assets/icons/close_button.svg";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 8px;
  width: 90%;
  max-width: 375px;
  height: 90%;
  max-height: 700px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.div`
  flex: 1;
  color: #383838;
  font-size: 16px;
  text-align: left;
  margin-top: 1.5px;
  margin-left: 10px;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

const Modal = ({ onClose, onBack, title, children, showBackButton }) => {
  return (
    <Overlay>
      <ModalContent>
        <Header>
          {showBackButton && <BackButton onClick={onBack}><BackIcon /></BackButton>}
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Header>
        {children}
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
