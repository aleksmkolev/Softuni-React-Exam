import { useState } from "react";

export default function useLocalStorage(stateKey, initialState) {
    const [state, setState] = useState(() => {
        const localState = localStorage.getItem(stateKey);

        if (!localState) {
            return typeof initialState === 'function' ? initialState() : initialState;
        }

        const localStateData = JSON.parse(localState);
        return localStateData; 
    });

    const setLocalState = (input) => {
        const data = typeof input === 'function' ? input(state) : input;
        const localData = JSON.stringify(data);

        localStorage.setItem(stateKey, localData);

        setState(data);
    };

    return [state, setLocalState];
}