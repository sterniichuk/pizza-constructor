import React from 'react';
import {CartResponse} from "../../data/OrderRequest";
import ItemCounter from "../main/ItemCounter";
import {ToppingInfo} from "../../data/ToppingInfo";
import pizzaImg from "../../img/pizza-img.webp";
import {ChangeAmountRequest} from "../../data/CartData";
import {PropsState} from "../../data/PropsState";


interface Props {
    cart: PropsState<CartResponse>
}

function changeAmountRequest(body: ChangeAmountRequest): Promise<CartResponse> {
    const url = `http://localhost:8080/api/v1/cart/change-amount`;
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then(response => {
        if (!response.ok) {
            throw new Error("Failed to get cart");
        }
        return response.json();
    }).then(data => {
        return data as CartResponse;
    }).catch(error => {
        console.error("Error:", error);
        throw error;
    })
}

function OrderList({cart}: Props) {
    function changeAmountOnDiff(orderId: number, diff: number) {
        changeAmountRequest({clientId: cart.value.clientId, orderId: orderId, isPositiveChange: diff > 0})
            .then(newCart => {
                cart.setValue(() => newCart);
                return null;
            })
    }

    const orders = cart.value.orders;
    return (
        <ol className={"list-of-orders-wrapper"}>
            {orders.map((o) => {
                const topping: ToppingInfo = new ToppingInfo({name: o.data.size, price: o.price, max: (o.amount + 1)});
                return <li key={"o.orderId: " + o.orderId} className={"order-in-cart-list"}>
                    <div className="order-image">
                        <img src={pizzaImg} alt="pizza"/>
                    </div>
                    <div className="info-and-settings">
                        <div className="info">
                            <p className="order-title">{o.data.size}</p>
                            <p className={"dough-order"}>{o.data.dough}</p>
                            <p className={"toppings-of-order"}>{o.data.toppings.reduce((p, c) => (p + " " + c))}</p>
                        </div>
                        <div className="order-settings">
                            <ItemCounter min={1} initial={o.amount} max={o.amount + 1}
                                         addTopping={() => changeAmountOnDiff(o.orderId, 1)}
                                         deleteTopping={() => changeAmountOnDiff(o.orderId, -1)}
                                         topping={topping}/>
                            <p className="price-of-order">{o.price} uah</p>
                            <div className="delete-order" onClick={() => changeAmountOnDiff(o.orderId, -1)}>
                                <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" height="17"
                                     width="17">
                                    <g fill="#7E7E7E">
                                        <path
                                            d="M10.845 6.16a.398.398 0 00-.398.397v7.525a.398.398 0 00.796 0V6.557a.398.398 0 00-.398-.398zm-4.698 0a.398.398 0 00-.398.397v7.525a.398.398 0 00.796 0V6.557a.398.398 0 00-.398-.398z"></path>
                                        <path
                                            d="M2.723 5.06v9.81c0 .58.213 1.124.584 1.515.37.391.884.614 1.423.615h7.532a1.96 1.96 0 001.423-.615c.371-.391.584-.935.584-1.515V5.06a1.52 1.52 0 00-.39-2.99H11.84v-.498A1.564 1.564 0 0010.264 0H6.728a1.564 1.564 0 00-1.576 1.572v.498H3.113a1.521 1.521 0 00-.39 2.99zm9.54 11.143H4.73c-.681 0-1.21-.584-1.21-1.333V5.096h9.952v9.774c0 .749-.529 1.333-1.21 1.333zM5.947 1.573a.766.766 0 01.78-.777h3.536a.767.767 0 01.78.776v.498H5.948v-.498zM3.113 2.865H13.88a.717.717 0 110 1.434H3.113a.717.717 0 110-1.434z"></path>
                                        <path
                                            d="M8.496 6.16a.398.398 0 00-.398.397v7.525a.398.398 0 00.796 0V6.557a.398.398 0 00-.398-.398z"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </li>
            })}
        </ol>
    );
}

export default OrderList;