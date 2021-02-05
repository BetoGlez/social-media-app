import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import AuthContext from "../../data/auth-context";

// Route that only allows authenticated users to certain routes
interface AuthRouteProps extends RouteProps {
    component: any;
}
const AuthRoute: React.FC<AuthRouteProps> = (props) => {
    const { user } = useContext(AuthContext);
    const { component: Component, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                !!user ? (
                    <Redirect to={{ pathname: "/" }} />
                ) : (
                    <Component {...routeProps} />
                )
            }
        />
    );
};

export default AuthRoute;
