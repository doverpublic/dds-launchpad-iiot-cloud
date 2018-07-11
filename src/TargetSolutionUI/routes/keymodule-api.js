const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ item: 'List of key modules' });
});

module.exports = app;