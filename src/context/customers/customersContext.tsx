import React, { createContext, useReducer } from "react";
import reducer, { ICustomerState } from "./reducer";
import useCustomerService from "../../services/CustomerService";
import { ActionsTypes } from "./actions";

const initialState: ICustomerState = {
    customers: [],
    customersLoadingStatus: "idle",
};

interface ProviderProps {
    children: React.ReactNode;
}

interface CustomerContextValue extends ICustomerState {
    getAllCustomers: () => void;
}

export const CustomerContext = createContext<CustomerContextValue>({
    customers: initialState.customers,
    customersLoadingStatus: initialState.customersLoadingStatus,
    getAllCustomers: () => {},
});

const CustomerContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loadingStatus, getCustomers } = useCustomerService();

    const value: CustomerContextValue = {
        customers: state.customers,
        customersLoadingStatus: loadingStatus,
        getAllCustomers: () => {
            getCustomers()
                .then((data) => {
                    dispatch({ type: ActionsTypes.SET_CUSTOMERS, payload: data });
                })
                .catch(() => {
                    dispatch({ type: ActionsTypes.ERROR_FETCHING_CUSTOMERS });
                });
        },
    };

    return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};

export default CustomerContextProvider;
