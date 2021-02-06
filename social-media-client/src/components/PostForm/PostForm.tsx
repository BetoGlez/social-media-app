import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { ApolloCache, ApolloError, FetchResult, useMutation } from "@apollo/client";

import { ICreatePostData, ICreatePostPayload, IGetPostsData } from "../../graphql/models/post.model";
import { gqlMutations } from "../../graphql/mutations";
import { gqlQueries } from "../../graphql/queries";

interface PostFormProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    username: string;
}
const PostForm: React.FC<PostFormProps> = (props) => {

    const [newPostBody, setNewPostBody] = useState("");
    const toast = useRef<Toast>(null);

    const [createPost] = useMutation<ICreatePostData, ICreatePostPayload>(
        gqlMutations.CREATE_POST, {
            update: (proxy, result) => handlePostCreation(proxy, result),
            onError: (err) => handleError(err)
        }
    );

    const handlePostCreation = (proxy: ApolloCache<ICreatePostData>, result: FetchResult<ICreatePostData>) => {
        // Update the cache in order to display the updated data without performing another request
        const data = proxy.readQuery<IGetPostsData>({
            query: gqlQueries.GET_POSTS
        });
        if (data && result.data) {
            proxy.writeQuery<IGetPostsData>({ query: gqlQueries.GET_POSTS, data: {
                ...data,
                getPosts: [result.data.createPost, ...data.getPosts]
            }});
        }
        setNewPostBody("");
    };

    const handleError = (err: ApolloError) => {
        const errors = err.graphQLErrors[0].extensions?.exception.errors;
        console.warn("Form errors: ", errors);
        Object.values(errors).forEach(errorMsg => {
            toast.current?.show({severity: "warn", summary: "Cannot create the post", detail: errorMsg});
        });
    };

    const submitNewPost = () => {
        createPost({
            variables: { body: newPostBody }
        });
    };

    return (
        <div {...props}>
            <Toast ref={toast} />
            <div className="p-d-flex p-flex-column">
                <h2>What are you thinking {props.username}?</h2>
                <InputTextarea style={{width: "100%"}} rows={2} value={newPostBody} placeholder="Tell others something interesting"
                    onChange={(e) => setNewPostBody((e.target as HTMLTextAreaElement).value)}/>
                <Button className="p-mt-3" label="Post" onClick={submitNewPost}/>
            </div>
        </div>
    )
};

export default PostForm;