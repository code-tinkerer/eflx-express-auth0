const express = require("express");
const passport = require("passport");

const router = express.Router();

// to send the user to google to authenticate
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));

// to send the user to the callback page to which google sends the application
// back after authentication
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/users/profile",
    failureRedirect: "/"
}));

/*
router.get("/login", async (request, response) => {
    response.render("auth/login");
});
*/

/*
router.post("/login", async (request, response) => {
    // login the user here
    var email = request.body.email;
    var password = request.body.password;

});
*/

/*
router.get("/callback", async (request, response) => {
    // parse the callback response here
    response.render("auth/callback");

    console.log("after rendering callback");
});

*/

/*
router.get("/signup", async (request, response) => {
    response.render("auth/signup");
});
*/

/*
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
*/

router.get("/logout", async (request, response) => {
    request.logout();

    response.redirect("/");
});

module.exports = router;
