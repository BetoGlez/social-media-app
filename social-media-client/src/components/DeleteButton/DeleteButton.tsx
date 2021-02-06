import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ApolloCache, FetchResult, useMutation } from "@apollo/client";
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';

import { gqlMutations } from "../../graphql/mutations";
import { IDeletePostPayload, IGetPostsData } from "../../graphql/models/post.model";
import { gqlQueries } from "../../graphql/queries";

interface DeleteButtonProps {
    className?: string;
    postId: string;
}
const DeleteButton: React.FC<DeleteButtonProps> = (props) => {

    const history = useHistory();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deletePostMut] = useMutation<{}, IDeletePostPayload>(gqlMutations.DELETE_POST, {
        update: (proxy, result) => handleDeletePost(proxy, result)
    });

    const handleDeletePost = (proxy: ApolloCache<{}>, result: FetchResult<{}>) => {
        const data = proxy.readQuery<IGetPostsData>({ query: gqlQueries.GET_POSTS });
        if (data) {
            proxy.writeQuery<IGetPostsData>({ query: gqlQueries.GET_POSTS, data: {
                ...data,
                getPosts: data.getPosts.filter(post => post.id !== props.postId)
            }})
        }
        history.replace("/");
    };

    const deletePost = (postId: string) => {
        console.log("Deleting: ", postId);
        deletePostMut({ variables: { postId }});
    };

    return (
        <>
            <ConfirmDialog visible={isConfirmOpen} onHide={() => setIsConfirmOpen(false)} acceptClassName="p-button-danger"
                message="Do you want to delete this post?" icon="pi pi-exclamation-triangle"
                accept={() => deletePost(props.postId)} reject={() => setIsConfirmOpen(false)} />
            <Button className={`p-button-outlined p-button-danger ${props.className}`} label="Delete"
                onClick={() => setIsConfirmOpen(true)}/>
        </>
    );
};

export default DeleteButton;