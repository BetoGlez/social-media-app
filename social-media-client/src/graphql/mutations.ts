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
    public static readonly CREATE_POST = gql`
        mutation createPost($body: String!) {
            createPost(body: $body) {
                id
                body
                createdAt
                username
                likes {
                    id
                    username
                    createdAt
                }
                comments {
                    id
                    body
                    username
                    createdAt
                }
                likeCount
                commentCount
            }
        }
    `;
    public static readonly LIKE_POST = gql`
        mutation likePost($postId: ID!) {
            likePost(postId: $postId) {
                id
                likes {
                    id
                    username
                }
                likeCount
            }
        }
    `;
    public static readonly DELETE_POST = gql`
        mutation deletePost($postId: ID!) {
            deletePost(postId: $postId)
        }
    `;
}
