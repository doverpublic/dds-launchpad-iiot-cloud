const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
var apiDefPath = './dist/TargetSolutionUI/assets/controllers/_ref/entity-api.js';
var apiDocPath = './dist/TargetSolutionUI/assets/controllers/_ref/entity-doc.json';

var options = {
    swaggerDefinition: {
        info: {
            title: 'Dover Launchpad Entity API - Version 1.0.0', // Title (required)
            version: '1.0.0', // Version (required)
        },
    },
    apis: [apiDefPath], // Path to the API docs
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options);


const content = JSON.stringify(swaggerSpec, null, 4);
console.log("On entity-api api spec[%s]", content);

fs.writeFileSync(apiDocPath, content, 'utf8', function(err) {
    if (err) {
        return console.log(err);
    }

    console.log("entity-doc.json file was saved!");
});

//const swaggerDocument = require(apiDocPath);
//app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

var swaggerUiOpts = {
    explorer: false,
    swaggerOptions: options,
    customCss: '.swagger-ui .topbar { background-color: blue }'
}
var swaggerHtml = swaggerUi.generateHTML(swaggerSpec, swaggerUiOpts)
app.use('/docs', swaggerUi.serveFiles(swaggerSpec, swaggerUiOpts))

app.get('/docs', (req, res) => {
    res.send(swaggerHtml)
});

app.get('/', (req, res) => {
    res.json({ item: 'Dover Launchpad Entity API - Version 1.0.0' });
});

/*
app.get('/docs', (req, res) => {
    console.log("On entity API /docs - about to serve swagger files");
    res.set('Content-Type', 'text/html');
    res.send(swaggerUi.generateHTML(swaggerSpec));
});
*/


var modelsPath = './dist/TargetSolutionUI/assets/models/_ref';

/**
 * @swagger
 * /:class/new:
 *   get:
 *     description: Provide a clean entity for the class to be used for the creation of a new instance
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: class
 *         description: Name of the instance type e.g. User, Company, etc.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 200 203 response
 */
app.get('/:class/new', (req, res) => {
    var className = req.params.class;
    var fileName = className + '-new.json';
    var filePath = path.join(modelsPath, fileName);
    var readable = fs.createReadStream(filePath);
    readable.pipe(res);
});

/**
 * @swagger
 * /:class/template:
 *   get:
 *     description: Provide information about the entity schema including the field definitions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: class
 *         description: Name of the instance type e.g. User, Company, etc.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 200 203 response
 */
app.get('/:class/template', (req, res) => {
    var className = req.params.class;
    var fileName = className + '-template.json';
    var filePath = path.join(modelsPath, fileName);
    var readable = fs.createReadStream(filePath);
    readable.pipe(res);
});


module.exports = app;