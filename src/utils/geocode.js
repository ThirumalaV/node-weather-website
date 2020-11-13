const request = require('request');

const geoCode = (address, callback) => {
    const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGhpcnVtYWxhcmFvdmVtdXJpIiwiYSI6ImNrZ205NXZ4czA0OW8yeW13Z3Bqenl4OG8ifQ.ofJ_RaGoI6nojYQ29Z_Qqw&limit=1';
    // request( {url:geoCodeURL, json:true}, (error, response) => {
        request( {url:geoCodeURL, json:true}, (error, { body }) => {
        if(error) {
            callback('Unable to get the Co-ordinates details from the API!', undefined);
            // } else if(response.body.features.length === 0) {
            } else if(body.features.length === 0) {
                callback('Unable to find the City!', undefined);
                } else {
                    callback(undefined, {
                        // latitude: response.body.features[0].center[1],
                        // longitude: response.body.features[0].center[0],
                        // location: chalk.green.bold(response.body.features[0].place_name)
                        latitude: body.features[0].center[1],
                        longitude: body.features[0].center[0],
                        location: body.features[0].place_name
                    })
                }   
    })
}

module.exports = geoCode;