export enum ActionsTypes {
    SET_USER = "SET_USER",
}

interface IUserData {
    name: string;
    token: string;
}

export type UserAction = {
    type: ActionsTypes.SET_USER;
    payload: IUserData;
};
