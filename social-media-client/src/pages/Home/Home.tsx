import React, { useContext } from "react";
import "./Home.scss";
import { useQuery } from "@apollo/client";
import { ScrollTop } from "primereact/scrolltop";
import { ScrollPanel } from 'primereact/scrollpanel';

import AuthContext from "../../data/auth-context";
import { gqlQueries } from "../../graphql/queries";
import { IGetPostsData } from "../../graphql/models/post.model";
import PostCard from "../../components/PostCard/PostCard";
import PostForm from "../../components/PostForm/PostForm";


const HomePage: React.FC = () => {

    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery<IGetPostsData>(gqlQueries.GET_POSTS);

    return (
        <div className="p-d-flex p-flex-column p-ai-center home-page">
            <h1 className="p-mt-6">Recent posts</h1>
            {
            !!user &&
            <div className="p-d-flex p-jc-center p-mb-6 post-form-container">
                <PostForm className="post-form" username={user.username}/>
            </div>
            }
            <ScrollPanel style={{ height: !!user ? "55vh" : "75vh", width: "100%" }}>
                <div className="p-grid">
                    {
                    !loading && data && data.getPosts.map(post => (
                        <div key={post.id} className="p-col-10 p-offset-1">
                            <PostCard className="p-mt-6" post={post} currentUser={user}/>
                        </div>
                    ))
                    }
                </div>
                <ScrollTop target="parent" threshold={100} className="custom-scrolltop" icon="pi pi-arrow-up" />
            </ScrollPanel>
        </div>
    );
};

export default HomePage;