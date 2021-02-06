import React, { useEffect, useState } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";

import AuthContext, { AuthContextModel } from "./auth-context";
import { IUser } from "../graphql/models/user.model";
import apolloClient from "../apollo/apollo-config";

const AuthContextProvider: React.FC = (props) => {

    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        // Persist data from local storage
        const token = localStorage.getItem("jwtToken");
        if(token) {
            console.log("Token found in local storage");
            const decodedToken = jwtDecode<JwtPayload>(token);
            if (decodedToken.exp && (decodedToken.exp * 1000 < Date.now())) {
                console.log("Token expired");
                localStorage.removeItem("jwtToken");
            } else {
                const localStorageUser = decodedToken as IUser;
                const composedUser: IUser = {
                    id: localStorageUser.id,
                    email: localStorageUser.email,
                    username: localStorageUser.username,
                    createdAt: "",
                    token
                };
                console.log("Set current user to local storage user: ", composedUser);
                setUser(composedUser);
            }
        } else {
            console.log("No token found in local storage");
        }
    }, []);

    const login = (user: IUser) => {
        setUser(user);
        localStorage.setItem("jwtToken", user.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("jwtToken");
        apolloClient.resetStore();
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