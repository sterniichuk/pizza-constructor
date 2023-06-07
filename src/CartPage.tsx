import React, {useEffect, useRef, useState} from 'react';
import Cart from "./components/cart/Cart";
import {CartResponse, defaultCart} from "./data/OrderRequest";
import {defaultAddress} from "./data/Address";
import {PropsState} from "./data/PropsState";

interface Props {
    backToMain: () => void;
    token: string
    headerSum: PropsState<number>
}

function getCart(token: string): Promise<CartResponse> {
    const url = `http://localhost:8080/api/v1/cart`;
    return fetch(url, {
        method: "GET",
        headers:{
            Authorization: token
        }
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

function CartPage({backToMain, token = "", headerSum}: Props) {
    const [cartResponse, setCartResponse] = useState(defaultCart);
    const tokenRef = useRef(token);
    useEffect(() => {
        if (tokenRef.current.length <= 0) {
            alert("First login");
            backToMain();
        } else {
            getCart(tokenRef.current)
                .then(response => {
                    setCartResponse(response);
                });
        }
    }, [tokenRef, backToMain])

    const [address, setAddress] = useState(defaultAddress);
    const cartProps: PropsState<CartResponse> = {value: cartResponse, setValue: setCartResponse};
    return (<Cart headerSum={headerSum} address={address} token={token} setAddress={setAddress} backToMain={backToMain} cart={cartProps}/>);
}

export default CartPage;