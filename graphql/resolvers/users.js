const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const { validateRegisterInput } = require("../../util/validators");

// Parent field gices you the input on the last step, replace by _ in first arg
module.exports = {
    // In the second parameter destructure the args
    Mutation: {
        register: async (_, { registerInput: { username, email, password, confirmPassword } }, context, info) => {
            // Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError("There are some errors in the input", { errors });
            }
            // Verify user doesn't already exists with mongoos findOne by username filter
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError("Username already taken", {
                    errors: {
                        username: "This username is already taken"
                    }
                })
            }

            // Hash pswrd and create auth token
            encryptedPwd = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password: encryptedPwd,
                createdAt: new Date().toISOString()
            });

            // Save element in mongo DB with save() on a model
            const result = await newUser.save();

            const token = jwt.sign({
                id: result.id,
                email: result.email,
                username: result.username
            }, SECRET_KEY, { expiresIn: "1h" });

            return {
                ...result._doc,
                id: result._id,
                token
            }
        }
    }
}