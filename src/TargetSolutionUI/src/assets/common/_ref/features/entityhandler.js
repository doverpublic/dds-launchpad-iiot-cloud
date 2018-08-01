// Launchpad Common Libraries
var Db = require('tingodb')().Db,
    assert = require('assert');

var localEntityDBPath = './data/db/entities';

var entitiesDb = new Db(localEntityDBPath, {});

var deleteOne = function(entityType, entityId) {
    var collection = entitiesDb.collection(entityType);
    var entityQuery = '{ "id": "' + entityId + '"}';

    collection.remove(JSON.parse(entityQuery), { w: 1 }, function(err, result) {
        assert.equal(null, err);
    });
};

var insertOne = function(entityType, entityJsonObj) {
    var collection = entitiesDb.collection(entityType);
    var jsonArray = '[' + JSON.stringify(entityJsonObj) + ']';

    collection.insert(JSON.parse(jsonArray), { w: 1 }, function(err, result) {
        assert.equal(null, err);
    });
};

var readOne = function(entityType, entityId, callback) {
    var defaultRet = JSON.parse("{}");
    var collection = entitiesDb.collection(entityType);
    var entityQuery = '{ "id": "' + entityId + '"}';

    console.log("On entityhandler.readOne - Entity Query[%s]", entityQuery);

    queryCollection(collection, entityQuery, defaultRet, true, callback);
};

var readAll = function(entityType, callback) {
    var defaultRet = JSON.parse("[{}]");
    var collection = entitiesDb.collection(entityType);
    var entityQuery = '{}';

    queryCollection(collection, entityQuery, defaultRet, false, callback);
};

var updateOne = function(entityType, entityId, entityJsonObj) {
    var collection = entitiesDb.collection(entityType);
    var entityQuery = '{ "id": "' + entityId + '"}';

    collection.update(JSON.parse(entityQuery), entityJsonObj, { upsert: true, w: 1 }, function(err, result) {
        assert.equal(null, err);
        assert.equal(1, result);
    });
};


// Local Methods

function queryCollection(collection, query, defaultReturn, readOneFlag, callback) {
    collection.find(JSON.parse(query)).toArray(function(err, result) {
        if (err) {
            console.log(err);
        } else if (result.length > 0) {
            if (readOneFlag)
                callback(result[0]);
            else
                callback(result);
        } else {
            callback(defaultReturn);
        }
    });
}


module.exports = {
    deleteOne: deleteOne,
    insertOne: insertOne,
    readOne: readOne,
    readAll: readAll,
    updateOne: updateOne
};