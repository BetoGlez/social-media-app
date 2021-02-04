import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { InputTextarea } from "primereact/inputtextarea";

import { IPost } from "../../graphql/models/post.model";
import { ILike } from "../../graphql/models/like.model";

interface PostCardProps {
    className?: string;
    post: IPost;
}
const PostCard: React.FC<PostCardProps> = (props) => {

    const [newCommentBody, setNewCommentBody] = useState("");

    const composeUserLikes = (likes: Array<ILike>): string => {
        let userLikesMsg = "No likes yet";
        if (likes.length > 0) {
            userLikesMsg = likes.map(like => {
                return like.username;
            })
            .reduce((prev, curr) => prev + ", " + curr);
        }
        return userLikesMsg;
    };

    const composePostDate = (date: string) => {
        return date.substring(0, 10);
    };

    const footer =
        <div className="p-d-flex p-flex-column">
            <div className="p-d-flex p-ai-center p-jc-start">
                <Tooltip target=".dataInfoTooltip" mouseTrack mouseTrackLeft={10} />
                <Button className="p-button-text p-button-rounded p-mr-2" icon="pi pi-thumbs-up" style={ { color: "white" } } />
                <p className="p-m-0 dataInfoTooltip" data-pr-tooltip={composeUserLikes(props.post.likes)}>{props.post.likeCount}</p>
            </div>
            <div className="p-d-flex p-mt-4">
                <InputTextarea style={{width: "100%"}} rows={2} value={newCommentBody} onChange={(e) => setNewCommentBody((e.target as HTMLTextAreaElement).value)}/>
                <Button className="p-ml-3" label="Add"/>
            </div>
            <div className="p-d-flex p-flex-column p-mt-5">
                {
                    props.post.comments.map(comment => (
                        <div key={comment.id} className="p-d-flex p-flex-column p-mt-3" style={{ border: "0.5px solid lightgray", padding: "10px" }}>
                            <p className="p-m-0">{ comment.body }</p>
                            <div className="p-d-flex p-mt-1 p-jc-end" style={{ opacity: "0.5" }}>
                                <p className="p-m-0">{ comment.username } on { composePostDate(comment.createdAt) }</p>
                            </div>
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