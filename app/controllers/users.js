const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/items", async (request, response) => {
    console.log("rendering users/items");
    response.render("users/items");
    console.log("rendered users/items");
});

module.exports = router;
