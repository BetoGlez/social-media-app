import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { useMutation } from "@apollo/client";

import { ILike, ILikePostData, ILikePostPayload } from "../../graphql/models/like.model";
import { IUser } from "../../graphql/models/user.model";
import { gqlMutations } from "../../graphql/mutations";

interface LikeButtonProps {
    id: string;
    likes: Array<ILike>;
    likeCount: number;
    className: string;
    user: IUser | null;
}
const LikeButton: React.FC<LikeButtonProps> = (props) => {

    const history = useHistory();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (props.user && props.likes.find(like => like.username === props.user?.username)) {
            // The current user have liked this post before
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [props.user, props.likes]);

    const [likePost] = useMutation<ILikePostData, ILikePostPayload>(gqlMutations.LIKE_POST);

    const clikLikeButton = () => {
        if (props.user) {
            likePost({ variables: { postId: props.id } });
        } else {
            history.replace("/login");
        }
    };

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

    return (
        <div className={`${props.className} p-d-flex p-ai-center p-jc-start`}>
            <Button className="p-button-text p-button-rounded p-mr-1" onClick={clikLikeButton}
                icon={`pi ${liked ? "pi-thumbs-down" : "pi-thumbs-up"}`} />
            <p className="p-m-0 dataInfoTooltip" data-pr-tooltip={composeUserLikes(props.likes)}>{props.likeCount}</p>
        </div>
    );
};

export default LikeButton;