'use strict';
var AlfredButler = require('./AlfredButler');

exports.handler = function (event, context) {
    var alfredButler = new AlfredButler();
    alfredButler.execute(event, context);
};
