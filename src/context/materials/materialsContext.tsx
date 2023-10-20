import React, { createContext, useReducer } from "react";
import reducer, { IMaterialsState } from "./reducer";
import useMaterialsService from "../../services/MaterialsService";
import { ActionsTypes } from "./actions";

const initialState: IMaterialsState = {
    materials: [],
    materialsLoadingStatus: "idle",
};

interface ProviderProps {
    children: React.ReactNode;
}

interface MaterialsContextValue extends IMaterialsState {
    getAllMaterials: () => void;
}

export const MaterialsContext = createContext<MaterialsContextValue>({
    materials: initialState.materials,
    materialsLoadingStatus: initialState.materialsLoadingStatus,
    getAllMaterials: () => {},
});

const MaterialsContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loadingStatus, getMaterials } = useMaterialsService();

    const value: MaterialsContextValue = {
        materials: state.materials,
        materialsLoadingStatus: loadingStatus,
        getAllMaterials: () => {
            getMaterials()
                .then((data) => {
                    dispatch({ type: ActionsTypes.SET_MATERIALS, payload: data });
                })
                .catch(() => {
                    dispatch({ type: ActionsTypes.ERROR_FETCHING_MATERIALS });
                });
        },
    };

    return <MaterialsContext.Provider value={value}>{children}</MaterialsContext.Provider>;
};

export default MaterialsContextProvider;
