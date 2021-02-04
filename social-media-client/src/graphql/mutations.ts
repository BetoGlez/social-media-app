import { gql } from "@apollo/client";

export abstract class gqlMutations {
    public static readonly REGISTER_USER = gql`
        mutation register(
            $username: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
        ) {
            register(
                registerInput: {
                    username: $username
                    email: $email
                    password: $password
                    confirmPassword: $confirmPassword
                }
            ) {
                id
                username
                email
                token
                createdAt
            }
        }
    `;
    public static readonly LOGIN_USER = gql`
        mutation login(
            $username: String!
            $password: String!
        ) {
            login(
                loginInput: {
                    username: $username
                    password: $password
                }
            ) {
                id
                username
                email
                token
                createdAt
            }
        }
    `;
}
