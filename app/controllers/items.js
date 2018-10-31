const express = require("express");
const axios = require("axios");

const tags = [
    "api", "auth", "node", "nodejs", "scotch", "philosophy", "physics", "science",
    "universe", "aeon", "genetics", "guardian", "nature", "medium", "books"
];

const router = express.Router();

router.get("/", async (request, response) => {
    const result = await axios.get("http://localhost:8080/api/v1/items");

    response.render("items/index", {items: result.data.items, tags: tags});
});

router.get("/:id", (request, response) => {
    response.render("book", {book: books[parseInt(request.params.id)]});
});

module.exports = router;
