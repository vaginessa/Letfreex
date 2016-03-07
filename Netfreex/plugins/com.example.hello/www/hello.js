/*global cordova, module*/

module.exports = {
    greet: function (id, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Hello", "greet", [id]);
    }
};
