const express = require('express');
const app = express();

const launchpadRoute = require('./launchpad-api');
const keymoduleRoute = require('./keymodule-api');

app.get('/', (req, res) => {
        res.json({ item: 'Dover Launchpad iIoT RESTful API - Version 1.0.0' });
    })
    .use('/help', launchpadRoute)
    .use('/keymodule', keymoduleRoute);

module.exports = app;