const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ item: 'Dover Launchpad API HELP' });
});

module.exports = app;