import React, { useState } from "react";
import AuthContext, { AuthContextModel } from "./auth-context";
import { IUser } from "../graphql/models/user.model";

const AuthContextProvider: React.FC = (props) => {

    const [user, setUser] = useState<IUser | null>(null);

    const login = (user: IUser) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    const authContext: AuthContextModel = {
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;