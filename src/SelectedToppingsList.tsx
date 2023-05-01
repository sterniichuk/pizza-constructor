import React from 'react';
import closeInCircle from "./img/cancel.svg";
import './styles/Calculator.scss';

interface Props {
    toppings: string[]

    callbackMap?: Map<string, () => void>
}


function notDefinedCallback(t: string) {
    console.log("callback of " + t + "is not defined")
}

function notDefinedCallbackMap(t: string[]): Map<string, () => void> {
    const map = new Map<string, () => void>()
    t.forEach(t => map.set(t, () => notDefinedCallback(t)))
    return map;
}


function SelectedToppingsList({toppings, callbackMap = notDefinedCallbackMap(toppings)}: Props) {
    function handleClick(topping: string) {
        const callback = callbackMap?.get(topping);
        if (callback) {
            callback();
        }else {
            console.log("callback is not defined")
        }
        console.log("invoked deleting of " + topping + " from the list");
    }

    return (
        <ul className="row">{toppings.map((topping, index) => (
            <li key={topping + "Selected" + index} className="selected-topping-in-the-list row">
                <img src={closeInCircle}
                     onClick={() => {
                         return handleClick(topping);
                     }}
                     alt={"close " + topping}/>
                <p>{topping}</p>
            </li>
        ))}</ul>
    );
}

export default SelectedToppingsList;