import React, {useState} from 'react';
import styled from 'styled-components';
import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";

const AppContainer = styled.div`
    font-family: "Montserrat", sans-serif;
    width: 100%;
    min-height: 100vh; /* 화면 전체 높이를 최소 높이로 설정 */
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
`

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (productId, isAdded) => {
        if (!isAdded) {
            const updatedCartItems = cartItems.filter(item => item.id !== productId);
            setCartItems(updatedCartItems);
        } else {
            const productToAdd = {
                id: productId,
                quantity: 1
            };
            setCartItems([...cartItems, productToAdd]);
        }
    };

    return (
        <AppContainer>
            <Header cartItems={cartItems} />
            <ProductListPage addToCart={addToCart} />
        </AppContainer>
    );
};

export default App;
