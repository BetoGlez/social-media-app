import { gql } from "@apollo/client";

export abstract class gqlQueries {
    public static readonly GET_POSTS = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            commentCount
            likeCount
            likes {
                id
                username
            }
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
    `;
    public static readonly GET_POST = gql`
        query getPost($postId: ID!) {
            getPost(postId: $postId) {
                id
                body
                username
                comments {
                    id
                    body
                    username
                }
                likes {
                    id
                    username
                }
                likeCount
                commentCount
                createdAt
            }
        }
    `;
}
