/**
 * Created by rizky on 1/21/17.
 **/

var mongoose = require('mongoose');

var PuckSchema = new mongoose.Schema({
    label: String
});

var Puck = module.exports = mongoose.model('Puck', PuckSchema);

module.exports.getPuckById = function (id, callback) {
    Puck.findById(id, callback);
};

module.exports.deletePuckById = function (id, callback) {
    var query = {
        _id: id
    };
    Puck.remove(query, callback);
};

module.exports.createPuck = function (newPuck, callback) {
    newPuck.save(newPuck, callback);
};

module.exports.getAllPucks = function (callback) {
    Puck.find({}, callback);
};

module.exports.setPuckLabel = function (newPuck, label, callback) {
    newPuck.label = label;
    newPuck.save(newPuck, callback);
};