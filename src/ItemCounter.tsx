import React, {useState} from 'react';
import './styles/Calculator.scss';
import minusImage from "./img/minus.svg";
import plusImage from "./img/plus.svg";

interface Props {
    max?: number

    addTopping(): void

    deleteTopping(): void
}

function ItemCounter({max = 3, addTopping, deleteTopping}: Props) {
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