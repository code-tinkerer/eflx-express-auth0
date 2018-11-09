const GoogleAuthStrategy = require("passport-google-oauth").OAuth2Strategy;

const auth = require("./auth");

const api = require("../lib/api");

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

async function getUser(id)
{
    try
    {
        var response = await api.call(`/api/v1/users/${id}`);

        return response.data;
    }
    catch(error)
    {
        return null;
    }
}

module.exports = function(passport) {
    // userInfo holds the information about the user that can be
    // used to build a User object that will be passed around
    // in each request
    passport.serializeUser(async (userInfo, done) => {
        // find the user in the database first to check if the user exists
        var user = await getUser(`${userInfo.provider}-${userInfo.id}`);

        // ...if the user does NOT exist, create an entry for
        // it
        if (!user)
        {
            var userData = {
                "name": userInfo.displayName,
                "email": userInfo.emails[0].value,
                "external_id": `${userInfo.provider}-${userInfo.id}`
            };

            try
            {
                response = await api.call("/api/v1/users", {data: userData, method: "post"});

                user = response.data.user;
            }
            catch(error)
            {
                user = null;
            }
        }

        done(null, user);
    });

    /*
    passport.deserializeUser(async (userInfo, done) => {
        let user = null;

        try
        {
            var response = await getUser(userInfo.id);

            user = response.data.user;

        }
        catch(error)
        {
        }

        done(null, user);
    });
    */

    passport.deserializeUser(async (userInfo, done) => {
        var user = await getUser(userInfo.id);

        done(null, user);
    });

    passport.use(googleAuthStrategy);
};
