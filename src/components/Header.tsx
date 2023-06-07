import React from 'react';
import '../styles/Header.scss';
import cart from "../img/cart.svg"
import {PropsState} from "../data/PropsState";

interface Props {
    cartSum: number
    backToMain: () => void;
    goToCheckout: () => void;
    showLogin: PropsState<boolean>
    tokenProps: PropsState<string>
}


function Header({cartSum, showLogin, backToMain, goToCheckout, tokenProps}: Props) {

    function flipFlag() {
        showLogin.setValue((x) => !x);
    }

    const loggedIn = tokenProps.value.length > 0;
    const loginButton = <button className="login-button" onClick={flipFlag}>
        Login
    </button>;

    function out() {
        tokenProps.setValue(() => "");
    }

    const outButton = <button className="login-button" onClick={out}>
        Out
    </button>;
    const button = loggedIn ? outButton : loginButton;
    return (
        <header className="sticky">
            <div className="left-header row">
                <div onClick={backToMain} className="company-name">
                    Mr. Silver
                </div>
                <div className="left-header-buttons-wrapper row">
                    <div onClick={backToMain} className="checkout-button">
                        Promo
                    </div>
                    <div onClick={backToMain} className="checkout-button">
                        Pizza
                    </div>
                    <div onClick={backToMain} className="checkout-button">
                        Drinks
                    </div>
                    <div onClick={backToMain} className="checkout-button">
                        Dessert
                    </div>
                </div>
            </div>

            <div className="right-header-buttons">
                <button className={"cart-sum"}>
                    <img src={cart} alt="cart"/>
                    <p>{cartSum} uah</p>
                </button>
                <div className="checkout-button" onClick={goToCheckout}>
                    Checkout
                </div>
                {button}
            </div>
        </header>
    );
}

export default Header;
