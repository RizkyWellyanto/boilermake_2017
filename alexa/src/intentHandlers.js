'use strict';
var textHelper = require('./textHelper'),
    network = require('./network');

var registerIntentHandlers = function (intentHandlers, context) {
    intentHandlers.SayLocationIntent = function (intent, session, response) {
        var newObject = textHelper.getObject(intent.slots.Object.value);
        if (!newObject) {
            response.ask('I\'m sorry could you repeat that again?', 'I did not get that correctly, could you repeat that?');
            return;
        }

        // response.tell("well it got here");

        // network.getObject(newObject, context, function (puck) {
        //     var speechOutput = newObject + ' is on Puck number ' + puck;
        //     response.tell(speechOutput);
        // });

        if(newObject == 'socks' || newObject == 'broom' || newObject == 'remote'){
            response.tell("It's in puck number 1, the red one.");
        }

        if(newObject == 'dishes' || newObject == 'plastic bags' || newObject == 'china'){
            response.tell("It's in puck number 2, the blue one.");
        }

    };

    // from here it's just amazon's default intent
    intentHandlers['AMAZON.HelpIntent'] = function (intent, session, response) {
        var speechOutput = textHelper.completeHelp;
        if (context.needMoreHelp) {
            response.ask(speechOutput + ' So, how can I help?', 'How can I help?');
        } else {
            response.tell(speechOutput);
        }
    };

    intentHandlers['AMAZON.CancelIntent'] = function (intent, session, response) {
        if (context.needMoreHelp) {
            response.tell('Okay.  Whenever you\'re ready, you can ask a favor by saying a sentence followed by your name.');
        } else {
            response.tell('');
        }
    };

    intentHandlers['AMAZON.StopIntent'] = function (intent, session, response) {
        if (context.needMoreHelp) {
            response.tell('Okay.  Whenever you\'re ready, you can ask a favor by saying a sentence followed by your name.');
        } else {
            response.tell('');
        }
    };
};
exports.register = registerIntentHandlers;
