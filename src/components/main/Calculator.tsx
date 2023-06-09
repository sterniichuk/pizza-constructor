import React, {useEffect, useState} from 'react';
import '../../styles/Calculator.scss';
import StaticSelector from "./StaticSelector";
import ToppingsSelector from "./ToppingsSelector";
import SelectedToppingsList from "./SelectedToppingsList";
import {
    ToppingCategory,
    ToppingInfo,
    fakeToppingCategories,
    tabs,
    tabAsString, toDefault, ToppingCategoryType, ToppingInfoType
} from "../../data/ToppingInfo";
import {OrderItemCallback} from "./OrderItemCallback";
import {OrderRequest} from "../../data/OrderRequest";
import {PropsState} from "../../data/PropsState";


interface Props {
    setCurrentSum: (x: (x: number) => number) => void;
    order: PropsState<OrderRequest>
    toppings: string[]
    setToppings: (x: string[]) => void
    callbackMap: Map<string, OrderItemCallback>
}

function fetchData<T>(link: string, consumer: (data: T) => void) {
    const f = async () => {
        try {
            const response = await fetch(link);
            if (response.ok) {
                const data = await response.json();
                consumer(data);
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    f();
}


function Calculator({setCurrentSum, setToppings, toppings, callbackMap, order}: Props) {
    const setOrder = order.setValue;
    const myMap = new Map<string, ToppingInfo[]>();
    const [sizeToppings, setSizeToppings] = useState<ToppingInfo[]>(toDefault(["Standard size", "Large", "ExtraLarge", "XXLarge"]));
    const [doughToppings, setDoughToppings] = useState<ToppingInfo[]>(toDefault(["Thick crust", "Thin", "Philadelphia", "Hot-Dog"]));
    const [serverToppings, setServerToppings] = useState<ToppingCategory[]>(fakeToppingCategories);
    useEffect(() => {
        fetchData('http://localhost:8080/api/v1/topping/size', (x: ToppingInfoType[]) => {
            const toppingInfos = x.map(i => new ToppingInfo(i));
            setSizeToppings(toppingInfos);
            // const available = getAvailable(toppingInfos);
            // setCurrentSum(x => x + available.price)
        });
        fetchData('http://localhost:8080/api/v1/topping/dough', (x: ToppingInfoType[]) => {
            const toppingInfos = x.map(i => new ToppingInfo(i));
            setDoughToppings(toppingInfos);
            // const available = getAvailable(toppingInfos);
            // setCurrentSum(x => x + available.price)
        });
        fetchData('http://localhost:8080/api/v1/topping/categories', (x: ToppingCategoryType[]) => {
            const categories: ToppingCategory[] = x.map(i => {
                const a: ToppingCategory = {name: i.name, toppings: i.toppings.map(t => new ToppingInfo(t))};
                return a;
            })
            console.log("fetch: " + categories[0].toppings[0].isAvailable());
            setServerToppings(categories);
        });
    }, [setCurrentSum]);

    function capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    serverToppings.forEach(c => {
        const name = capitalizeFirstLetter(c.name);
        myMap.set(name, c.toppings);
    })
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    function deleteTopping(topping: ToppingInfo) {
        if (!topping.isAvailable()) {
            return;
        }
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
        setOrder(x => ({...x, toppings: newToppings}));
        setToppings(newToppings);
        console.log("deleted: " + topping);
        console.log("target: " + target);
        setCurrentSum(x => x - topping.price)
        setOrder(o => ({...o, toppings: newToppings}))
    }

    function addTopping(topping: ToppingInfo) {
        if (!topping.isAvailable()) {
            return;
        }
        let newToppings = [...toppings];
        const name = topping.name;
        const siblingIndex = newToppings.lastIndexOf(name);
        if (siblingIndex < 0 || siblingIndex === toppings.length - 1) {
            newToppings.push(name);
        } else {
            newToppings.splice(siblingIndex + 1, 0, name)
        }
        setOrder(x => ({...x, toppings: newToppings}));
        setToppings(newToppings);
        console.log("adding new " + topping);
        console.log("siblingIndex: " + siblingIndex);
        setCurrentSum(x => x + topping.price)
        setOrder(o => ({...o, toppings: newToppings}))
    }

    const toppingsSelectorObj = <ToppingsSelector allTab={tabAsString[0]} tabs={tabAsString} tabToItsToppingsMap={myMap}
                                                  deleteTopping={(x: ToppingInfo) => deleteTopping(x)}
                                                  addTopping={(x: ToppingInfo) => addTopping(x)}
                                                  map={callbackMap}
                                                  selectedTab={selectedTab.name}/>;

    function setSize(size: ToppingInfo) {
        setCurrentSum(x => x + size.price - getSizePrice())
        setOrder(o => ({...o, size: size.name}))
    }

    function setDough(dough: ToppingInfo) {
        setCurrentSum(x => x + (dough.price - getDoughPrice()))
        setOrder(o => ({...o, dough: dough.name}))
    }

    function getDoughPrice() {
        const old = order.value.dough;
        return doughToppings.find(x => x.name === old)?.price || 0;
    }

    function getSizePrice() {
        const old = order.value.size;
        return sizeToppings.find(x => x.name === old)?.price || 0;
    }

    function getAvailable(list: ToppingInfo[]) {
        const found = list.find(x => x.isAvailable());
        if (!found) {
            console.log("not found in " + list)
        }
        return found || list[0];
    }

    const sizeDefault = getAvailable(sizeToppings);
    const doughDefault = getAvailable(doughToppings);

    useEffect(() => {
        if (order.value.size === "") {
            setOrder(o => ({...o, size: sizeDefault.name}))
        }
    }, [order, sizeDefault, setOrder])
    useEffect(() => {
        if (order.value.dough === "") {
            setOrder(o => ({...o, dough: doughDefault.name}))
        }
    }, [order, doughDefault, setOrder])
    return (
        <div className="calculator-wrapper">
            <h2>Your pizza</h2>
            <div className="selected-toppings-wrapper">
                <h3>Your pizza's toppings:</h3>
                <SelectedToppingsList toppings={toppings} callbackMap={callbackMap}></SelectedToppingsList>
            </div>
            <div className="size-wrapper static-selector-wrapper">
                <h3>Size</h3>
                <StaticSelector list={sizeToppings} defaultOption={sizeDefault} callback={setSize}/>
            </div>
            <div className="dough-wrapper static-selector-wrapper">
                <h3>Dough</h3>
                <StaticSelector list={doughToppings} defaultOption={doughDefault} callback={setDough}/>
            </div>
            <div className="toppings-tabs">
                <StaticSelector list={tabs} defaultOption={tabs[0]} enabled="topping-tab-selected"
                                disabled="topping-tab-default" callback={setSelectedTab}/>
            </div>
            {toppingsSelectorObj}
        </div>
    );
}

export default Calculator;