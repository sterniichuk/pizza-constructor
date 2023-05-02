import React from 'react';
import '../styles/App.scss';
import '../styles/Footer.scss';
import tracker from '../img/tracker.svg'
import designer from '../img/pizza-designer.svg'
import locationSign from '../img/location.svg'
import visa from '../img/visa.webp'
import masterCard from '../img/mastercard.webp'

function Footer() {
    return (
        <footer className="row" id="footer">
            <ul>
                <li><a href="#footer">News</a></li>
                <li><a href="#footer">Career</a></li>
                <li><a href="#footer">Franchising</a></li>
                <li><a href="#footer">Domino's club</a></li>
            </ul>
            <ul>
                <li className="important-text"><a href="#footer">Services</a></li>
                <li className="row-with-image">
                    <a href="#footer">
                        <img src={tracker} alt="message-logo"/>
                        <p>Pizza Tracker</p>
                    </a>
                </li>
                <li className="row-with-image">
                    <a href="#footer">
                        <img src={designer} alt="pizza-logo"/>
                        <p>Pizza Designer</p>
                    </a>
                </li>
                <li className="important-text payment-support">
                    <a href="#footer">
                        <p>Payment support</p>
                        <div className="img-payment-wrapper row">
                            <img src={visa} className="visa-img" alt="visa"/>
                            <img src={masterCard} className="mastercard-img" alt="mastercard"/>
                        </div>
                    </a>
                </li>
            </ul>
            <ul>
                <li className="important-text">Useful information</li>
                <li><a href="#footer">Information on allergen content and nutritional value</a></li>
                <li><a href="#footer">Food safety policy</a></li>
                <li><a href="#footer">Privacy policy</a></li>
                <li><a href="#footer">Information policy</a></li>
            </ul>
            <ul>
                <li>
                    <address className="mobile-number">+1234567890</address>
                    <div className="mobile-fees">ACCORDING TO YOUR MOBILE OPERATOR FEES</div>
                </li>
                <li>No weekends from <time dateTime="10:00">10:00</time> to <time dateTime="20:00">20:00</time></li>
                <li>
                    <address>imaginarymail@lll.kpi.ua</address>
                </li>
                <li>Lorem ipsum</li>
                <li className="row">
                    <img src={locationSign} className="location-sing" alt="location sign"/>
                    <p className="city-in-footer">Rivne</p>
                </li>
                <li className="leave-review-button"><a href="#footer">Leave a review</a></li>
            </ul>
        </footer>
    );
}

export default Footer;