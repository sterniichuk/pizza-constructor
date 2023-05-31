import Header from './components/Header';
import MainBody from './components/main/MainBody';
import Footer from "./components/Footer";
import React, {useEffect, useState} from "react";

interface Props {
    inputClientId?: number
    inputSum?: number
}

export function getParams(paramName: string, defaultValue: string, queryParams: URLSearchParams, callback: (par: number) => void) {
    const param = queryParams.get(paramName) || defaultValue;
    try {
        const parsed: number = Number.parseInt(param);
        callback(parsed);
    } catch (e) {
        console.log("Can't parse int in App")
    }
}

function App({inputClientId = -1, inputSum = 0}: Props) {
    const [cartSum, setCartSum] = useState(inputSum);
    const [clientId, setClientId] = useState(inputClientId);
    useEffect(() => {
        if (clientId <= 0) {
            const queryParams: URLSearchParams = new URLSearchParams(window.location.search);
            console.log('GETID')
            const pair: { x: number, y: number } = {x: -1, y: 0}
            getParams('clientId', "-1", queryParams, x => pair.x = x)
            if (cartSum <= 0) {
                console.log('GET_SUM')
                getParams('cartSum', "0", queryParams, y => pair.y = y)
            }
            setCartSum(pair.y)
            setClientId(pair.x)
        }
    }, [clientId, cartSum])
    return (
        <>
            <Header clientId={clientId} cartSum={cartSum}></Header>
            <MainBody setClientId={setClientId} clientId={clientId} setCartSum={setCartSum}/>
            <Footer/>
        </>
    );
}

export default App;
