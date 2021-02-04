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