const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/login", async (request, response) => {
    response.render("users/login");
});

router.post("/login", async (request, response) => {
    // login the user here
});

router.get("/callback", async (request, response) => {
    response.render("users/callback");
});

router.get("/signup", async (request, response) => {
    response.render("users/signup");
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
