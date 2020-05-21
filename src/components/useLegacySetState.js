import { useReducer } from "react";
export function useLegacySetState(initialState) {
    const stateReducer = (prevState, stateChanges) => {
        var newState = prevState;
        if (typeof (stateChanges) === "function") {
            newState = stateChanges(prevState);
        }
        else {
            newState = {
                ...prevState,
                ...stateChanges
            };
        }
        return newState;
    };
    return useReducer(stateReducer, initialState);
}
