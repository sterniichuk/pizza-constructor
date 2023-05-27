import React from 'react';
import Header from "./components/Header";
import Cart from "./components/cart/Cart";
import Footer from "./components/Footer";

function CartPage() {
    return (
        <>
            <Header></Header>
            <Cart/>
            <Footer/>
        </>
    );
}

export default CartPage;