const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e98743b1ce9f9ed7167de6c105049d1d&query=${latitude},${longtitude}&units=m`;

    request({ url: url, json: true }, function (error, response) {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = response.body.current;
            callback(undefined, data)
        }
    });
}

module.exports = forecast;


