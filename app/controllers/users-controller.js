const express = require("express");

const router = express.Router();

router.get("/login", async (request, response) => {
    // just redirect the user to the appropriate login provider,
    // given the type
    response.redirect(`/auth/${request.query.type}`);
});

router.get("/items", async (request, response) => {
    console.log("rendering users/items");
    response.render("users/items");
    console.log("rendered users/items");
});

router.get("/profile", async (request, response) => {
    response.render("users/profile");
});

router.get("/logout", async (request, response) => {
    response.redirect(`/auth/logout`);
});

module.exports = router;
