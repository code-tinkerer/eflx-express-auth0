const express = require("express");
const session = require("express-session");
const axios = require("axios");
const bodyParser = require("body-parser");
//const auth0 = require("auth0-js");

const controllers = require("./controllers");

/*
const auth = new auth0.AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    audience: process.env.AUTH0_AUDIENCE,
    redirectUri: process.env.AUTH0_CALLBACK_URL,
    responseType: "code token id_token",
    responseMode: "form_post",
    scope: "openid profile email"
});
*/

const app = express();

app.use(express.static(`${__dirname}/../public`));

app.use(bodyParser.urlencoded({extended: true}));

/*
app.use((request, response, next) => {
    request.auth = webAuth;

    return next();
});
*/

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.get("/", (request, response) => {
    response.render("index");
});

app.use("/items", controllers.items);
app.use("/users", controllers.users);

module.exports = app;
