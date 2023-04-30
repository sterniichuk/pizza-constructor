import React from 'react';
import notFound from "./img/not-found.webp";
import ItemCounter from "./ItemCounter";

interface Props {
    allTab: string,
    tabs: string[]
    myMap: Map<string, string[]>
    selectedTab: string;

    addTopping(name: string): void

    deleteTopping(name: string): void
}

function ToppingsSelector({allTab, tabs, myMap, selectedTab, addTopping, deleteTopping}: Props) {
    const show = "topping-category-wrapper";
    const hide = "displayNone";
    const categories = tabs.filter(t => t !== allTab).map(tab => {
        return (<div className={selectedTab === tab || selectedTab === allTab ? show : hide}>
            <h4 className="category-title">{tab}</h4>
            <div className="topping-items">
                {(myMap.get(tab) || []).map(name => (
                    <div key={name} className="topping-select-item">
                        <img className="topping-select-item-img" src={notFound} alt="not found"/>
                        <div className="topping-select-title">{name}</div>
                        <ItemCounter addTopping={() => addTopping(name)} deleteTopping={() => deleteTopping(name)}/>
                    </div>
                ))}
            </div>
        </div>);
    })
    return (
        <div className="select-toppings-section">
            {categories}
        </div>
    );
}

export default ToppingsSelector;