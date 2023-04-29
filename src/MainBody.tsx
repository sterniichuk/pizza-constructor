import React from 'react';
import './styles/MainBody.scss';
import image from "./img/pizza-img.webp"
import Calculator from "./Calculator";

function MainBody() {
    return (
        <div className="main-body row">
            <img className="pizza-img" src= {image} alt="chees-pizza"/>
            <Calculator/>
        </div>
    );
}

export default MainBody;