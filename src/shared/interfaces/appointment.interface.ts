export interface IAppointment {
    id: number;
    date: string;
    name: string;
    service: string;
    phone: string;
    canceled: boolean;
}

export type ActiveAppointment = Omit<IAppointment, "canceled">;

export interface IUser {
    name: string;
    password: string;
    token: string;
}

export type ISignInUserData = Omit<IUser, "token">;

export type ICheckUserData = Omit<IUser, "password">;
