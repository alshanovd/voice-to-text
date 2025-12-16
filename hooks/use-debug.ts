import { useEffect, useState } from "react";

export function useDebug(): boolean {
    const [debug, setDebug] = useState(false);
    useEffect(() => {
        const debug = localStorage.getItem("debug");
        if (debug) {
            setDebug(true);
        }
    }, []);
    return debug;
}
