import { IPost } from "./post.model";

export interface IComment {
    id: string;
    body: string;
    username: string;
    createdAt: string;
}

export interface IDeleteCommentPayload {
    postId: string;
    commentId: string;
}
export interface IDeleteCommentData {
    deleteComment: IPost;
}

export interface ICreateCommentPayload {
    postId: string;
    body: string;
}
export interface ICreateCommentData {
    createComment: IPost;
}