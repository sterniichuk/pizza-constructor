import React, {useState} from 'react';
import './styles/Calculator.scss';

interface Props {
    list: string[]
    defaultOption: string
    enabled?: string
    disabled?: string
    callback?(name : string): void
}

function StaticSelector({list, defaultOption, enabled = "static-selected", disabled = "default-static-button", callback=()=>{}}: Props) {
    const [selected, setSelected] = useState(defaultOption);

    function handleClick(newChoice: string): void {
        setSelected(newChoice);
        callback(newChoice);
        console.log(newChoice + " is clicked")
    }

    const options = list.map((name, index) => {
        return (
            <li className={name === selected ? enabled : disabled}
                onClick={() => {handleClick(name)}}
                key={index}>{name}</li>
        );
    });
    return (
        <ol className="row">{options}</ol>
    );
}

export default StaticSelector;