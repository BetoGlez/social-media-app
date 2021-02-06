import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { Avatar } from "primereact/avatar";

import { IPost } from "../../graphql/models/post.model";
import { IUser } from "../../graphql/models/user.model";
import LikeButton from "../LikeButton/LikeButton";

interface PostCardProps {
    className?: string;
    post: IPost;
    currentUser: IUser | null;
}
const PostCard: React.FC<PostCardProps> = (props) => {

    const history = useHistory();
    const [newCommentBody, setNewCommentBody] = useState("");

    const deletePost = (postId: string) => {
        console.log("Deleting: ", postId);
    };

    const composePostDate = (date: string) => {
        return date.substring(0, 10);
    };

    const footer =
        <div className="p-d-flex p-flex-column">
            <div className="p-d-flex p-ai-center p-jc-start">
                <Tooltip target=".dataInfoTooltip" mouseTrack mouseTrackLeft={10} />
                {!!props.currentUser && props.currentUser.username === props.post.username && (
                <Button className="p-button-outlined p-button-danger p-mr-3" label="Delete"
                    onClick={() => deletePost(props.post.id)}/>
                )}
                <Button className="p-button-outlined p-button-help" label="Detail"
                    onClick={() => history.replace(`/posts/${props.post.id}`)}/>
                <LikeButton className="p-ml-3" id={props.post.id} likes={props.post.likes}
                    likeCount={props.post.likeCount} user={props.currentUser}/>
            </div>
            {
            !!props.currentUser &&
            <div className="p-d-flex p-mt-4">
                <InputTextarea style={{width: "100%"}} rows={2} value={newCommentBody} placeholder="Add a comment..."
                    onChange={(e) => setNewCommentBody((e.target as HTMLTextAreaElement).value)}/>
                <Button className="p-ml-3" label="Add"/>
            </div>
            }
            <div className="p-d-flex p-flex-column p-mt-5">
                {
                props.post.comments.map(comment => (
                    <div key={comment.id} className="p-d-flex p-flex-column p-mt-3" style={{ padding: "10px" }}>
                        <div className="p-d-flex p-ai-center">
                            <Avatar className="p-mr-3" shape="circle" image={`https://picsum.photos/${Math.floor(Math.random() * (500 - 100) + 100)}`} />
                            <p className="p-m-0">{ comment.body }</p>
                        </div>
                        <div className="p-d-flex p-mt-1 p-jc-end" style={{ opacity: "0.5" }}>
                            <p className="p-m-0">{ comment.username } on { composePostDate(comment.createdAt) }</p>
                        </div>
                        <Divider />
                    </div>
                ))
                }
            </div>
        </div>

    return (
        <Card className={props.className} title={props.post.body}
            subTitle={`${props.post.username} on ${composePostDate(props.post.createdAt)}`} footer={footer} />
    );
};

export default PostCard;