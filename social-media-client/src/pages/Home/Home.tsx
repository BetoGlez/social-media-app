import React from "react";
import { useQuery } from "@apollo/client";

import { gqlQueries } from "../../graphql/queries";
import { IGetPostsData } from "../../graphql/models/post.model";
import PostCard from "../../components/PostCard/PostCard";

const HomePage: React.FC = () => {

    const { loading, data } = useQuery<IGetPostsData>(gqlQueries.GET_POSTS);

    return (
        <div className="p-d-flex p-flex-column p-ai-center">
            <h1 className="p-mt-6">Recent posts</h1>
            <div className="p-grid">
                {
                    !loading && data && data.getPosts.map(post => (
                        <div key={post.id} className="p-col-4">
                            <PostCard className="p-m-6" post={post}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HomePage;