import React from 'react';
import notFound from "./img/not-found.webp";
import ItemCounter from "./ItemCounter";

interface Props {
    allTab: string,
    tabs: string[]
    tabToItsToppingsMap: Map<string, string[]>
    selectedTab: string;

    addTopping(name: string): void

    deleteTopping(name: string): void

    map: Map<string, () => void>
}

function ToppingsSelector({allTab, tabs, tabToItsToppingsMap, selectedTab, addTopping, deleteTopping, map}: Props) {
    const show = "topping-category-wrapper";
    const hide = "displayNone";
    const categories = tabs.filter(t => t !== allTab).map(tab => {
        return (<div className={selectedTab === tab || selectedTab === allTab ? show : hide}>
            <h4 className="category-title">{tab}</h4>
            <div className="topping-items">
                {(tabToItsToppingsMap.get(tab) || []).map(name => (
                    <div key={name} className="topping-select-item">
                        <img className="topping-select-item-img" src={notFound} alt="not found"/>
                        <div className="topping-select-title">{name}</div>
                        <ItemCounter addTopping={() => addTopping(name)}
                                     map={map} topping={name}
                                     deleteTopping={() => deleteTopping(name)}/>
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