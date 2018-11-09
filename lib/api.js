const axios = require("axios");

//const auth0 = require("./auth0");

function isExpired(token)
{
    return false;
}

async function getAccessToken()
{
    var accessToken =
        localStorage.getItem("access_token") ||
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlEwSkVNekk0TnprMlFVRkNRekk1TmtVd05VTTRNek16UlRSQlFrTTJSalUyUlVKRVEwRTNRUSJ9.eyJpc3MiOiJodHRwczovL2VkZmxpeC5hdXRoMC5jb20vIiwic3ViIjoiM3NmUjQ2RmdaVENNRXVpOWl4WkdwR1M3ckFPd3VEaUpAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLmVkZmxpeC5jb20iLCJpYXQiOjE1NDE3ODE3ODQsImV4cCI6MTU0MTg2ODE4NCwiYXpwIjoiM3NmUjQ2RmdaVENNRXVpOWl4WkdwR1M3ckFPd3VEaUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.BtpsXTJu3Eh_-TkAhO5Mv0Qa75vxln-GzH_jCbPVRFyitomOoh_-eKYnPblYxj-hOgvgkUwFPKwsd7Wf6ORFiEkxZrnePtHY1qnLCq5UYZK0lSLWcyIaQEKA2hj0KXvXcybeu_pHscOE9QdsnChz-z6ZG906H-Iw29V25APlav9dYrJdH24AqHCSeP81B3uWEfZ4eJQTEt6ojVLK2owHtc20ZZ8VJ9bj_GfhAEB80eadfSsbBXaZby_VDLzsYWcINHQ7PbxP0HxpY1tLGQVSlieR8jp9WwLwRIHrK4DMRwxnegMlSrgBbkej1QAKuvE3_HZW8ODD7TDzABLoBy8bCw";

    if (accessToken && !isExpired(accessToken))
    {
        return accessToken;
    }

    var tokenRequest = {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        grant_type: "client_credentials",
        audience: process.env.AUTH0_AUDIENCE
    };

    try
    {
        var response = await axios.post(process.env.AUTH0_TOKEN_URL, tokenRequest, {headers: {"Content-Type": "application/json"}});

        return response.data.access_token;
    }
    catch(error)
    {
        console.log(error);
    }

    return null;
}

async function call(uri, options)
{
    // get the access token if not already 
    var apiURL = `${process.env.API_SERVER}${uri}`;
    
    var methods = {
        "get": axios.get,
        "post": axios.post,
        "put": axios.put,
        "patch": axios.patch,
        "delete": axios.delete,
        "options": axios.options
    };

    var method = options && options.method ? methods[options.method.toLowerCase()] : axios.get;

    var accessToken = await getAccessToken();

    var data = Object.assign({}, options ? options.data : {});
    var headers = {
        headers: Object.assign({}, {"Authorization": `Bearer ${accessToken}`}, options ? options.headers : {})
    };

    // only get doesn't have any data to send
    var response = (options && options.method !== "get") ?
        await method(apiURL, data, headers) :
        await method(apiURL, headers);

    return response;
}

module.exports = {
    call
};
