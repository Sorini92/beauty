export interface IAppointment {
    id: number;
    date: string;
    name: string;
    service: string;
    phone: number;
    specialist: string;
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

export interface ISpecialist {
    id: number;
    name: string;
    phone: string;
    services: string[];
}

export interface ICustomer {
    name: string;
    phone: number;
    age: number | string;
    email: string;
    id: number;
}
