const webAuth = new auth0.WebAuth({
    domain: "edflix.auth0.com",
    clientID: "MgIvcJ8NVI63I8CbypdRRDjaiynMolgM",
    redirectUri: "http://localhost:8080/users/callback",
    audience: "https://api.edflix.com",
    responseType: "token id_token",
    scope: "openid"
});

function login()
{
    webAuth.authorize();
}

var tokens = {};

function handleAuth(callback)
{
    webAuth.parseHash((error, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken)
        {
            tokens.accessToken = authResult.accessToken;
            tokens.idToken = authResult.idToken;
            tokens.expiration = (new Date()).getTime() + authResult.expiresIn * 1000;

            callback();
        }
        else
        {
            console.log(error);
        }
    });
}

function signup()
{
    webAuth.signup();
};

function isLoggedIn()
{
    console.log("[isLoggedIn]: tokens is");
    console.log(tokens)

    return tokens.accessToken && (new Date()).getTime() < tokens.expiration;
};

function logout()
{
    console.log("[logout]: logging out");

    tokens = {};
};

/*
export {
    login,
    signup,
    handleAuth,
    isLoggedIn,
    logout
};
*/
