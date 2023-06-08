import React, {useEffect} from 'react';
import {PropsState} from "../../data/PropsState";

interface Props {
    time: PropsState<number>
}

function Timer({time}: Props) {
    const seconds = time.value;
    const setSeconds = time.setValue;
    useEffect(() => {
        if(seconds > 0){
            const interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [seconds, setSeconds]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return <div className={"timer"}>Timer: {formatTime(seconds)}</div>;
}

export default Timer;
