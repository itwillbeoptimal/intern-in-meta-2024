import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Modal from './components/Modal';
import MyCardsModal from './modals/MyCardsModal';
import AddCardModal from './modals/AddCardModal';

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
  const [cartItems, setCartItems] = useState([]);
  const [cards, setCards] = useState([]);
  const [modalStack, setModalStack] = useState([]);

  const products = [
    { id: 1, brand: '브랜드A', description: '편안하고 착용감이 좋은 신발', price: '35,000', imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image1.jpg' },
    { id: 2, brand: '브랜드A', description: '힙한 컬러가 매력적인 신발', price: '25,000', imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image2.jpg' },
    { id: 3, brand: '브랜드B', description: '편안하고 착용감이 좋은 신발', price: '35,000', imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image3.jpg' },
    { id: 4, brand: '브랜드B', description: '힙한 컬러가 매력적인 신발', price: '35,000', imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image4.jpg' },
    { id: 5, brand: '브랜드C', description: '편안하고 착용감이 좋은 신발', price: '35,000', imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image5.jpg' },
    { id: 6, brand: '브랜드C', description: '힙한 컬러가 매력적인 신발', price: '35,000', imageUrl: process.env.PUBLIC_URL + '/assets/images/product_image6.jpg' },
  ];

  const addToCart = (productId, quantity) => {
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      const updatedCartItems = cartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCartItems(updatedCartItems);
    } else {
      const productToAdd = {
        id: productId,
        quantity: quantity
      };
      setCartItems([...cartItems, productToAdd]);
    }
  };

  const addCard = (cardData) => {
    const newCard = {
      ...cardData,
      id: Date.now().toString()
    };
    setCards(prevCards => [...prevCards, newCard]);
    closeModal();
  };

  const selectCard = (selectedCard) => {
    console.log('결제 진행:', selectedCard);
    setCartItems([]);
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

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContainer>
        <Header cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<ProductListPage products={products} addToCart={addToCart} openMyCardsModal={openMyCardsModal} />} />
          <Route path="/product/:id" element={<ProductDetailPage products={products} addToCart={addToCart} />} />
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
  );
};

export default App;
