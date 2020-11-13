const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname,'../public'));

const app = express();

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Set up Handlebar Engine & Views Location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up Static Directory to Serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Dynamic Home Page',
        name: 'Symphonize'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Dynamic About Page',
        name: 'Symphonize'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Dynamic Contact Page',
        name: 'Symphonize'
    });
});

app.get('/weather', (req, res) => {
        if(!req.query.address) {
        return res.send({
            error: 'You must provide a Location!'
        });
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {   /* Object Destructuring was Used */
         if(error) {
                return res.send({ error: error });
            }    
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error: error });
                }
                res.send({
                    Location: location,
                    Forecast: forecastData
                });
            });
    });
});

app.listen(3000, () => {
    console.log('Server is running up on the port 3000.');
});