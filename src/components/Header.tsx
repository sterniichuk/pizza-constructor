import React, {} from 'react';
import '../styles/Header.scss';


function Header() {
    return (
        <>
            <header className="sticky">
                <div className="left-header row">
                    <div className="company-name">
                        Mr. Silver
                    </div>
                    <div className="left-header-buttons-wrapper row">
                        <div className="checkout-button">
                            Promo
                        </div>
                        <div className="checkout-button">
                            Pizza
                        </div>
                        <div className="checkout-button">
                            Drinks
                        </div>
                        <div className="checkout-button">
                            Dessert
                        </div>
                    </div>
                </div>

                <div className="right-header-buttons">
                    <button className="checkout-button">
                        Checkout
                    </button>
                    <button className="login-button">
                        Login
                    </button>
                </div>
            </header>
        </>
    );
}

export default Header;
