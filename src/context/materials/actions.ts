import { IMaterial } from "../../shared/interfaces/appointment.interface";

export enum ActionsTypes {
    SET_MATERIALS = "SET_MATERIALS",
    FETCHING_MATERIALS = "FETCHING_MATERIALS",
    ERROR_FETCHING_MATERIALS = "ERROR_FETCHING_MATERIALS",
}

export type MaterialsAction =
    | {
          type: ActionsTypes.SET_MATERIALS;
          payload: IMaterial[];
      }
    | {
          type: ActionsTypes.ERROR_FETCHING_MATERIALS;
      }
    | {
          type: ActionsTypes.FETCHING_MATERIALS;
      };
