const axios = require("axios");

//const auth0 = require("./auth0");

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

    var method = options && options.method ? methods[options.method.toLowerCase()] : methods["get"];

    var accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlEwSkVNekk0TnprMlFVRkNRekk1TmtVd05VTTRNek16UlRSQlFrTTJSalUyUlVKRVEwRTNRUSJ9.eyJpc3MiOiJodHRwczovL2VkZmxpeC5hdXRoMC5jb20vIiwic3ViIjoiM3NmUjQ2RmdaVENNRXVpOWl4WkdwR1M3ckFPd3VEaUpAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLmVkZmxpeC5jb20iLCJpYXQiOjE1NDE2OTQ0NzQsImV4cCI6MTU0MTc4MDg3NCwiYXpwIjoiM3NmUjQ2RmdaVENNRXVpOWl4WkdwR1M3ckFPd3VEaUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.R-lrxcB_8dTIW-_sHCXNGXoA2II1WXCbGhcPD8_dpE1wUYcVlHWctzn6BTe2e4AXeI3_hn8NlwU5LRTeeKAvKhQaC-nHKc9No3jBF89ywpEQnY5cq7i2gdzXX6jqFhfkiXoMLMN0uDSgqngatAceydfYZzI1Pn2r9E3SKu5wbLbvCn0t5BoRhpHGIaV7U-YP7mcXfvorKg2XCOnbmoZwEKXysP-MI--ExAZUjFkmAkFb4Ea6pFqXC0GAR5u9yTfURaB_WwsO2b4XZgJiGF63NT6NLKlDdQv0XWK9ks8_W62S1lfQK7YQXdElSSWEMA0r_Cpd2_Tum4aCu2KS8eB7qw";

    var data = Object.assign({}, options ? options.data : {});
    var headers = {
        headers: Object.assign({}, {"Authorization": `Bearer ${accessToken}`}, options ? options.headers : {})
    };

    // only get doesn't have any data to send
    var response = (options && options.method !== "get") ?
        await method(apiURL, data, headers) :
        await method(apiURL, headers);

    /*
    if (response.status == 401) // unauthorized
    {
        // get the token here
    }

    response = await axios.get(apiURL);
    */

    return response;
}

module.exports = {
    call
};
