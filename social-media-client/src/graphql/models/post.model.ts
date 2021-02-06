import { IComment } from "./comment.model";
import { ILike } from "./like.model";

export interface IPost {
    id: string;
    body: string;
    username: string;
    createdAt: string;
    comments: Array<IComment>;
    likes: Array<ILike>;
    commentCount: number;
    likeCount: number;
}
export interface IGetPostsData {
    getPosts: Array<IPost>;
}

export interface IGetPostPayload {
    postId: string;
}
export interface IGetPostData {
    getPost: IPost;
}

export interface ICreatePostPayload{
    body: string;
}
export interface ICreatePostData {
    createPost: IPost;
}
