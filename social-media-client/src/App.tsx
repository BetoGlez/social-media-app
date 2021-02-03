import React from "react";
import { ApolloProvider } from "@apollo/client";
import "./App.scss";

import apolloClient from "./apollo-config";

const App = () => {
    return (
        <ApolloProvider client={apolloClient}>
            <div className="App">
                <p>Hi</p>
            </div>
        </ApolloProvider>
    );
}

export default App;
