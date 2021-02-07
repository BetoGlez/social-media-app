import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ApolloCache, FetchResult, useMutation } from "@apollo/client";
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';

import { gqlMutations } from "../../graphql/mutations";
import { IDeletePostPayload, IGetPostsData } from "../../graphql/models/post.model";
import { IDeleteCommentData, IDeleteCommentPayload } from "../../graphql/models/comment.model";
import { gqlQueries } from "../../graphql/queries";

interface DeleteButtonProps {
    className?: string;
    postId: string;
    commentId?: string;
}
const DeleteButton: React.FC<DeleteButtonProps> = (props) => {

    const history = useHistory();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const mutationQuery = props.commentId ? gqlMutations.DELETE_COMMENT : gqlMutations.DELETE_POST;
    const [deletePostOrCommentMut] = useMutation<{} | IDeleteCommentData, IDeletePostPayload | IDeleteCommentPayload>(mutationQuery, {
        update: (proxy, result) => handleDelete(proxy, result)
    });

    const handleDelete = (proxy: ApolloCache<{}>, result: FetchResult<{}>) => {
        const data = proxy.readQuery<IGetPostsData>({ query: gqlQueries.GET_POSTS });
        if (data && !props.commentId) {
            proxy.writeQuery<IGetPostsData>({ query: gqlQueries.GET_POSTS, data: {
                ...data,
                getPosts: data.getPosts.filter(post => post.id !== props.postId)
            }})
        }
        history.replace("/");
    };

    const deletePostOrComment = (postId: string, commentId?: string) => {
        if (commentId) {
            console.log("Deleting comment: ", commentId);
        } else {
            console.log("Deleting post: ", postId);
        }
        deletePostOrCommentMut({ variables: { postId, commentId }});
    };

    return (
        <>
            <ConfirmDialog visible={isConfirmOpen} onHide={() => setIsConfirmOpen(false)} acceptClassName="p-button-danger"
                message={`Do you want to delete this ${props.commentId ? "comment" : "post"}?`} icon="pi pi-exclamation-triangle"
                accept={() => deletePostOrComment(props.postId, props.commentId)} reject={() => setIsConfirmOpen(false)} />
            <Button className={`p-button-outlined p-button-danger ${props.className}`} label="Delete"
                onClick={() => setIsConfirmOpen(true)}/>
        </>
    );
};

export default DeleteButton;