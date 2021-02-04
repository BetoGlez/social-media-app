import { gql } from "@apollo/client";

export abstract class GraphQlQueries {
    public static readonly GET_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            commentCount
            likeCount
            likes {
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
}
