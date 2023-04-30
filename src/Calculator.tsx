import React, { useState} from 'react';
import './styles/Calculator.scss';
import StaticSelector from "./StaticSelector";
import ToppingsSelector from "./ToppingsSelector";

function Calculator() {
    const sizeNames = ["Standard size", "Large", "ExtraLarge", "XXLarge"]

    const toppings = ["Domino's sauce", "Mozarella"].map((topping, index) => (
        <li key={index}>{topping}, </li>
    ));
    const dough = ["Thick crust", "Thin", "Philadelphia", "Hot-Dog"];
    const allTab = "All";
    const tabs = [allTab, "Vegetables", "Sauces", "Meats", "Cheeses"];
    const myMap = new Map<string, string[]>();
    tabs.slice(1).forEach((tab) => (
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
    const [selectedTab, setSelectedTab] = useState(allTab);
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
                <StaticSelector list={tabs} defaultOption={allTab} enabled="topping-tab-selected"
                                disabled="topping-tab-default" callback={setSelectedTab}/>
            </div>
            <ToppingsSelector allTab={allTab} tabs={tabs} myMap={myMap} selectedTab={selectedTab} />
        </div>
    );
}

export default Calculator;