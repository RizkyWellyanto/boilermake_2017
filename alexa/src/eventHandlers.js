'use strict';
var network = require('./network'),
    textHelper = require('./textHelper');

var registerEventHandlers = function (eventHandlers, skillContext) {
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        skillContext.needMoreHelp = false;
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
        network.getObjects(function (objects) {
            var speechOutput = '',
                reprompt;
            if (objects.length === 0) {
                speechOutput += 'Good morning mister Wayne, currently no pucks are labeled, I suggest you to tap your phone to any of these pucks to label them online';
                reprompt = "Do you need anything else?";
            }
            else {
                speechOutput += 'Good morning mister Wayne, '
                    + 'currently there are ' + objects.length;
                speechOutput += ' pucks that is labeled. You can ask me where things are. Also, you can edit the labels through your phone by tapping it to the pucks. So is there anything I could help?';
                reprompt = textHelper.completeHelp;
            }
            response.ask(speechOutput, reprompt);
        });
    };
};
exports.register = registerEventHandlers;
