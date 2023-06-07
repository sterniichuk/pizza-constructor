import React, {useEffect} from 'react';
import {Address} from "../../data/Address";
import FormInput from "./FormInput";
import {PropsState} from "../../data/PropsState";


interface Props {
    address: Address,
    setAddress: (func: (a: Address) => Address) => void
    isValid: PropsState<boolean>
    calculate: () => void
}

enum AddressField {
    CITY, STREET, HOUSE_NUMBER, ENTRANCE, APARTMENT, FLOOR, CODE
}


function DeliveryForm({address, setAddress, isValid}: Props) {

    function handleInput(fieldType: AddressField, value: string) {
        switch (fieldType) {
            case AddressField.CITY:
                setAddress((x): Address => ({...x, city: value}));
                break;
            case AddressField.STREET:
                setAddress((x): Address => ({...x, street: value}));
                break;
            case AddressField.HOUSE_NUMBER:
                setAddress((x): Address => ({...x, houseNumber: value}));
                break;
            case AddressField.ENTRANCE:
                setAddress((x): Address => ({...x, entrance: value}));
                break;
            case AddressField.CODE:
                setAddress((x): Address => ({...x, codeToHouse: value}));
                break;
            case AddressField.FLOOR:
                setAddress((x): Address => ({...x, floor: value}));
                break;
            case AddressField.APARTMENT:
                setAddress((x): Address => ({...x, apartment: value}));
                break;
        }
    }

    useEffect(() => {
        const isValidAddress = isValid.value;
        function setIsValidAddress(v: boolean) {
            isValid.setValue(() => v);
        }

        if (isValidAddress && (address.houseNumber.length < 1 || address.city.length < 1 || address.street.length < 1)) {
            setIsValidAddress(false)
        } else if (!isValidAddress && (address.houseNumber.length >= 1 && address.city.length >= 1 && address.street.length >= 1)) {
            setIsValidAddress(true);
        }
    }, [isValid, address])

    return (
        <div className={"delivery-form-wrapper"}>
            <h3 className={"delivery-form-header"}>Delivery address</h3>
            <div className="delivery-form">
                <FormInput setInput={(x) => handleInput(AddressField.CITY, x)} defaultValue={address.city}
                           title={"City"} important={true}/>
                <FormInput setInput={(x) => handleInput(AddressField.STREET, x)} defaultValue={address.street}
                           title={"Street"} important={true}/>
                <FormInput setInput={(x) => handleInput(AddressField.HOUSE_NUMBER, x)}
                           defaultValue={address.houseNumber} title={"House number"} important={true}/>
                <FormInput setInput={(x) => handleInput(AddressField.ENTRANCE, x)} defaultValue={address.entrance}
                           title={"Entrance"} placeholder={"Entrance number"}/>
                <FormInput setInput={(x) => handleInput(AddressField.APARTMENT, x)} defaultValue={address.apartment}
                           title={"Apartment"}/>
                <FormInput setInput={(x) => handleInput(AddressField.FLOOR, x)} defaultValue={address.floor}
                           title={"Floor"} placeholder={"Floor number"}/>
                <FormInput setInput={(x) => handleInput(AddressField.CODE, x)} defaultValue={address.codeToHouse}
                           title={"Code"} placeholder={"Enter the code"}/>
            </div>
        </div>

    );
}

export default DeliveryForm;