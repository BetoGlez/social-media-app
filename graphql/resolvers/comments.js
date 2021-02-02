const { UserInputError, AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");
const { validateCommentInput } = require("../../util/validators");

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            const { errors, valid } = validateCommentInput(body);
            if (valid) {
                const post = await Post.findById(postId);
                if (post) {
                    post.comments.unshift({
                        body,
                        username,
                        createdAt: new Date().toISOString()
                    });
                    await post.save();
                    return post;
                } else {
                    throw new UserInputError("Post not found");
                }
            } else {
                throw new UserInputError("The comment body cannot be empty", { errors });
            }
        },
        deleteComment: async (_, { postId, commentId }, context) => {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if (post) {
                const commentIndex = post.comments.findIndex(comment => comment.id === commentId);
                if (commentIndex > -1) {
                    if (post.comments[commentIndex].username === username) {
                        post.comments.splice(commentIndex, 1);
                        await post.save();
                        return post;
                    } else {
                        throw new AuthenticationError("Action not allowed");
                    }
                } else {
                    throw new UserInputError("Comment not found");
                }
            } else {
                throw new UserInputError("Post not found");
            }
        }
    }
};