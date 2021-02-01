const postsResolvers = require("./posts");
const usersResolvers = require("./users");

module.exports = {
    Query: {
        ...postsResolvers.Query
    }
};