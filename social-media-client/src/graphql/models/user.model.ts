export interface IUser {
    id: string;
    email: string;
    token: string;
    username: string;
    createdAt: string;
}

export interface IRegisterUserPayload {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface IRegisterUserData {
    register: IUser;
}

export interface ILoginUserPayload {
    username: string;
    password: string;
}
export interface ILoginUserData {
    login: IUser;
}