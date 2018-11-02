const express = require("express");
const axios = require("axios");
const auth0 = require("auth0");

const userManagement = new auth0.ManagementClient({
    domain: "https://edflix.auth0.com", //process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    audience: "https://edflix.auth0.com/api/v2", //process.env.AUTH0_AUDIENCE,
    responseType: "code token id_token",
    responseMode: "form_post",
    scope: "read:users write:users"
});

const router = express.Router();

router.get("/login", async (request, response) => {
    response.render("auth/login");
});

router.post("/login", async (request, response) => {
    // login the user here
    var email = request.body.email;
    var password = request.body.password;

});

router.get("/callback", async (request, response) => {
    // parse the callback response here
    response.render("auth/callback");

    console.log("after rendering callback");
});

router.get("/signup", async (request, response) => {
    response.render("auth/signup");
});

router.post("/signup", async (request, response) => {
    request.auth.signup(
        {
            email: request.body.email,
            password: request.body.password,
            connection: "Username-Password-Authentication",
            user_metadata: {
                name: request.body.name
            }
        },
        err => {
            if (err)
            {
                return alert('Something went wrong: ' + err.message);
            }

            return alert('success signup without login!');
        }
    );

    response.send("sign in successful");
});

router.get("/logout", async (request, response) => {
    request.logout();

    response.redirect("/");
});

module.exports = router;
