const { UserInputError } = require("apollo-server");

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
        }
    }
};