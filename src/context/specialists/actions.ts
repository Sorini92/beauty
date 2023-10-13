import { ISpecialist } from "../../shared/interfaces/appointment.interface";

export enum ActionsTypes {
    SET_SPECIALISTS = "SET_SPECIALISTS",
    FETCHING_SPECIALISTS = "FETCHING_SPECIALISTS",
    ERROR_FETCHING_SPECIALISTS = "ERROR_FETCHING_SPECIALISTS",
}

export type SpecialistsAction =
    | {
          type: ActionsTypes.SET_SPECIALISTS;
          payload: ISpecialist[];
      }
    | {
          type: ActionsTypes.ERROR_FETCHING_SPECIALISTS;
      }
    | {
          type: ActionsTypes.FETCHING_SPECIALISTS;
      };
