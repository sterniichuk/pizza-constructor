import React from 'react';
import {CartResponse} from "../../data/OrderRequest";
import OrderList from "./OrderList";
import {PropsState} from "../../data/PropsState";

interface Props {
    value: number
    cart: PropsState<CartResponse>
    token:string
}

function OrderListWrapper({value, cart, token = ""}: Props) {
    return (
        <div className={"order-list-wrapper"}>
            <h3 className={"your-order-title"}>Your order</h3>
            <p className={"minimal-price-attention"}>Minimal price for delivery {value} UAH</p>
            <OrderList token={token} cart={cart}/>
        </div>
    );
}

export default OrderListWrapper;