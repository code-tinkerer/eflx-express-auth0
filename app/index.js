const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

require("../config/passport")(passport);

const controllers = require("./controllers");

const app = express();

app.use(express.static(`${__dirname}/../public`));

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "this-is-a-secret"
}));

app.use(passport.initialize());
app.use(passport.session());

// middleware to determine if a user is authenticated
// already
/*
function authenticated(request, response, next)
{
    if (request.isAuthenticated && request.isAuthenticated())
    {
        return next();
    }

    response.redirect("/");
}
*/

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.get("/", (request, response) => {
    response.render("index");
});

app.use("/items", controllers.items);
app.use("/users", controllers.users);
app.use("/auth", controllers.auth);

module.exports = app;
