const GoogleAuthStrategy = require("passport-google-oauth").OAuth2Strategy;

const auth = require("./auth");

// google auth strategy options
const options = {
    clientID: auth.google.clientID,
    clientSecret: auth.google.clientSecret,
    callbackURL: auth.google.callbackURL
};

// google auth strategy result verification
function verify(token, refreshToken, profile, done)
{
    done(null, profile);
}

const googleAuthStrategy = new GoogleAuthStrategy(options, verify);

module.exports = function(passport)
{
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(googleAuthStrategy);
};
