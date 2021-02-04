import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import AuthContext from "../../data/auth-context";
import { gqlQueries } from "../../graphql/queries";
import { IGetPostsData } from "../../graphql/models/post.model";
import PostCard from "../../components/PostCard/PostCard";

const HomePage: React.FC = () => {

    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery<IGetPostsData>(gqlQueries.GET_POSTS);

    return (
        <div className="p-d-flex p-flex-column p-ai-center">
            <h1 className="p-mt-6">Recent posts</h1>
            <div className="p-grid">
                {
                    !loading && data && data.getPosts.map(post => (
                        <div key={post.id} className="p-col-12">
                            <PostCard className="p-m-6" post={post} isUserAuth={!!user}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HomePage;