import { IPost } from "./post.model";

export interface ILike {
    id: string;
    createdAt: string;
    username: string;
}

export interface ILikePostPayload {
    postId: string;
}
export interface ILikePostData {
    likePost: IPost;
}