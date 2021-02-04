const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const { validateRegisterInput, validateLoginInput } = require("../../util/validators");
const { generateToken } = require("../../util/utils");

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

            const token = generateToken(result);

            return {
                ...result._doc,
                id: result._id,
                token
            }
        },
        login: async (_, { loginInput: { username, password } } ) => {
            const { errors, valid } = validateLoginInput(username, password);
            if (!valid) {
                throw new UserInputError("Empty fields", { errors });
            }

            const user = await User.findOne({ username });
            if (!user) {
                errors.general = "User not found";
                throw new UserInputError("User not found", { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = "Wrong credentials";
                throw new UserInputError("Wrong credentials", { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
}