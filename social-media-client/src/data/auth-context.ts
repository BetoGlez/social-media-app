import React from "react";
import { IUser } from "../graphql/models/user.model";

export interface AuthContextModel {
    user: IUser | null;
    login: (userData: IUser) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextModel>({
    user: null,
    login: () => {},
    logout: () => {}
});

export default AuthContext;