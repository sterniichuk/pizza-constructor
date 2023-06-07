import React, {useState} from 'react';
import FormInput from "../cart/FormInput";
import {RegisterData} from "../../data/LoginData";
import {PropsState} from "../../data/PropsState";
interface Props{
    regData: PropsState<RegisterData>
}
function RegistrationForm({regData}:Props) {
    const data = regData.value;
    const setData = regData.setValue;
    const defaultPhoneNumberError = "phone number is not full";
    const [phoneNumberError, setPhoneNumberError] = useState(defaultPhoneNumberError);
    const defaultPasswordError = "password should have at least 4 symbols";
    const [passwordError, setPasswordError] = useState(defaultPasswordError);
    const defaultConfirmPasswordError = "password is different";
    const [confirmPasswordError, setConfirmPasswordError] = useState(defaultConfirmPasswordError);

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
        checkConfirmPass(data.passwordAgain, newPass);
    }
    function checkConfirmPass(confirm: string, pass: string) {
        if (confirm !== pass && confirmPasswordError.length < 1) {
            setConfirmPasswordError(defaultConfirmPasswordError);
        } else if (confirm === pass) {
            setConfirmPasswordError("");
        }
    }

    function confirmPassword(v: string) {
        const confirm = v.slice(0, 8);
        checkConfirmPass(confirm, data.password);
        setData((p) => ({...p, passwordAgain: confirm}))
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
            <FormInput defaultValue={data.passwordAgain} title={"Confirm password"} type={"password"}
                       showDefaultError={false}
                       errorMessage={confirmPasswordError}
                       setInput={confirmPassword} placeholder={"Enter password again"} important={true}/>
        </div>
    );
}

export default RegistrationForm;