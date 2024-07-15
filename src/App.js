import React, {useState} from 'react';
import styled from 'styled-components';
import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";

const AppContainer = styled.div`
    font-family: "Montserrat", sans-serif;
    max-width: 430px;
    margin: 0 auto;
    padding: 20px;

    @media (max-width: 430px) { 
        overflow-x: auto;
        background-color: #f0f0f0;
    }
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
