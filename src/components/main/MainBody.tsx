import React, {useState} from 'react';
import '../../styles/MainBody.scss';
import image from "../../img/pizza-img.webp"
import Calculator from "./Calculator";
import BottomSection from "./BottomSection";
import {OrderItemCallback} from "./OrderItemCallback";
import {OrderRequest} from "../../data/OrderRequest";

function MainBody() {
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

    const initialState = 180;
    const [currentSum, setCurrentSum] = useState(initialState);
    // const [clientId, setClientId] = useState(-1);
    const [order, setOrder] = useState<OrderRequest>({
        amount: 1,
        size: "",
        dough: "",
        toppings: [""],
    });
    return (
        <main>
            <div className="image-calculator-pair row">
                <img className="pizza-img" src={image} alt="chees-pizza"/>
                <Calculator setCurrentSum={setCurrentSum} setToppings={setToppings} callbackMap={callbackMap}
                            toppings={toppings} setOrder={setOrder}/>
            </div>
            <BottomSection currentSum={currentSum} currency={"uah"} clearAll={clearAll}></BottomSection>
        </main>
    );
}

export default MainBody;