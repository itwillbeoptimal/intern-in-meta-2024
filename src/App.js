import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Modal from './components/Modal';
import MyCardsModal from './modals/MyCardsModal';
import AddCardModal from './modals/AddCardModal';
import { CartProvider } from "./pages/CartContext";

const AppContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
`;

const App = () => {
  const [cards, setCards] = useState([]);
  const [modalStack, setModalStack] = useState([]);

  const products = [
    { id: 1, brand: '브랜드A', description: '편안하고 착용감이 좋은 신발', price: 35000, imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image1.jpg' },
    { id: 2, brand: '브랜드A', description: '힙한 컬러가 매력적인 신발', price: 25000, imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image2.jpg' },
    { id: 3, brand: '브랜드B', description: '편안하고 착용감이 좋은 신발', price: 35000, imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image3.jpg' },
    { id: 4, brand: '브랜드B', description: '힙한 컬러가 매력적인 신발', price: 35000, imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image4.jpg' },
    { id: 5, brand: '브랜드C', description: '편안하고 착용감이 좋은 신발', price: 35000, imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image5.jpg' },
    { id: 6, brand: '브랜드C', description: '힙한 컬러가 매력적인 신발', price: 35000, imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image6.jpg' },
  ];

  const addCard = (cardData) => {
    const newCard = {
      ...cardData,
      id: Date.now().toString()
    };
    setCards(prevCards => [...prevCards, newCard]);
    goBack();
  };

  const selectCard = (selectedCard) => {
    console.log('결제 진행:', selectedCard);
    // setCartItems([]);
  };

  const openMyCardsModal = () => {
    setModalStack(prevStack => [
      ...prevStack,
      {
        title: '나의 카드 목록',
        content: <MyCardsModal cards={cards} openAddCardModal={openAddCardModal} onSelectCard={selectCard} />,
        isOpen: true
      }
    ]);
  };

  const openAddCardModal = () => {
    setModalStack(prevStack => [
      ...prevStack,
      {
        title: '새로운 카드 등록',
        content: <AddCardModal onAddCard={addCard} onClose={closeModal} />,
        isOpen: true
      }
    ]);
  };

  const closeModal = () => {
    setModalStack([]);
  };

  const goBack = () => {
    setModalStack(prevStack => prevStack.slice(0, -1));
  };

  useEffect(() => {
    const lastModal = modalStack[modalStack.length - 1];
    if (lastModal && lastModal.title === '나의 카드 목록') {
      setModalStack(prevStack => [
        ...prevStack.slice(0, -1),
        {
          ...lastModal,
          content: <MyCardsModal cards={cards} openAddCardModal={openAddCardModal} onSelectCard={selectCard} />
        }
      ]);
    }
  }, [cards]);

  return (
    <CartProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <AppContainer>
          <Header />
          <Routes>
            <Route path="/" element={<ProductListPage products={products} openMyCardsModal={openMyCardsModal} />} />
            <Route path="/product/:id" element={<ProductDetailPage products={products} />} />
            <Route path="/cart" element={<CartPage openMyCardsModal={openMyCardsModal} />} />
          </Routes>
          {modalStack.length > 0 && (
            <Modal
              onClose={closeModal}
              onBack={goBack}
              title={modalStack[modalStack.length - 1].title}
              showBackButton={modalStack.length > 1}
            >
              {modalStack[modalStack.length - 1].content}
            </Modal>
          )}
        </AppContainer>
      </Router>
    </CartProvider>
  );
};

export default App;
