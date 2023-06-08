import React, {useState} from 'react';
import '../../styles/Calculator.scss';
import { ToppingInfo} from "../../data/ToppingInfo";

export interface PropsS {
    list: ToppingInfo[]
    defaultOption: ToppingInfo
    enabled?: string
    disabled?: string
    notAvailableStyle?: string;
    callback?(name: ToppingInfo): void
}

function StaticSelector({
                            list,
                            defaultOption,
                            enabled = "static-selected",
                            disabled = "default-static-button",
                            notAvailableStyle = "static-not-available",
                            callback = () => {
                            },
                        }: PropsS) {
    const [selected, setSelected] = useState(defaultOption);

    function handleClick(newChoice: ToppingInfo): void {
        if (!newChoice.isAvailable()) {
            console.log(newChoice + " is not available")
            return;
        }
        setSelected(newChoice);

        callback(newChoice);
        console.log(newChoice + " is clicked")
    }

    const options = list.map((choice, index) => {
        if(choice.name === selected.name && choice.max !== selected.max){
            setSelected(defaultOption);
        }
        let className = choice.name === selected.name ? enabled : disabled;
        className = choice.isAvailable() ? className : className + " " + notAvailableStyle
        return (
            <li className={className}
                onClick={() => {
                    handleClick(choice)
                }}
                key={index}>{choice.name}</li>
        );
    });
    return (
        <ol className="row">{options}</ol>
    );
}

export default StaticSelector;