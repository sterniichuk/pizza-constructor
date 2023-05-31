import React, {useState} from 'react';
import '../../styles/Calculator.scss';
import minusImage from "../../img/minus.svg";
import minusInactiveImage from "../../img/minus_inactive.svg";
import plusImage from "../../img/plus.svg";
import plusInactiveImage from "../../img/plus_inactive.svg";
import {OrderItemCallback} from "./OrderItemCallback";
import {ToppingInfo} from "../../data/ToppingInfo";

interface Props {
    max?: number

    addTopping(): void

    deleteTopping(): void

    map: Map<string, OrderItemCallback>

    topping: ToppingInfo
}

console.log("out")
function ItemCounter({max = 3, addTopping, deleteTopping, map, topping}: Props) {
    const [counter, setCounter] = useState(0);

    function add(x: number) {
        if(!topping.isAvailable()){
            return;
        }
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
        map.set(topping.name, getOrderItemCallback())
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
                <img className="sign-image" src={topping.isAvailable()? minusImage : minusInactiveImage} alt="minus"/>
            </div>
            <p>{counter}</p>
            <div className="sign plus" onClick={() => add(1)}>
                <img className="sign-image" src={topping.isAvailable()? plusImage : plusInactiveImage} alt="plus"/>
            </div>
        </div>
    );
}

export default ItemCounter;