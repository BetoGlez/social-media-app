const { UserInputError } = require("apollo-server");
const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const { validatePostInput } = require("../../util/validators");
const checkAuth = require("../../util/check-auth");

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                // .find() find all the data in a mongo DB app
                const posts = await Post.find().sort({ createdAt: -1 });
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
    },
    Mutation: {
        // We can access the headers with out context
        createPost: async (_, { body }, context) => {
            const user = checkAuth(context);
            const { errors, valid } = validatePostInput(body);
            if (valid) {
                const newPost = new Post({
                    body,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString()
                });
                const post = await newPost.save();
                return post;
            } else {
                throw new UserInputError("Error creating the post", { errors })
            }
        },
        deletePost: async (_, { postId }, context) => {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if (user.username === post?.username) {
                    await post.delete();
                    return "Post deleted successfully";
                } else {
                    throw new AuthenticationError("Action not allowed");
                }
            } catch(err) {
                throw new Error(err);
            }
        },
        likePost: async (_, { postId }, context) => {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);
            if (post) {
                console.log(post.body);
                // Check if the post already contains a like for current user
                if (post.likes.find(like => like.username === username)) {
                    // Post already liked, unlike it
                    post.likes = post.likes.filter(like => like.username !== username);
                } else {
                    // post not liked, like it
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    });
                }
                await post.save();
                return post;
            } else {
                throw new UserInputError("Post not found");
            }
        }
    }
};