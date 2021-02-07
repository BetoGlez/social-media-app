import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { gqlMutations } from "../../graphql/mutations";
import { ICreateCommentData, ICreateCommentPayload } from "../../graphql/models/comment.model";

interface CommentFormProps {
    postId: string;
}
const CommentForm: React.FC<CommentFormProps> = (props) => {

    const [newCommentBody, setNewCommentBody] = useState("");

    const [createComment] = useMutation<ICreateCommentData, ICreateCommentPayload>(gqlMutations.CREATE_COMMENT, {
        variables: { body: newCommentBody, postId: props.postId },
        update: () => {setNewCommentBody("");}
    });

    const submitComment = () => {
        if (newCommentBody) {
            createComment();
        }
    };

    return (
        <div className="p-d-flex p-mt-4">
            <InputTextarea style={{width: "100%"}} rows={2} value={newCommentBody} placeholder="Add a comment..."
                onChange={(e) => setNewCommentBody((e.target as HTMLTextAreaElement).value)}/>
            <Button disabled={!newCommentBody.trim()} className="p-ml-3" label="Add" onClick={submitComment}/>
        </div>
    );
};

export default CommentForm;