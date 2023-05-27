import React, {useState} from 'react';
import '../../styles/Calculator.scss';
import minusImage from "../../img/minus.svg";
import plusImage from "../../img/plus.svg";
import {OrderItemCallback} from "./OrderItemCallback";

interface Props {
    max?: number

    addTopping(): void

    deleteTopping(): void

    map: Map<string, OrderItemCallback>

    topping: string
}

function ItemCounter({max = 3, addTopping, deleteTopping, map, topping}: Props) {
    const [counter, setCounter] = useState(0);

    function add(x: number) {
        const result = counter + x;
        if (result > max || result < 0) {
            return;
        }
        switch (x) {
            case -1:
                deleteTopping()
                break;
            case 1:
                addTopping()
                break;
            default:
                throw new Error("Illegal increment");
        }
        setCounter(result);
    }

    const setCallback = () => {
        console.log("set callback for " + topping)
        map.set(topping, getOrderItemCallback())
    }

    function getOrderItemCallback(): OrderItemCallback {
        return {
            decrementTopping: () => {
                console.log("fucking invoked " + topping)
                add(-1)
            },
            setValueTopping: (value) => {
                setCounter(value)
            }
        }
    }

    setCallback();
    return (
        <div className="item-counter row">
            <div className="sign minus" onClick={() => add(-1)}>
                <img className="sign-image" src={minusImage} alt="minus"/>
            </div>
            <p>{counter}</p>
            <div className="sign plus" onClick={() => add(1)}>
                <img className="sign-image" src={plusImage} alt="plus"/>
            </div>
        </div>
    );
}

export default ItemCounter;