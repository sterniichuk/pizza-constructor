import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header from "./components/Header";
import Cart from "./components/cart/Cart";
import Footer from "./components/Footer";
import {CartResponse, defaultCart} from "./data/OrderRequest";
import {getParams} from "./App";
import {useNavigate} from 'react-router-dom';
import {defaultAddress} from "./data/Address";
import {PropsState} from "./data/PropsState";

interface Props {
    clientId?: number
}

function getCart(clientId: number): Promise<CartResponse> {
    const url = `http://localhost:8080/api/v1/cart?clientId=${clientId}`;
    return fetch(url, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to get cart");
            }
            return response.json();
        })
        .then(data => {
            return data as CartResponse;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        })
}

function CartPage({clientId = -1}: Props) {
    const navigate = useNavigate();
    const [cartResponse, setCartResponse] = useState(defaultCart);
    const clientIdRef = useRef(clientId);

    const assignClientId = useCallback((v: number) => {
        clientIdRef.current = v;
    }, []);

    useEffect(() => {
        if (clientIdRef.current <= 0) {
            const queryParams: URLSearchParams = new URLSearchParams(window.location.search);
            getParams('clientId', "-1", queryParams, x => assignClientId(x));
        }
    }, [assignClientId]);

    useEffect(() => {
        if (clientIdRef.current <= 0) {
            alert("First put something in your cart");
            navigate('/');
        } else {
            getCart(clientIdRef.current)
                .then(response => {
                    setCartResponse(response);
                });
        }
    }, [navigate]);
    const [address, setAddress] = useState(defaultAddress);
    const cartProps: PropsState<CartResponse> = {value: cartResponse, setValue: setCartResponse};
    return (
        <>
            <Header clientId={clientIdRef.current} cartSum={cartResponse.cartSum}></Header>
            <Cart address={address} setAddress={setAddress} cart={cartProps}/>
            <Footer/>
        </>
    );
}

export default CartPage;