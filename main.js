require("dotenv").config();

const app = require("./app");

app.listen(process.env.PORT || 8080, () => {
    console.log("Serving the EdFlix application");
});

// code from https://auth0.com/docs/libraries/auth0js/v9
