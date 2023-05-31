import React, {} from 'react';
import '../styles/Header.scss';
import cart from "../img/cart.svg"
import {Link} from "react-router-dom";

interface Props {
    cartSum: number
    clientId?: number
}


function Header({cartSum, clientId = -1}: Props) {
    return (
        <>
            <header className="sticky">
                <div className="left-header row">
                    <Link to={`/?clientId=${clientId}&cartSum=${cartSum}`} className="company-name">
                        Mr. Silver
                    </Link>
                    <div className="left-header-buttons-wrapper row">
                        <Link to={`/?clientId=${clientId}&cartSum=${cartSum}`} className="checkout-button">
                            Promo
                        </Link>
                        <Link to={`/?clientId=${clientId}&cartSum=${cartSum}`} className="checkout-button">
                            Pizza
                        </Link>
                        <Link to={`/?clientId=${clientId}&cartSum=${cartSum}`} className="checkout-button">
                            Drinks
                        </Link>
                        <Link to={`/?clientId=${clientId}&cartSum=${cartSum}`} className="checkout-button">
                            Dessert
                        </Link>
                    </div>
                </div>

                <div className="right-header-buttons">
                    <button className={"cart-sum"}>
                        <img src={cart} alt="cart"/>
                        <p>{cartSum} uah</p>
                    </button>
                    <Link className="checkout-button" to={{
                        pathname: "/checkout",
                        search: `?clientId=${clientId}`,
                    }}>
                        Checkout
                    </Link>
                    <button className="login-button">
                        Login
                    </button>
                </div>
            </header>
        </>
    );
}

export default Header;
