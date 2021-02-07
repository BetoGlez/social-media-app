# Social Media App

A full stack project for a small social media app, using MERNG stack (MongoDB, Express, React JS, Node and GraphQL)

## Project demo

https://youtu.be/pHzLxIJZBCU

### Previous configuration

In order to test it by yourself you should provide a config file under `social-media-backend/config.js` with your custom Mongo DB credentials and a secret key to encode your auth token:

```js
module.exports = {
    MONGO_DB: "mongodb+srv...YOUR_MONGODB_CREDENTIALS_AND_DATABASE_HERE",
    SECRET_KEY: "YOUR_AUTH_TOKEN_KEY_GENERATOR_HERE"
}
```

### Technolgies used

* Node JS
* Express
* Apollo Server
* GraphQL
* Mongoose
* Mongo DB
* React JS
* Prime React
* Apollo Client
* Formik

### Project features

* Register user
* Login user
* View all posts
* View a single post
* Create a post
* Delete owned posts
* Comment on a post
* Delete owned comments
* Like and unlike posts
