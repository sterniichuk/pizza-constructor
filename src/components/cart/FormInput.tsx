import React from 'react';

interface Props {
    setInput: (s: string) => void
    defaultValue?: string
    title: string
    placeholder?: string
    important?: boolean
    type?: string

    errorMessage?: string
    showDefaultError?: boolean
}

function FormInput({
                       type = "text",
                       setInput,
                       defaultValue = '',
                       title,
                       placeholder = `Enter ${title.toLowerCase()}`,
                       important = false,
                       errorMessage = "",
                       showDefaultError = true
                   }: Props) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    return (
        <div className="input-wrapper">
            <p>{important ? `${title}*` : title}</p>
            <input required={important} type={type} value={defaultValue} placeholder={placeholder}
                   onChange={handleInputChange}/>
            {showDefaultError? <span className="warning">Required field</span> : null}
            {errorMessage?.length > 0? <span className={"warning-active"}>{errorMessage}</span> : null}
        </div>
    );
}

export default FormInput;