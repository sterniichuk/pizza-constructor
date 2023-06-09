import React from 'react';
import {CartResponse, Order, OrderState} from "../../data/OrderRequest";
import ItemCounter from "../main/ItemCounter";
import {ToppingInfo} from "../../data/ToppingInfo";
import pizzaImg from "../../img/pizza-img.webp";
import {ChangeAmountRequest} from "../../data/CartData";
import {PropsState} from "../../data/PropsState";
import trashImg from "../../img/trash.svg"

interface Props {
    cart: PropsState<CartResponse>
    token?: string
}

function changeAmountRequest(body: ChangeAmountRequest, token: string): Promise<CartResponse> {
    const url = `http://localhost:8080/api/v1/cart/change-amount`;
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
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

function deleteOrderRequest(token: string, orderId: number): Promise<CartResponse> {
    const url = `http://localhost:8080/api/v1/cart/delete-order?orderId=${orderId}`;
    return fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: token
        },
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

function OrderList({cart, token = ""}: Props) {
    function changeAmountOnDiff(orderId: number, diff: number) {
        changeAmountRequest({orderId: orderId, isPositiveChange: diff > 0}, token)
            .then(newCart => {
                cart.setValue(() => newCart);
            })
    }

    function deleteOrder(orderId: number) {
        deleteOrderRequest(token, orderId)
            .then(newCart => {
                cart.setValue(() => newCart);
            })
    }

    const orders = cart.value.orders;

    function getColor(o: Order) {
        if (OrderState.STORED === o.state) {
            return "black-color";
        } else if (o.state > OrderState.STORED && o.paid && o.state < OrderState.DELIVERING) {
            return "yellow-color";
        } else if (!o.paid) {
            return "red-color";
        }
        return "green-color";
    }

    return (
        <ol className={"list-of-orders-wrapper"}>
            {orders.map((o) => {
                const topping: ToppingInfo = new ToppingInfo({name: o.data.size, price: o.price, max: (o.amount + 1)});
                const status = o.state !== OrderState.STORED || o.paid ? o.state.toString() : "Not paid";
                const color: string = getColor(o);
                const orderMenuValue = <div className="order-settings">
                    <ItemCounter min={1} initial={o.amount} max={o.amount + 1}
                                 addTopping={() => changeAmountOnDiff(o.orderId, 1)}
                                 deleteTopping={() => changeAmountOnDiff(o.orderId, -1)}
                                 topping={topping}/>
                    <p className="price-of-order">{o.price} uah</p>
                    <div className="delete-order" onClick={() => deleteOrder(o.orderId)}>
                        <img src={trashImg} alt="delete"/>
                    </div>
                </div>;
                const orderMenu = !o.paid ? orderMenuValue : null;
                const toppingsOfOrder =o.data.toppings.length === 0? "" : o.data.toppings.reduce((p, c) => (p + " " + c));
                return <li key={"o.orderId: " + o.orderId} className={"order-in-cart-list"}>
                    <div className="order-image">
                        <img src={pizzaImg} alt="pizza"/>
                    </div>
                    <div className="info-and-settings">
                        <div className="info">
                            <div className="first-info-row">
                                <p className="order-title">{o.data.size}</p>
                                <div className="status-wrapper">
                                    <p className={"status-title"}>Status: </p>
                                    <p className={"status-value " + color}>{status}</p>
                                </div>
                            </div>
                            <p className={"dough-order"}>{o.data.dough}</p>
                            <p className={"toppings-of-order"}>{toppingsOfOrder}</p>
                        </div>
                        {orderMenu}
                    </div>
                </li>
            })}
        </ol>
    );
}

export default OrderList;