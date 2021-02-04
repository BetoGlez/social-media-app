import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import PrimeReact from "primereact/api";
import "./App.scss";

// Prime react css files
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import apolloClient from "./apollo/apollo-config";
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import MenuBar from "./components/MenuBar/MenuBar";
import AuthContextProvider from "./data/AuthContextPrivider";

const App = () => {
    PrimeReact.ripple = true;

    return (
        <AuthContextProvider>
            <ApolloProvider client={apolloClient}>
                <Router>
                    <div className="p-d-flex p-flex-column p-p-2">
                        <MenuBar />
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                    </div>
                </Router>
            </ApolloProvider>
        </AuthContextProvider>
    );
}

export default App;
