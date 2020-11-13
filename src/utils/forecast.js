const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const forecastURL = 'http://api.weatherstack.com/current?access_key=1d264d7ab3053132eb08967edc7781b4&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    // request( {url:forecastURL, json:true}, (error, response) => {
        request( {url:forecastURL, json:true}, (error, { body }) => {   /* Object shorthand */
        if(error) {
            callback('Unable to get the Weather details from the API!', undefined);
            // } else if(response.body.error) {
            } else if(body.error) {                                     /* Object shorthand */
                callback('Unable to find the City!', undefined);
                } else {
                    callback(undefined, 
                        // 'The weather is ' + chalk.yellow.bold(response.body.current.weather_descriptions[0]) + '. It is currently ' + chalk.yellow.bold(response.body.current.temperature) + ' degrees out. It feels like ' + chalk.yellow.bold(response.body.current.feelslike) + ' degrees out.'
                        'The weather is ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.'
                    )
                }   
    })
}

module.exports = forecast;