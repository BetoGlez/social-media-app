import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// Configure our graphql server
const httpLink = createHttpLink({
    uri: "http://localhost:5000"
});
// Configure client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default apolloClient;