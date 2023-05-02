import React from 'react';
import closeInCircle from "../img/cancel.svg";
import '../styles/Calculator.scss';

interface Props {
    toppings: string[]

    callbackMap?: Map<string, () => void>
}

function SelectedToppingsList({toppings, callbackMap}: Props) {
    function handleClick(topping: string) {
        const badValue = () => {console.log("callback in the map is not defined")};
        const callback = callbackMap?.get(topping) || badValue;
        callback();
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