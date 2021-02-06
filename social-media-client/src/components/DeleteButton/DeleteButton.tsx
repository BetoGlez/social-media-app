import React from "react";
import { Button } from "primereact/button";

interface DeleteButtonProps {
    className?: string;
    postId: string;
}
const DeleteButton: React.FC<DeleteButtonProps> = (props) => {

    const deletePost = (postId: string) => {
        console.log("Deleting: ", postId);
    };

    return (
        <Button className={`p-button-outlined p-button-danger ${props.className}`} label="Delete"
            onClick={() => deletePost(props.postId)}/>
    );
};

export default DeleteButton;