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
        }
    }
};