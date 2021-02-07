import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";

import AuthContext from "../../data/auth-context";
import { gqlQueries } from "../../graphql/queries";
import { IGetPostData, IGetPostPayload } from "../../graphql/models/post.model";
import LikeButton from "../../components/LikeButton/LikeButton";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import CommentForm from "../../components/CommentForm/CommentForm";

const SinglePostPage: React.FC = () => {

    const { user } = useContext(AuthContext);
    const { postId } = useParams<{postId: string}>();

    const { data } = useQuery<IGetPostData, IGetPostPayload>(gqlQueries.GET_POST, {
        variables: { postId }
    });

    const getPostDetail = () => {
        let postDetail = <ProgressSpinner/>

        if (data?.getPost) {
            const { id, username, body, createdAt, likes, comments, likeCount, commentCount } = data.getPost;
            postDetail =
            <div className="p-d-flex p-ai-center p-flex-column" style={{ width: "100%" }}>
                <h1>Details of {username}'s post</h1>
                <Card className="p-d-flex p-flex-column" style={{ width: "80%" }}>
                    <div className="p-d-flex p-ai-center">
                        <Avatar className="p-mr-6" shape="circle" size="xlarge"
                            image={`https://picsum.photos/${Math.floor(Math.random() * (500 - 100) + 100)}`} />
                        <div className="p-d-flex p-flex-column" style={{width: "100%"}}>
                            <h2 className="p-m-0">{body}</h2>
                            <h3 className="p-mt-1" style={{opacity: "0.5"}}>{username}</h3>
                            <div className="p-d-flex p-jc-between p-ai-center" style={{width: "100%"}}>
                                <p className="p-m-0">{moment(createdAt).fromNow()}</p>
                                <div className="p-d-flex p-ai-center">
                                    { !!user && user.username === username &&
                                        <DeleteButton className="p-mr-3" postId={id}/>
                                    }
                                    <i className="pi pi-comments"></i>
                                    <p className="p-my-0 p-mx-2">{commentCount}</p>
                                    <LikeButton user={user} id={id} likes={likes} likeCount={likeCount}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    {
                    !!user &&
                        <CommentForm postId={id}/>
                    }
                    <div className="p-d-flex p-flex-column p-mt-5">
                        {
                        comments.map(comment => (
                            <div key={comment.id} className="p-d-flex p-flex-column p-mt-3" style={{ padding: "10px" }}>
                                <div className="p-d-flex p-ai-center p-jc-between">
                                    <div className="p-d-flex p-ai-center">
                                        <Avatar className="p-mr-3" shape="circle"
                                            image={`https://picsum.photos/${Math.floor(Math.random() * (500 - 100) + 100)}`} />
                                        <p className="p-m-0">{ comment.body }</p>
                                    </div>
                                    { user && user.username === comment.username &&
                                        <DeleteButton commentId={comment.id} postId={postId}/>
                                    }
                                </div>
                                <div className="p-d-flex p-mt-1 p-jc-end" style={{ opacity: "0.5" }}>
                                    <p className="p-m-0">{ comment.username } on { moment(comment.createdAt).fromNow() }</p>
                                </div>
                                <Divider />
                            </div>
                        ))
                        }
                    </div>
                </Card>
            </div>
        }

        return postDetail;
    };

    return (
        <div className="p-d-flex p-jc-center">
            {
            getPostDetail()
            }
        </div>
    );
};

export default SinglePostPage;