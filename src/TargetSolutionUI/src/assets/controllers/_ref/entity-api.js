const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
var hashutil = require('../../common/_ref/util/hashutil.js');
var entityhandler = require('../../common/_ref/features/entityhandler.js');
var apiDefPath = './dist/TargetSolutionUI/assets/controllers/_ref/entity-api.js';
var apiDocPath = './dist/TargetSolutionUI/assets/controllers/_ref/entity-doc.json';

app.use(bodyParser.json());

var options = {
    swaggerDefinition: {
        info: {
            title: 'Dover Launchpad Entity API - Version 1.0.0', // Title (required)
            version: '1.0.0' // Version (required)
        },
    },
    apis: [apiDefPath] // Path to the API docs
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options);

const content = JSON.stringify(swaggerSpec, null, 4);
// console.log("On entity-api api spec[%s]", content);

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
 * /api/entity/{class}/new:
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

    var fileContent = fs.readFileSync(filePath, 'utf8');
    var entityNew = JSON.parse(fileContent);

    entityNew.id = hashutil.getUniqueId();

    console.log("On entity-api /class/new Entity Type [%s] Template [%s]", className, JSON.stringify(entityNew));
    res.json(entityNew);
});

/**
 * @swagger 
 * /api/entity/{class}/template:
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

    res.setHeader('Content-Type', 'application/json');
    readable.pipe(res);
});

/**
 * @swagger
 * /api/entity/{class}/id/{id}:
 *   get:
 *     description: Read the entity instance from the database for a given id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: class
 *         description: Name of the instance type e.g. User, Company, etc.
 *         in: path
 *         required: true
 *         type: string
 *       - name: id
 *         description: Unique id of the instance assigned as part of the new entity request
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 200 203 response
 */
app.get('/:class/id/:id', (req, res) => {
    var className = req.params.class;
    var entityId = req.params.id;

    console.log("On entity-api /class/id Entity Type [%s] Id [%s]", className, entityId);

    entityhandler.readOne(className, entityId, function(result) {
        res.json(result);
    });
});

/**
 * @swagger
 * /api/entity/{class}/all:
 *   get:
 *     description: Read the entities instances from the database for a given entity type
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
app.get('/:class/all', (req, res) => {
    var className = req.params.class;

    entityhandler.readAll(className, function(result) {
        res.json(result);
    });
});

/**
 * @swagger
 * /api/entity/{class}/{id}:
 *   delete:
 *     description: Delete the entity instance from the database for a given id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: class
 *         description: Name of the instance type e.g. User, Company, etc.
 *         in: path
 *         required: true
 *         type: string
 *       - name: id
 *         description: Unique id of the instance assigned as part of the new entity request
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 200 203 response
 */
app.delete('/:class/:id', (req, res) => {
    var className = req.params.class;
    var entityId = req.params.id;

    entityhandler.deleteOne(className, entityId);

    console.log("On entity-api DELETE /class/id Entity Type [%s] Id [%s]", className, id);
    res.json({ "result": "true" });
});


/**
 * @swagger
 * /api/entity/{class}:
 *   post:
 *     description: Create a new entity instance in the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: class
 *         description: Name of the instance type e.g. User, Company, etc.
 *         in: path
 *         required: true
 *         type: string
 *       - name: entityObject
 *         description: Instance oject in JSON format
 *         in: body
 *         type: string
 *         required: true 
 *     responses:
 *       200:
 *         description: 200 203 response
 */
app.post('/:class', (req, res) => {
    var className = req.params.class;
    var entityJsonObj = req.body;
    var entityId = entityJsonObj.id;

    console.log("On entity-api CREATE /class/id Entity Type [%s] Id [%s] Obj[%s]", className, entityId, JSON.stringify(entityJsonObj));

    entityhandler.insertOne(className, entityJsonObj);

    res.json({ "result": "true" });
});

/**
 * @swagger
 * /api/entity/{class}:
 *   put:
 *     description: Update an existing entity instance in the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: class
 *         description: Name of the instance type e.g. User, Company, etc.
 *         in: path
 *         required: true
 *         type: string
 *       - name: instaceObj
 *         description: Instance oject in JSON format
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 200 203 response
 */
app.put('/:class', (req, res) => {
    var className = req.params.class;
    var entityJsonObj = req.body;
    var entityId = entityJsonObj.id;

    console.log("On entity-api UPDATE /class/id Entity Type [%s] Id [%s] Obj[%s]", className, entityId, JSON.stringify(entityJsonObj));

    entityhandler.updateOne(className, entityId, entityJsonObj);

    res.json({ "result": "true" });
});

module.exports = app;