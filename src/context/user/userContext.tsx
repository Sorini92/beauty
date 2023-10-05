import React, { createContext, useReducer } from "react";
import reducer, { IUserState } from "./reducer";
import { ActionsTypes } from "./actions";

const initialState: IUserState = {
    token: "",
    name: "",
};

interface ProviderProps {
    children: React.ReactNode;
}

interface UserContextValue extends IUserState {
    setAuth: (userData: IUserState) => void;
}

export const UserContext = createContext<UserContextValue>({
    token: initialState.token,
    name: initialState.name,
    setAuth: (userData: IUserState) => {},
});

const UserContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value: UserContextValue = {
        token: state.token,
        name: state.name,
        setAuth: (userData: IUserState) => {
            dispatch({ type: ActionsTypes.SET_USER, payload: userData });
        },
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
