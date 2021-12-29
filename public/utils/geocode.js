const request = require('request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFpZGlldSIsImEiOiJja3hvZ3cyaXYzcnA3Mm9va2xreGg1eGhjIn0.6ijOTucj3B45QqajVht8JA&limit=1`;

    request({ url: url, json: true }, function (err, res) {
        if (err) {
            callback('Unable to connect to location service!', undefined)
        } else if (res.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            
            const latitude = res.body.features[0].center[1]
            const longtitude = res.body.features[0].center[0]
            const location = res.body.features[0].place_name

            callback(undefined, {
                latitude,
                longtitude,
                location
            })
        }
    })
}

module.exports = geocode