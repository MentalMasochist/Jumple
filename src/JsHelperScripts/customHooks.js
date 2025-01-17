import { useState, useEffect, useRef } from "react";

export const useOnUpdate = (callback, deps) => {
    const isMountingRef = useRef(false);

    useEffect(() => {
        isMountingRef.current = true;
    }, []);

    useEffect(() => {
        if (!isMountingRef.current) {
            return callback();
        } else {
            isMountingRef.current = false;
        }
    }, deps);
};


export const useDailyLocalState = (initialValue, stateKey, storageKey) => {
    const [state, setState] = useState(() => {
        try {
            const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};
            return storedData[stateKey] !== undefined ? storedData[stateKey] : initialValue;
        } catch (error) {
            console.error("Error loading localStorage data:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};
            storedData[stateKey] = state;
            localStorage.setItem(storageKey, JSON.stringify(storedData));
        } catch (error) {
            console.error("Error setting localStorage data:", error);
        }
    }, [state, stateKey]);

    return [state, setState];
};