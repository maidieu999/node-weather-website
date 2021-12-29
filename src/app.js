const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('../public/utils/geocode');
const forecast = require('../public/utils/forecast')

const app = express() 

// defind path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to the server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mai Dieu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mai Dieu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'May I help you?',
        title: 'Help',
        name: 'Mai Dieu'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            forecast(latitude, longtitude, (error, {weather_descriptions, temperature, precip} = {}) => {
                if (error) {
                    return res.send({ error })
                } else {
                    res.send({
                        address: req.query.address,
                        location: location,
                        forecast: `${weather_descriptions[0]}: It's currently ${temperature} degrees out. There is ${precip * 100}% chance of rain`,
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errMessage: 'Help article not found',
        title: '404',
        name: 'Mai Dieu'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errMessage: 'Page not found',
        title: '404',
        name: 'Mai Dieu'
    })
})

// start a server and listen at a specific port
const port = 3000;
app.listen(port, () => {
    console.log(`Server is up on http://localhost:${port}`)
})
















// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
