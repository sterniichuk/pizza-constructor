import React, {useState} from 'react';
import "../../styles/Login.scss"
import closeImg from "../../img/close-button-login.svg"
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {PropsState} from "../../data/PropsState";
import {AuthenticationResponse, defaultLoginData, defaultRegisterData, LoginData} from "../../data/LoginData";

interface Props {
    show: boolean
    close: () => void
    tokenProps: PropsState<string>
}

enum EnterWays {
    LOGIN, REGISTRATION
}

function authRequest(data: LoginData, requestType: EnterWays): Promise<AuthenticationResponse> {
    const url = `http://localhost:8080/api/v1/user/${requestType === EnterWays.LOGIN ? "auth" : "register"}`;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to auth: n: ${data.phoneNumber} p: ${data.password}`);
            }
            return response.json();
        })
        .then(data => {
            return data as AuthenticationResponse;
        })
        .catch(error => {
            console.error("Error:", error);
            throw error;
        })
}

function Login({show, close, tokenProps}: Props) {
    const [way, setWay] = useState(EnterWays.LOGIN);
    const title = way === EnterWays.LOGIN ? "Login" : "Registration";
    const [loginData, setLoginData] = useState(defaultLoginData);
    const [reg, setReg] = useState(defaultRegisterData);

    const loginForm = <LoginForm loginData={({value: loginData, setValue: setLoginData})}/>;
    const regForm = <RegistrationForm regData={({value: reg, setValue: setReg})}/>;
    const form = way === EnterWays.LOGIN ? loginForm : regForm;

    function handleClick(click: EnterWays) {
        if (way !== click) {
            setWay(click);
            return;
        }
        const dataToSend = way === EnterWays.LOGIN ? loginData : reg;
        authRequest(dataToSend, click).then(res => {
            tokenProps.setValue(() => {
                console.log("res.token: " + res.token)
                alert("Success login")
                return res.token;
            });
        })
        close();
    }

const loginButton = <button
    className={`submit-login-button submit-login ${way === EnterWays.LOGIN ? "active-submit" : ""}`}
    onClick={() => handleClick(EnterWays.LOGIN)}>Login</button>;
const registrationButton = <button
    className={`submit-login-button submit-registration ${way === EnterWays.REGISTRATION ? "active-submit" : ""}`}
    onClick={() => handleClick(EnterWays.REGISTRATION)}>Registration
</button>;
const first = way === EnterWays.LOGIN ? loginButton : registrationButton;
const second = way === EnterWays.REGISTRATION ? loginButton : registrationButton;
return (
    <div className={`login-wrapper ${show ? "" : "hide"}`}>
        <div className={`login-background`}></div>
        <div className="login">
            <div className="close-wrapper">
                <img src={closeImg} alt="close form" className={"close-login"} onClick={close}/>
            </div>
            <p className={"login-title"}>{title}</p>
            {form}
            <div className="login-buttons">
                {first}
                {second}
            </div>
        </div>
    </div>
);
}

export default Login;