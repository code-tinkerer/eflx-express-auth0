const express = require("express");

const api = require("../../lib/api");

const tags = [
    "api", "auth", "node", "nodejs", "scotch", "philosophy", "physics", "science",
    "universe", "aeon", "genetics", "guardian", "nature", "medium", "books"
];

const router = express.Router();

router.get("/", async (request, response) => {
    var userId = request.user.id;

    const result = await api.call(`/api/v1/${userId}/items`);

    response.render("items/index", {items: result.data.items, tags: tags});
});

router.get("/:id", (request, response) => {
    response.render("book", {book: books[parseInt(request.params.id)]});
});

module.exports = router;
