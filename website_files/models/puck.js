/**
 * Created by rizky on 1/21/17.
 **/

var mongoose = require('mongoose');

var PuckSchema = new mongoose.Schema({
    pid: String,
    label: String
});

var Puck = module.exports = mongoose.model('Puck', PuckSchema);

module.exports.getPuckById = function (pid, callback) {
    var query = {
        pid:pid
    };
    Puck.find(query, callback);
};

module.exports.deletePuckById = function (pid, callback) {
    var query = {
        pid: pid
    };
    Puck.remove(query, callback);
};

module.exports.createPuck = function (newPuck, callback) {
    newPuck.save(newPuck, callback);
};

module.exports.getAllPucks = function (callback) {
    Puck.find({}, callback);
};

module.exports.deleteAllPucks = function (callback) {
    Puck.remove({}, callback);
};

module.exports.setPuckLabel = function (newPuck, label, callback) {
    newPuck.label = label;
    newPuck.save(newPuck, callback);
};