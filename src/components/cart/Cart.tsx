import React, {useState} from 'react';
import SwitchDeliveryType from "./SwitchDeliveryType";
import DeliveryForm from "./DeliveryForm";
import OrderListWrapper from "./OrderListWrapper";
import BottomMenu from "./BottomMenu";
import '../../styles/Cart.scss';
import {DeliveryType} from "../../data/CartData";
import {Address} from "../../data/Address";
import {CartResponse} from "../../data/OrderRequest";
import {PropsState} from "../../data/PropsState";


interface Props {
    address: Address,
    setAddress: (func: (a: Address) => Address) => void
    cart: PropsState<CartResponse>
}
function Cart({address, setAddress, cart}: Props) {
    const [deliveryType, setDeliveryType] = useState(DeliveryType.CarryOut);
    const[minimalPrice, setMinimalPrice] = useState(200);
    return (
        <div className="cart-body">
            <h1 className={"cart-title"}>To cart</h1>
            <SwitchDeliveryType deliveryType={deliveryType} setDeliveryType={setDeliveryType}/>
            <div className="order-list-and-address-wrapper">
                <DeliveryForm address={address} setAddress={setAddress}/>
                <OrderListWrapper cart={cart} value={minimalPrice}/>
            </div>
            <BottomMenu/>
        </div>
    );
}

export default Cart;