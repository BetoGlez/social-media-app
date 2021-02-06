import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Configure our graphql server
const httpLink = createHttpLink({
    uri: "http://localhost:5000"
});
// Authorization header with our token
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("jwtToken");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    };
});
// Configure client set type policy to prevent merge warning in likes
const apolloClient = new ApolloClient({
    link:  authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Post: {
                fields: {
                    likes: {
                        merge: false
                    }
                }
            }
        }
    })
});


export default apolloClient;