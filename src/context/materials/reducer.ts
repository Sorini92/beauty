import { MaterialsAction, ActionsTypes } from "./actions";
import { loadingStatusOptions } from "../../hooks/http.hook";

import { IMaterial } from "../../shared/interfaces/appointment.interface";

export interface IMaterialsState {
    materials: IMaterial[] | [];
    materialsLoadingStatus: loadingStatusOptions;
}

export default function reducer(state: IMaterialsState, action: MaterialsAction): IMaterialsState {
    switch (action.type) {
        case ActionsTypes.SET_MATERIALS:
            return {
                ...state,
                materials: action.payload,
                materialsLoadingStatus: "idle",
            };
        case ActionsTypes.FETCHING_MATERIALS:
            return {
                ...state,
                materialsLoadingStatus: "loading",
            };
        case ActionsTypes.ERROR_FETCHING_MATERIALS:
            return {
                ...state,
                materialsLoadingStatus: "error",
            };
        default:
            return state;
    }
}
