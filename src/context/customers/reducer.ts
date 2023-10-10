import { UserAction, ActionsTypes } from "./actions";
import { loadingStatusOptions } from "../../hooks/http.hook";

import { ICustomer } from "../../shared/interfaces/appointment.interface";

export interface ICustomerState {
    customers: ICustomer[] | [];
    customersLoadingStatus: loadingStatusOptions;
}

export default function reducer(state: ICustomerState, action: UserAction): ICustomerState {
    switch (action.type) {
        case ActionsTypes.SET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload,
                customersLoadingStatus: "idle",
            };
        case ActionsTypes.FETCHING_CUSTOMERS:
            return {
                ...state,
                customersLoadingStatus: "loading",
            };
        case ActionsTypes.ERROR_FETCHING_CUSTOMERS:
            return {
                ...state,
                customersLoadingStatus: "error",
            };
        default:
            return state;
    }
}
