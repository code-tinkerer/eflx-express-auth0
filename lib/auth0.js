async function getAccessToken()
{
    var data = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        grant_type: "client_credentials",
        audience: process.env.AUTH0_AUDIENCE
    };

    var response = await axios.post(process.env.AUTH0_ACCESS_TOKEN_URL, data);

    if (!response.data)
    {
        // can't do anything. abort
    }

    var accessToken = response.data.access_token;
}
