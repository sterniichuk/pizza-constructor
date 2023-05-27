import React from 'react';
import '../../styles/Calculator.scss';

interface Props {
    currentSum: number
    currency: string
    clearAll: () => void;
}

function BottomSection({currentSum, currency, clearAll}: Props) {
    function handleClear() {
        clearAll();
        console.log("Clear");
    }

    return (
        <div className="bottom-section-wrapper">
            <div className="sum-wrapper row">
                <div className="sum-title">Sum:</div>
                <div className="sum-value">{currentSum} {currency}</div>
            </div>
            <div className="bottom-buttons-pair row">
                <div className="bottom-button clear-bottom-button" onClick={handleClear}>
                    <p>Clear</p>
                </div>
                <div className="bottom-button add-to-cart-bottom-button">
                    <p>Add to cart</p>
                </div>
            </div>
        </div>
    );
}

export default BottomSection;