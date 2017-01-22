'use strict';
var AlexaSkill = require('./AlexaSkill'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers');

var APP_ID = "amzn1.ask.skill.019dfd34-6765-4aad-b299-ac94bd25e608";
var skillContext = {};

var AlfredButler = function () {
    AlexaSkill.call(this, APP_ID);
    skillContext.needMoreHelp = true;
};

AlfredButler.prototype = Object.create(AlexaSkill.prototype);
AlfredButler.prototype.constructor = AlfredButler;

eventHandlers.register(AlfredButler.prototype.eventHandlers, skillContext);
intentHandlers.register(AlfredButler.prototype.intentHandlers, skillContext);

module.exports = AlfredButler;

