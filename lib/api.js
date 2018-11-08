const axios = require("axios");

async function call(uri, options)
{
    // get the access token if not already 
    var apiURL = `${process.env.API_SERVER}/${uri}`;
    
    var response = await axios.get(apiURL);

    if (response.status == 401) // unauthorized
    {
        // get the token here
    }

    response = await axios.get(apiURL);

    return response;
}

module.exports = call;
