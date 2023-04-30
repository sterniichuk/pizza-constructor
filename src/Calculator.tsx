import React from 'react';
import './styles/Calculator.scss';
import ItemCounter from "./ItemCounter";
import notFound from "./img/not-found.webp"
import StaticSelector from "./StaticSelector";

function Calculator() {
    const sizeNames = ["Standard size", "Large", "ExtraLarge", "XXLarge"]

    const toppings = ["Domino's sauce", "Mozarella"].map((topping, index) => (
        <li  key={index}>{topping}, </li>
    ));
    const dough = ["Thick crust", "Thin", "Philadelphia", "Hot-Dog"];
    const tabs = ["All", "Vegetables", "Sauces", "Meats", "Cheeses"];
    const myMap = new Map<string, string[]>();
    tabs.slice(1).forEach((tab, index) => (
        myMap.set(tab, ["Cheddar",
            "Brie",
            "Mozzarella",
            "Parmesan",
            "Gouda",
            "Feta",
            "Camembert",
            "Blue cheese",
            "Swiss",
            "Ricotta"])
    ));
    const categories = tabs.slice(1).map(tab => {
        return (<div className="topping-category-wrapper">
            <h4 className="category-title">{tab}</h4>
            <div className="topping-items">
                {(myMap.get(tab) || []).map(name => (
                    <div key={name} className="topping-select-item">
                        <img className="topping-select-item-img" src={notFound} alt="not found"/>
                        <div className="topping-select-title">{name}</div>
                        <ItemCounter/>
                    </div>
                ))}
            </div>
        </div>);
    })
    return (
        <div className="calculator-wrapper">
            <h2>Your pizza</h2>
            <div className="selected-toppings-wrapper">
                <h3>Your pizza's toppings:</h3>
                <ul className="row">{toppings}</ul>
            </div>
            <div className="size-wrapper static-selector-wrapper">
                <h3>Size</h3>
                <StaticSelector list={sizeNames} defaultOption={sizeNames[0]}/>
            </div>
            <div className="dough-wrapper static-selector-wrapper">
                <h3>Dough</h3>
                <StaticSelector list={dough} defaultOption={dough[0]}/>
            </div>
            <div className="toppings-tabs">
                <StaticSelector list={tabs} defaultOption={tabs[0]} enabled="topping-tab-selected" disabled="topping-tab-default"/>
            </div>
            <div className="select-toppings-section">
                {categories}
            </div>
        </div>
    );
}

export default Calculator;