import { SpecialistsAction, ActionsTypes } from "./actions";
import { loadingStatusOptions } from "../../hooks/http.hook";

import { ISpecialist } from "../../shared/interfaces/appointment.interface";

export interface ISpecialistsState {
    specialists: ISpecialist[] | [];
    specialistsLoadingStatus: loadingStatusOptions;
}

export default function reducer(
    state: ISpecialistsState,
    action: SpecialistsAction
): ISpecialistsState {
    switch (action.type) {
        case ActionsTypes.SET_SPECIALISTS:
            return {
                ...state,
                specialists: action.payload,
                specialistsLoadingStatus: "idle",
            };
        case ActionsTypes.FETCHING_SPECIALISTS:
            return {
                ...state,
                specialistsLoadingStatus: "loading",
            };
        case ActionsTypes.ERROR_FETCHING_SPECIALISTS:
            return {
                ...state,
                specialistsLoadingStatus: "error",
            };
        default:
            return state;
    }
}
