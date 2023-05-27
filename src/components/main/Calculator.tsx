import React, {useEffect, useState} from 'react';
import '../../styles/Calculator.scss';
import StaticSelector from "./StaticSelector";
import ToppingsSelector from "./ToppingsSelector";
import SelectedToppingsList from "./SelectedToppingsList";
import {ToppingCategory, ToppingInfo} from "../../data/ToppingInfo";
import {OrderItemCallback} from "./OrderItemCallback";
import {OrderRequest} from "../../data/OrderRequest";


interface Props {
    setCurrentSum: (x: (x: number) => number) => void;
    setOrder: (x: (x: OrderRequest) => OrderRequest) => void;
    toppings: string[]
    setToppings: (x: string[]) => void
    callbackMap: Map<string, OrderItemCallback>
}

function Calculator({setCurrentSum, setToppings, toppings, callbackMap, setOrder}: Props) {
    const [sizeToppings, setSizeToppings] = useState<ToppingInfo[]>([]);
    const [doughToppings, setDoughToppings] = useState<ToppingInfo[]>([]);
    const [serverToppings, setServerToppings] = useState<ToppingCategory[]>([]);

    useEffect(() => {
        const fetchSizeToppingInfos = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/topping/size');
                if (response.ok) {
                    const data = await response.json();
                    setSizeToppings(data);
                } else {
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        const fetchDoughToppingInfos = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/topping/dough');
                if (response.ok) {
                    const data = await response.json();
                    setDoughToppings(data);
                } else {
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        const fetchServerToppingsCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/topping/categories');
                if (response.ok) {
                    const data = await response.json();
                    setServerToppings(data);
                } else {
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchSizeToppingInfos();
        fetchDoughToppingInfos();
        fetchServerToppingsCategories();
    }, []);
    let sizeNames: string[];
    if (sizeToppings.length > 0) {
        sizeNames = sizeToppings.map(x => x.name);
    } else {
        sizeNames = ["Standard size", "Large", "ExtraLarge", "XXLarge"];
    }

    let dough: string[];
    if (doughToppings.length > 0) {
        dough = doughToppings.map(x => x.name);
    } else {
        dough = ["Thick crust", "Thin", "Philadelphia", "Hot-Dog"];
    }
    const allTab = "All";
    const tabs = [allTab, "Vegetables", "Sauces", "Meats", "Cheeses"];
    const myMap = new Map<string, ToppingInfo[]>();

    function capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (serverToppings.length > 0) {
        serverToppings.forEach(c => {
            const name = capitalizeFirstLetter(c.name);
            myMap.set(name, c.toppings);
        })
    } else {
        tabs.slice(1).forEach((tab, index) => (
            myMap.set(tab, [
                {name: "Cheddar", price: 20, isAvailable: true},
                {name: "Brie", price: 300, isAvailable: true},
                {name: "Mozzarella", price: 500, isAvailable: true},
                {name: "Parmesan", price: 2, isAvailable: true},
                {name: "Gouda", price: 10, isAvailable: true},
                {name: "Feta", price: 3, isAvailable: false}
            ].map(x => {
                return {...x, name: x.name + index};
            }))
        ));
    }
    const [selectedTab, setSelectedTab] = useState(allTab);

    function deleteTopping(topping: ToppingInfo) {
        let newToppings = [...toppings];
        const target = newToppings.lastIndexOf(topping.name);
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
        setCurrentSum(x => x - topping.price)
        setOrder(o => ({...o, toppings: newToppings}))
    }

    function addTopping(topping: ToppingInfo) {
        let newToppings = [...toppings];
        const name = topping.name;
        const siblingIndex = newToppings.lastIndexOf(name);
        if (siblingIndex < 0 || siblingIndex === toppings.length - 1) {
            newToppings.push(name);
        } else {
            newToppings.splice(siblingIndex + 1, 0, name)
        }
        setToppings(newToppings);
        console.log("adding new " + topping);
        console.log("siblingIndex: " + siblingIndex);
        setCurrentSum(x => x + topping.price)
        setOrder(o => ({...o, toppings: newToppings}))
    }

    const toppingsSelectorObj = <ToppingsSelector allTab={allTab} tabs={tabs} tabToItsToppingsMap={myMap}
                                                  deleteTopping={(x: ToppingInfo) => deleteTopping(x)}
                                                  addTopping={(x: ToppingInfo) => addTopping(x)}
                                                  map={callbackMap}
                                                  selectedTab={selectedTab}/>;
    const defaultSize = sizeNames[0];
    const defaultDough = dough[0];

    function setSize(size: string) {
        setOrder(o => ({...o, size: size}))
    }

    function setDough(dough: string) {
        setOrder(o => ({...o, dough: dough}))
    }

    return (
        <div className="calculator-wrapper">
            <h2>Your pizza</h2>
            <div className="selected-toppings-wrapper">
                <h3>Your pizza's toppings:</h3>
                <SelectedToppingsList toppings={toppings} callbackMap={callbackMap}></SelectedToppingsList>
            </div>
            <div className="size-wrapper static-selector-wrapper">
                <h3>Size</h3>
                <StaticSelector list={sizeNames} defaultOption={defaultSize} callback={setSize}/>
            </div>
            <div className="dough-wrapper static-selector-wrapper">
                <h3>Dough</h3>
                <StaticSelector list={dough} defaultOption={defaultDough} callback={setDough}/>
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