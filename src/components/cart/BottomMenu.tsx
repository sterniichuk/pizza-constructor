import React from 'react';
import {PropsState} from "../../data/PropsState";
import {CartState} from "./Cart";

interface Props {
    goodsPrice?: number
    totalPriceWithDelivery?: number
    clientId?: number
    backToMain: () => void
    token?: string
    cartStateProps: PropsState<CartState>
    error: PropsState<string>
    calculate: () => void
}

function BottomMenu({
                        cartStateProps,
                        goodsPrice = 0,
                        totalPriceWithDelivery = goodsPrice,
                        backToMain,
                        calculate,
                        error
                    }: Props) {
    const checkoutButton = <button
        className={"cart-bottom-button cart-bottom-button-red bottom-button"}>Checkout</button>;
    const calculateButton = <button
        className={"cart-bottom-button cart-bottom-button-red bottom-button"} onClick={calculate}>Calculate</button>;
    const redButton = cartStateProps.value === CartState.CHECKOUT ? checkoutButton : calculateButton;
    const totalSumInfo = (
        <div className="total-sum-info">
            <p className={"total-sum-title"}>Total sum: </p>
            <p className={"total-sum-value"}>{totalPriceWithDelivery}</p>
        </div>
    );
    const totalSum = cartStateProps.value === CartState.CHECKOUT ? totalSumInfo : null;
    return (
        <div className={"cart-bottom-menu"}>
            <div className="bottom-price-info">
                <p className={"goods-info"}>Goods worth: {goodsPrice}</p>
                {totalSum}
            </div>
            <div className="cart-bottom-button-pair">
                <div className={"cart-bottom-button bottom-button"} onClick={backToMain}>Return to menu</div>
                <span className="warning-active">{error.value}</span>
                {redButton}
            </div>
        </div>
    );
}

export default BottomMenu;