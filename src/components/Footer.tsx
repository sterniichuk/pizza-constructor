import React from 'react';
import '../styles/App.scss';
import '../styles/Footer.scss';
import tracker from '../img/tracker.svg'
import designer from '../img/pizza-designer.svg'

function Footer() {
    return (
        <footer className="row">
            <ul>
                <li>News</li>
                <li>Career</li>
                <li>Franchising</li>
                <li>Domino's club</li>
            </ul>
            <ul>
                <li className="important-text">Services</li>
                <li className="row-with-image">
                    <img src={tracker} alt="message-logo"/>
                    <p>Pizza Tracker</p>
                </li>
                <li className="row-with-image">
                    <img src={designer} alt="pizza-logo"/>
                    <p>Pizza Designer</p>
                </li>
                <li className="important-text">Payment support</li>
            </ul>
            <ul>
                <li className="important-text">Useful information</li>
                <li>Information on allergen content and nutritional value</li>
                <li>Food safety policy</li>
                <li>Privacy policy</li>
                <li>Information policy</li>
            </ul>
            <ul>
                <li>+1234567890</li>
                <li>ACCORDING TO YOUR MOBILE OPERATOR FEES</li>
                <li>No weekends from <data></data> 10:00 to 22:00</li>
                <li>
                    <address>imaginarymail@lll.kpi.ua</address>
                </li>
                <li>Lorem ipsum</li>
                <li>Rivne</li>
                <li>Leave a review</li>
            </ul>
        </footer>
    );
}

export default Footer;