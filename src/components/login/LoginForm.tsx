import React, {useState} from 'react';
import FormInput from "../cart/FormInput";
import {LoginData} from "../../data/LoginData";
import {PropsState} from "../../data/PropsState";

interface Props{
    loginData: PropsState<LoginData>
}
function LoginForm({loginData}:Props) {
    const data = loginData.value;
    const setData = loginData.setValue;
    const defaultPhoneNumberError = "phone number is not full";
    const [phoneNumberError, setPhoneNumberError] = useState(defaultPhoneNumberError);
    const defaultPasswordError = "password should have at least 4 symbols";
    const [passwordError, setPasswordError] = useState(defaultPasswordError);

    function setPhoneNumber(v: string) {
        if (v.startsWith("+380")) {
            const newPhoneNumber = v.replace(/[^\d+]/g, '').slice(0, 13);
            if(newPhoneNumber.length < 13 && phoneNumberError.length < 1){
                setPhoneNumberError(defaultPhoneNumberError);
            }else if(newPhoneNumber.length === 13){
                setPhoneNumberError("");
            }
            setData((p) => ({...p, phoneNumber: newPhoneNumber}))
        }
    }

    function setPassword(v: string) {
        const newPass = v.slice(0, 8);
        if(newPass.length < 4 && passwordError.length < 1){
            setPasswordError(defaultPasswordError);
        }else if(newPass.length === 4){
            setPasswordError("");
        }
        setData((p) => ({...p, password: newPass}))
    }

    return (
        <div className={"registration-form"}>
            <FormInput defaultValue={data.phoneNumber} title={"Phone number"} setInput={setPhoneNumber}
                       errorMessage={phoneNumberError}
                       important={true}/>
            <FormInput defaultValue={data.password} title={"Password"} type={"password"} setInput={setPassword}
                       showDefaultError={false}
                       errorMessage={passwordError}
                       important={true}/>
        </div>
    );
}

export default LoginForm;