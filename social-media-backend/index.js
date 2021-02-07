const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGO_DB } = require("./config.js");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

// We take the request req from express and forward it to apollo
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req, pubsub })});

// First we connect to mongo DB and after that chain in a promise the server listen
mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to mongo DB");
        return server.listen({ port: PORT })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })
    .catch(err => {
        console.error("There was an error running the server or connectiong to DB: ", err);
    });