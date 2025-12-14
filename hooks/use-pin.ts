import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function usePin(): [string, (v: string) => void] {
    const [pin, setPin] = useState("");
    const setPinValue = (value: string) => {
        localStorage.setItem("pin", value);
        setPin(value);
    }

    useEffect(() => {
        const lsPin = localStorage.getItem("pin");
        if (lsPin) {
            setPin(lsPin);
        }
    }, []);

    return [pin, setPinValue];
}