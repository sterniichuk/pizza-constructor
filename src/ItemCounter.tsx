import React from 'react';
import './styles/Calculator.scss';
import minusImage from "./img/minus.svg";
import plusImage from "./img/plus.svg";

function ItemCounter() {
    return (
        <div className="item-counter row">
            <div className="sign minus">
                <img className="sign-image" src={minusImage} alt="minus"/>
            </div>
            <p>0</p>
            <div className="sign plus">
                <img className="sign-image" src={plusImage} alt="plus"/>
            </div>
        </div>
    );
}

export default ItemCounter;