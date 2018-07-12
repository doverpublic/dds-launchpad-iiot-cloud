const express = require('express');
const app = express();

const launchpadRoute = require('./launchpad-api');
const moduleRoute = require('./module-api');

app.get('/', (req, res) => {
        res.json({ item: 'Dover Launchpad iIoT RESTful API - Version 1.0.0' });
    })
    .use('/help', launchpadRoute)
    .use('/module', moduleRoute);

module.exports = app;