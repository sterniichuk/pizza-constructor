import React, {useState} from 'react';
import './styles/Calculator.scss';
import StaticSelector from "./StaticSelector";
import ToppingsSelector from "./ToppingsSelector";
import SelectedToppingsList from "./SelectedToppingsList";

function Calculator() {
    const sizeNames = ["Standard size", "Large", "ExtraLarge", "XXLarge"]

    const [toppings, setToppings] = useState<string[]>([]);
    const dough = ["Thick crust", "Thin", "Philadelphia", "Hot-Dog"];
    const allTab = "All";
    const tabs = [allTab, "Vegetables", "Sauces", "Meats", "Cheeses"];
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
            "Ricotta"].map(x => x + index))
    ));
    const [selectedTab, setSelectedTab] = useState(allTab);

    function deleteTopping(topping: string) {
        let newToppings = [...toppings];
        const target = newToppings.lastIndexOf(topping);
        if (target < 0) {
            return;
        }
        if (target === toppings.length - 1) {
            newToppings.pop();
        } else {
            newToppings.splice(target, 1)
        }
        setToppings(newToppings);
        console.log("deleted: " + topping);
        console.log("target: " + target);
    }

    function addTopping(topping: string) {
        let newToppings = [...toppings];
        const siblingIndex = newToppings.lastIndexOf(topping);
        if (siblingIndex < 0 || siblingIndex === toppings.length - 1) {
            newToppings.push(topping);
        } else {
            newToppings.splice(siblingIndex + 1, 0, topping)
        }
        setToppings(newToppings);
        console.log("adding new " + topping);
        console.log("siblingIndex: " + siblingIndex);
    }

    const newMap = new Map<string, () => void>();

    const toppingsSelectorObj = <ToppingsSelector allTab={allTab} tabs={tabs} tabToItsToppingsMap={myMap}
                                                  deleteTopping={(x) => deleteTopping(x)}
                                                  addTopping={(x) => addTopping(x)}
                                                  map={newMap}
                                                  selectedTab={selectedTab}/>;
    return (
        <div className="calculator-wrapper">
            <h2>Your pizza</h2>
            <div className="selected-toppings-wrapper">
                <h3>Your pizza's toppings:</h3>
                <SelectedToppingsList toppings={toppings} callbackMap={newMap}></SelectedToppingsList>
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
            {toppingsSelectorObj}
        </div>
    );
}

export default Calculator;