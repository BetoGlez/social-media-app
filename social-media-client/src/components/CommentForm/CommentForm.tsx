import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const CommentForm: React.FC = () => {

    const [newCommentBody, setNewCommentBody] = useState("");

    return (
        <div className="p-d-flex p-mt-4">
            <InputTextarea style={{width: "100%"}} rows={2} value={newCommentBody} placeholder="Add a comment..."
                onChange={(e) => setNewCommentBody((e.target as HTMLTextAreaElement).value)}/>
            <Button className="p-ml-3" label="Add"/>
        </div>
    );
};

export default CommentForm;