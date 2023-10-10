import { ICustomer } from "../../shared/interfaces/appointment.interface";

export enum ActionsTypes {
    SET_CUSTOMERS = "SET_CUSTOMERS",
    FETCHING_CUSTOMERS = "FETCHING_CUSTOMERS",
    ERROR_FETCHING_CUSTOMERS = "ERROR_FETCHING_CUSTOMERS",
}

export type UserAction =
    | {
          type: ActionsTypes.SET_CUSTOMERS;
          payload: ICustomer[];
      }
    | {
          type: ActionsTypes.ERROR_FETCHING_CUSTOMERS;
      }
    | {
          type: ActionsTypes.FETCHING_CUSTOMERS;
      };
