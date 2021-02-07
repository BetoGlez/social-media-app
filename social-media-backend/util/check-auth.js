const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const { SECRET_KEY } = require("../config");

module.exports = (context) => {
    // context = { ...headers }
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        // Bearer ......Vaue of token as a convention
        const token = authHeader.split("Bearer ")[1];
        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch(err) {
                throw new AuthenticationError("Invalid or expired token");
            }
        }
        throw new Error("Authentication token must be \"Bearer [token]");
    }
    throw new Error("Authorization header must be provided");
}