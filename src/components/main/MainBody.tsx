import React, {useState} from 'react';
import '../../styles/MainBody.scss';
import image from "../../img/pizza-img.webp"
import Calculator from "./Calculator";
import BottomSection from "./BottomSection";
import {OrderItemCallback} from "./OrderItemCallback";
import {OrderRequest, OrderResponse} from "../../data/OrderRequest";

function addToCartOnServer(order: OrderRequest, token: string): Promise<OrderResponse> {
    const url = "http://localhost:8080/api/v1/order";

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(order),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to add order to cart");
            }
            return response.json();
        })
        .then(data => {
            return data as OrderResponse;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        });
}

interface Props {
    setCartSum: (x: (x: number) => number) => void;
    token?: string
    callLogin: () => void
}

function MainBody({setCartSum, token = "", callLogin}: Props) {
    const [toppings, setToppings] = useState<string[]>([]);
    const callbackMap = new Map<string, OrderItemCallback>();

    function clearAll() {
        toppings.forEach(x => {
            const callbackHolder = callbackMap.get(x);
            if (callbackHolder !== undefined) {
                const emptyFunc = (x: number) => console.log(x + "callback to clear is empty");
                const setValue = callbackHolder.setValueTopping || emptyFunc;
                setValue(0);
            }
        })
        setToppings([]);
        setCurrentSum(initialState);
    }

    const initialState = 166;
    const [currentSum, setCurrentSum] = useState(initialState);
    const [order, setOrder] = useState<OrderRequest>({
        size: "",
        dough: "",
        toppings: [""],
    });


    function handleAddToCart() {
        if (token?.length < 1) {
            alert("First login")
            callLogin();
            return;
        }
        addToCartOnServer(order, token).then(response => {
            console.log("response: " + response.cartSum);
            setOrder(order => ({...order, toppings: [""]}))
            setCartSum(() => response.cartSum);
            clearAll();
        })
    }

    return (
        <main>
            <div className="image-calculator-pair">
                <img className="pizza-img" src={image} alt="chees-pizza"/>
                <Calculator setCurrentSum={setCurrentSum} setToppings={setToppings} callbackMap={callbackMap}
                            toppings={toppings} order={({value: order, setValue: setOrder})}/>
            </div>
            <BottomSection currentSum={currentSum} currency={"uah"} clearAll={clearAll}
                           addToCart={handleAddToCart}></BottomSection>
        </main>
    );
}

export default MainBody;