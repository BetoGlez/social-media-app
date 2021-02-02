const Post = require("../../models/Post");

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                // .find() find all the data in a mongo DB app
                const posts = await Post.find();
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        },
        getPost: async (_, { postId }) => {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error("Post not found");
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    }
};