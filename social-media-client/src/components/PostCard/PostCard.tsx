import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";

import { IPost } from "../../graphql/models/post.model";
import { IUser } from "../../graphql/models/user.model";
import LikeButton from "../LikeButton/LikeButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import CommentForm from "../CommentForm/CommentForm";

interface PostCardProps {
    className?: string;
    post: IPost;
    currentUser: IUser | null;
}
const PostCard: React.FC<PostCardProps> = (props) => {

    const history = useHistory();

    const footer =
        <div className="p-d-flex p-flex-column">
            <div className="p-d-flex p-ai-center p-jc-start">
                {!!props.currentUser && props.currentUser.username === props.post.username && (
                    <DeleteButton className="p-mr-3" postId={props.post.id}/>
                )}
                <Button className="p-button-outlined p-button-help p-mr-3" label="Detail"
                    onClick={() => history.replace(`/posts/${props.post.id}`)}/>
                <i className="pi pi-comments"></i>
                <p className="p-my-0 p-mx-2">{props.post.commentCount}</p>
                <LikeButton id={props.post.id} likes={props.post.likes}
                    likeCount={props.post.likeCount} user={props.currentUser}/>
            </div>
            {
            !!props.currentUser &&
            <CommentForm postId={props.post.id}/>
            }
            <div className="p-d-flex p-flex-column p-mt-5">
                {
                props.post.comments.map(comment => (
                    <div key={comment.id} className="p-d-flex p-flex-column p-mt-3" style={{ padding: "10px" }}>
                        <div className="p-d-flex p-ai-center p-jc-between">
                            <div className="p-d-flex p-ai-center">
                                <Avatar className="p-mr-3" shape="circle"
                                    image={`https://picsum.photos/${Math.floor(Math.random() * (500 - 100) + 100)}`} />
                                <p className="p-m-0">{ comment.body }</p>
                            </div>
                            { props.currentUser && props.currentUser.username === comment.username &&
                                <DeleteButton commentId={comment.id} postId={props.post.id}/>
                            }
                        </div>
                        <div className="p-d-flex p-mt-3 p-jc-end" style={{ opacity: "0.5" }}>
                            <p className="p-m-0">{ comment.username } on { moment(comment.createdAt).fromNow() }</p>
                        </div>
                        <Divider />
                    </div>
                ))
                }
            </div>
        </div>

    return (
        <Card className={props.className} title={props.post.body}
            subTitle={`${props.post.username} on ${moment(props.post.createdAt).fromNow()}`} footer={footer} />
    );
};

export default PostCard;