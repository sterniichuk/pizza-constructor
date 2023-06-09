import React, {useEffect, useState} from 'react';
import SwitchDeliveryType from "./SwitchDeliveryType";
import DeliveryForm from "./DeliveryForm";
import OrderListWrapper from "./OrderListWrapper";
import BottomMenu from "./BottomMenu";
import '../../styles/Cart.scss';
import {DeliveryType} from "../../data/CartData";
import {Address, defaultLocation1, defaultLocations, RestaurantLocation} from "../../data/Address";
import {
    CalculateWithDeliveryResponse,
    CartResponse,
    defaultSum,
    Order,
    OrderState,
    TimeToWaitResponse
} from "../../data/OrderRequest";
import {PropsState} from "../../data/PropsState";
import CarryOutForm from "./CarryOutFrom";
import Timer from "./Timer";


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
                throw new Error("Failed to getMinimum");
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

function getWaitingTime(token: string): Promise<TimeToWaitResponse> {
    const url = `http://localhost:8080/api/v1/cart/check-status`;
    return fetch(url, {
        method: "GET",
        headers: {
            Authorization: token
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("getWaitingTime");
            }
            return response.json();
        })
        .then(data => {
            return data as TimeToWaitResponse;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        })
}

function checkoutDelivery(token: string, address: Address): Promise<CartResponse> {
    const url = `http://localhost:8080/api/v1/cart/checkout/delivery`;
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
                throw new Error("Failed to checkoutDelivery");
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

function checkoutCarryOut(token: string): Promise<CartResponse> {
    const url = `http://localhost:8080/api/v1/cart/checkout/carryout`;
    return fetch(url, {
        method: "PUT",
        headers: {
            Authorization: token
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to checkoutCarryOut");
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
    const orderListIsEmpty = "Nothing to pay for:(";
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

    function checkout() {
        if (goodsPrice <= 0) {
            return;
        }
        let cartResponsePromise: Promise<CartResponse>;
        if (deliveryType === DeliveryType.Delivery) {
            cartResponsePromise = checkoutDelivery(token, address);
        } else {
            cartResponsePromise = checkoutCarryOut(token);
        }
        cartResponsePromise
            .then(newCart => {
                cart.setValue(() => newCart);
            })
    }

    const [time, setTime] = useState(0);
    useEffect(() => {
        if (cart.value.orders.length === 0) {
            return;
        }

        function findOrderToWait(orders: Order[]) {
            for (let i = 0; i < orders.length; i++) {
                const x = orders[i];
                console.log(x);
                if ((x.state > OrderState.STORED && x.state < OrderState.ORDER_DONE)) {
                    return true;
                }
            }
            return false;
        }
        let frequency = 20;
        if(time <= 20){
            frequency = 2;
        }
        if (time % frequency === 0) {
            console.log("10 sec");
            const find: boolean = findOrderToWait(cart.value.orders)
            if (find !== undefined) {
                console.log("found working order");
                const fetchData = async () => {
                    try {
                        const response = await getWaitingTime(token);
                        const data = await response;
                        if (data.seconds === 0 && time === 0) {
                            return;
                        }
                        cart.setValue(() => response.cart);
                        setTime(data.seconds);
                        return data.seconds;
                    } catch (error) {
                        console.error('Error fetching data:', error);
                        return -1;
                    }
                };
                fetchData().then(r => console.log(r));
            }
        }
    }, [cart, token, time]);
    const timer = time !== 0 ? <Timer time={({value: time, setValue: setTime})}></Timer> : null;
    return (
        <div className="cart-body">
            <h1 className={"cart-title"}>To cart</h1>
            <SwitchDeliveryType deliveryType={deliveryType} setDeliveryType={setDeliveryType}/>
            {timer}
            <div className="order-list-and-address-wrapper">
                {formOfGettingOrder}
                <OrderListWrapper token={token} cart={cart} value={minimalPrice}/>
            </div>
            <BottomMenu checkout={checkout} error={({value: errorMessage, setValue: setErrorMessage})}
                        calculate={calculateTotalSumWithDelivery} cartStateProps={cartStateProps} token={token}
                        backToMain={backToMain} goodsPrice={goodsPrice}
                        totalPriceWithDelivery={totalSum}/>
        </div>
    );
}

export default Cart;