import React from 'react';

interface Props {
    setInput: (s: string) => void
    defaultValue?: string
    title: string
    placeholder?: string
    important?: boolean
}

function FormInput({setInput, defaultValue = '', title, placeholder = `Enter ${title.toLowerCase()}`, important = false}: Props) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    return (
        <div className="input-wrapper">
            <p>{important ? `${title}*` : title}</p>
            <input required={important} type="text" value={defaultValue} placeholder={placeholder} onChange={handleInputChange}/>
            <span className="warning">Required field</span>
        </div>
    );
}

export default FormInput;