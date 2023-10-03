import { AppointmentAction, ActionsTypes } from "./actions";
import { loadingStatusOptions } from "../../hooks/http.hook";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";

import { IAppointment, ActiveAppointment } from "../../shared/interfaces/appointment.interface";

export interface IAppointmentState {
    allAppointments: IAppointment[] | [];
    activeAppointments: ActiveAppointment[] | [];
    appointmentLoadingStatus: loadingStatusOptions;
    calendarDate: LooseValue;
}

export default function reducer(
    state: IAppointmentState,
    action: AppointmentAction
): IAppointmentState {
    switch (action.type) {
        case ActionsTypes.SET_ALL_APPOINTMENTS:
            return {
                ...state,
                allAppointments: action.payload,
                appointmentLoadingStatus: "idle",
            };
        case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
            return {
                ...state,
                activeAppointments: action.payload,
                appointmentLoadingStatus: "idle",
            };
        case ActionsTypes.FETCHING_APPOINTMENTS:
            return {
                ...state,
                appointmentLoadingStatus: "loading",
            };
        case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
            return {
                ...state,
                appointmentLoadingStatus: "error",
            };
        case ActionsTypes.SET_CALENDAR_DATE:
            return {
                ...state,
                calendarDate: action.payload,
            };
        default:
            return state;
    }
}
