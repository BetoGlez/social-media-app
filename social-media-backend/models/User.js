const { model, Schema } = require("mongoose");

// Define the schema to be used to store data in MongoDB
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

module.exports = model("User", userSchema);