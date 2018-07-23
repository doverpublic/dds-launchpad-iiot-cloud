// Launchpad Common Libraries
const uuidv4 = require('uuid/v4')


var getUniqueId = function() {
    var strRet = "";
    var uuidValue = uuidv4();
    var parts = uuidValue.split("-");

    for (var index = 0; index < parts.length; index++) {
        strRet += parts[index];
    }
    return strRet;
}

module.exports = {
    getUniqueId: getUniqueId
};