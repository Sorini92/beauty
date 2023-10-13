import React, { createContext, useReducer } from "react";
import reducer, { ISpecialistsState } from "./reducer";
import useSpecialistService from "../../services/SpecialistService";
import { ActionsTypes } from "./actions";

const initialState: ISpecialistsState = {
    specialists: [],
    specialistsLoadingStatus: "idle",
};

interface ProviderProps {
    children: React.ReactNode;
}

interface SpecialistsContextValue extends ISpecialistsState {
    getAllSpecialists: () => void;
}

export const SpecialistContext = createContext<SpecialistsContextValue>({
    specialists: initialState.specialists,
    specialistsLoadingStatus: initialState.specialistsLoadingStatus,
    getAllSpecialists: () => {},
});

const SpecialistsContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loadingStatus, getSpecialists } = useSpecialistService();

    const value: SpecialistsContextValue = {
        specialists: state.specialists,
        specialistsLoadingStatus: loadingStatus,
        getAllSpecialists: () => {
            getSpecialists()
                .then((data) => {
                    dispatch({ type: ActionsTypes.SET_SPECIALISTS, payload: data });
                })
                .catch(() => {
                    dispatch({ type: ActionsTypes.ERROR_FETCHING_SPECIALISTS });
                });
        },
    };

    return <SpecialistContext.Provider value={value}>{children}</SpecialistContext.Provider>;
};

export default SpecialistsContextProvider;
