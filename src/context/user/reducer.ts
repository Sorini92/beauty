import { UserAction, ActionsTypes } from "./actions";

export interface IUserState {
    token: string;
    name: string;
}

export default function reducer(state: IUserState, action: UserAction): IUserState {
    switch (action.type) {
        case ActionsTypes.SET_USER:
            return {
                name: action.payload.name,
                token: action.payload.token,
            };
        default:
            return state;
    }
}
