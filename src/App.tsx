import Header from './components/Header';
import MainBody from './components/main/MainBody';
import Footer from "./components/Footer";
import React, {useEffect, useState} from "react";
import CartPage from "./CartPage";
import Login from "./components/login/Login";
import {PropsState} from "./data/PropsState";

interface Props {
    inputClientId?: number
    inputSum?: number
}

enum Page {
    MAIN, CART
}

function App({inputSum = 0}: Props) {
    const [token, setToken] = useState("");
    const [cartSum, setCartSum] = useState(inputSum);
    const [page, setPage] = useState(Page.MAIN);
    const [showLogin, setShowLogin] = useState(false);
    const mainBody = <MainBody
        token={token}
        callLogin={() => setShowLogin(true)}
        setCartSum={setCartSum}/>;

    function backToMain() {
        if (page === Page.MAIN) {
            return;
        }
        setPage(() => Page.MAIN)
    }

    function goToCheckout() {
        if (page === Page.CART) {
            return;
        }
        if (token.length < 1) {
            alert("Login first");
            setShowLogin(true);
            return;
        }
        setPage(() => Page.CART)
    }


    const showLoginProps: PropsState<boolean> = {value: showLogin, setValue: setShowLogin};
    const body = page === Page.MAIN ? mainBody :
        <CartPage headerSum={({value: cartSum, setValue: setCartSum})} token={token} backToMain={backToMain}/>
    const disableScroll = "disable-scroll";
    useEffect(() => {
        if (showLogin) {
            window.scrollTo({
                top: 0,
            })
            document.body.classList.add(disableScroll)
        } else {
            document.body.classList.remove(disableScroll)
        }
    }, [showLogin])
    const tokenProps: PropsState<string> = {value: token, setValue: setToken};
    return (
        <>
            <Header tokenProps={tokenProps} showLogin={showLoginProps} cartSum={cartSum}
                    goToCheckout={goToCheckout} backToMain={backToMain}></Header>
            {body}
            <Footer/>
            <Login show={showLogin} tokenProps={tokenProps} close={() => setShowLogin(false)}/>
        </>
    );
}

export default App;
