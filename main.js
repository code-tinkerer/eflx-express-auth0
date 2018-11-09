require("dotenv").config();

const app = require("./app");

app.listen(process.env.PORT || 8080, () => {
    console.log("Application started");
});

// code from https://auth0.com/docs/libraries/auth0js/v9
