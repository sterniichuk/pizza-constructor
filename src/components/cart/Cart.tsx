import React, {useEffect, useState} from 'react';
import SwitchDeliveryType from "./SwitchDeliveryType";
import DeliveryForm from "./DeliveryForm";
import OrderListWrapper from "./OrderListWrapper";
import BottomMenu from "./BottomMenu";
import '../../styles/Cart.scss';
import {DeliveryType} from "../../data/CartData";
import {Address, defaultLocation1, defaultLocations, RestaurantLocation} from "../../data/Address";
import {CalculateWithDeliveryResponse, CartResponse, defaultSum} from "../../data/OrderRequest";
import {PropsState} from "../../data/PropsState";
import CarryOutForm from "./CarryOutFrom";


interface Props {
    address: Address,
    setAddress: (func: (a: Address) => Address) => void
    cart: PropsState<CartResponse>
    backToMain: () => void
    token?: string
    headerSum: PropsState<number>
}

export enum CartState {
    CALCULATE, CHECKOUT
}

function getMinimum(): Promise<number> {
    const url = `http://localhost:8080/api/v1/order/minimal-price`;
    return fetch(url, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to get cart");
            }
            return response.text();
        })
        .then(data => {
            return Number.parseInt(data) || -1;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        })
}

function getTotalPriceWithDelivery(token: string, address: Address): Promise<CalculateWithDeliveryResponse> {
    const url = `http://localhost:8080/api/v1/cart/calculate-with-delivery`;
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(address),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to get calculate on server");
            }
            return response.json();
        })
        .then(data => {
            return data as CalculateWithDeliveryResponse;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        })
}

function Cart({address, setAddress, cart, backToMain, token = "", headerSum}: Props) {
    const [deliveryType, setDeliveryType] = useState(DeliveryType.CarryOut);
    const [cartState, setCartState] = useState(CartState.CHECKOUT);
    const cartStateProps: PropsState<CartState> = ({value: cartState, setValue: setCartState});
    const [minimalPrice, setMinimalPrice] = useState(200);
    const defaultErrorMessage = "please enter your delivery address";
    const [isValidAddress, setIsValidAddress] = useState(false);
    const deliveryForm = <DeliveryForm isValid={({value: isValidAddress, setValue: setIsValidAddress})}
                                       calculate={calculateTotalSumWithDelivery} address={address}
                                       setAddress={setAddress}/>;
    const defaultRestaurant: RestaurantLocation = ({
        city: defaultLocation1.city,
        street: defaultLocation1.addresses[0]
    });
    const [restaurant, setRestaurant] = useState(defaultRestaurant);
    const carryOutForm = <CarryOutForm locations={defaultLocations}
                                       selectedLocation={{value: restaurant, setValue: setRestaurant}}/>;
    const formOfGettingOrder = deliveryType === DeliveryType.Delivery ? deliveryForm : carryOutForm;
    const [sum, setSum] = useState(defaultSum);
    const goodsPrice = Math.max(cart.value.cartSum, sum.goodsPrice);
    const totalSum = Math.max(cart.value.cartSum, sum.totalSum);
    const orderListIsEmpty = "Order list is empty";
    const initError = goodsPrice === 0 ? orderListIsEmpty : "";
    const [errorMessage, setErrorMessage] = useState(initError);
    useEffect(() => {
        getMinimum()
            .then(min => {
                setMinimalPrice(min);
            })
    }, [])

    function calculateTotalSumWithDelivery() {
        if (errorMessage.length > 1) {
            return;
        }
        getTotalPriceWithDelivery(token, address)
            .then(x => {
                setSum(x);
                setCartState(() => CartState.CHECKOUT)
            })
    }

    useEffect(() => {
        if (headerSum.value !== goodsPrice) {
            headerSum.setValue(() => goodsPrice);
        }
    }, [headerSum, goodsPrice])
    useEffect(() => {
        if (goodsPrice === 0 && errorMessage.length < 1) {
            setErrorMessage(orderListIsEmpty)
        } else if (goodsPrice > 0 && errorMessage === orderListIsEmpty) {
            setErrorMessage("");
        }
    }, [errorMessage, goodsPrice])
    useEffect(() => {
        if (deliveryType === DeliveryType.Delivery) {
            setCartState(CartState.CALCULATE);
            if (!isValidAddress) {
                setErrorMessage(defaultErrorMessage);
            } else {
                setErrorMessage("");
            }
        } else {
            setCartState(CartState.CHECKOUT);
            setErrorMessage("");
            setSum((s) => ({...s, totalSum: s.goodsPrice}))
        }
    }, [deliveryType, cart, isValidAddress])

    return (
        <div className="cart-body">
            <h1 className={"cart-title"}>To cart</h1>
            <SwitchDeliveryType deliveryType={deliveryType} setDeliveryType={setDeliveryType}/>
            <div className="order-list-and-address-wrapper">
                {formOfGettingOrder}
                <OrderListWrapper token={token} cart={cart} value={minimalPrice}/>
            </div>
            <BottomMenu error={({value: errorMessage, setValue: setErrorMessage})}
                        calculate={calculateTotalSumWithDelivery} cartStateProps={cartStateProps} token={token}
                        backToMain={backToMain} goodsPrice={goodsPrice}
                        totalPriceWithDelivery={totalSum}/>
        </div>
    );
}

export default Cart;