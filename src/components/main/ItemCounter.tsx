import React, {useState} from 'react';
import '../../styles/Calculator.scss';
import minusImage from "../../img/minus.svg";
import minusInactiveImage from "../../img/minus_inactive.svg";
import plusImage from "../../img/plus.svg";
import plusInactiveImage from "../../img/plus_inactive.svg";
import {OrderItemCallback} from "./OrderItemCallback";
import {ToppingInfo} from "../../data/ToppingInfo";

export interface PropsI {
    max?: number
    min?: number
    initial?: number

    addTopping(): void

    deleteTopping(): void

    map?: Map<string, OrderItemCallback>

    topping: ToppingInfo
}

console.log("out")

function ItemCounter({max = 3, min = 0, initial = 0, addTopping, deleteTopping, map = undefined, topping}: PropsI) {
    const [counter, setCounter] = useState(initial);

    function add(x: number) {
        if (!topping.isAvailable()) {
            return;
        }
        const result = counter + x;
        if (result > max || result < min) {
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
        map?.set(topping.name, getOrderItemCallback())
    }

    function getOrderItemCallback(): OrderItemCallback {
        return {
            decrementTopping: () => {
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
                <img className="sign-image" src={topping.isAvailable() ? minusImage : minusInactiveImage} alt="minus"/>
            </div>
            <p>{counter}</p>
            <div className="sign plus" onClick={() => add(1)}>
                <img className="sign-image" src={topping.isAvailable() ? plusImage : plusInactiveImage} alt="plus"/>
            </div>
        </div>
    );
}

export default ItemCounter;