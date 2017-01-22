'use strict';
var textHelper = require('./textHelper'),
    network = require('./network');

var registerIntentHandlers = function (intentHandlers, skillContext) {
    intentHandlers.SayLocationIntent = function (intent, session, response) {
        var newObject = textHelper.getObject(intent.slots.Object.value);
        if (!newObject) {
            response.ask('I\'m sorry could you repeat that again?', 'I did not get that correctly, could you repeat that?');
            return;
        }

        network.getObject(newObject, function (puck) {
            var speechOutput = newObject + ' is on Puck number ' + puck;
            response.tell(speechOutput);
        });
    };

    // TODO can list all labels
    // intentHandlers.ListLabelsIntent = function (intent, session, response) {
    //     storage.loadState(session, function (currentState) {
    //         var speechOutput = '';
    //         var favorBoard = '';
    //
    //         if (Object.keys(currentState.data.favors).length === 0) {
    //             response.tell('There are nobody asking for a favor at this moment.');
    //             return;
    //         }
    //
    //         var idx = 0;
    //         var favs = currentState.data.favors;
    //         for (var name in favs) {
    //             if (favs.hasOwnProperty(name)) {
    //                 var favor = favs[name];
    //
    //                 if (idx === 0) {
    //                     speechOutput += name + ' needs help with ' + favor;
    //                 } else if (idx === Object.keys(currentState.data.favors).length - 1) {
    //                     speechOutput += 'And ' + name + ' needs help with ' + favor;
    //                 } else {
    //                     speechOutput += name + ' needs help with' + favor;
    //                 }
    //                 speechOutput += '. ';
    //                 favorBoard += name + ' : ' + favor + '\n';
    //
    //                 idx++;
    //             }
    //         }
    //         response.tellWithCard(speechOutput, "List of Favors", favorBoard);
    //     });
    // };


    // from here it's just amazon's default intent
    intentHandlers['AMAZON.HelpIntent'] = function (intent, session, response) {
        var speechOutput = textHelper.completeHelp;
        if (skillContext.needMoreHelp) {
            response.ask(speechOutput + ' So, how can I help?', 'How can I help?');
        } else {
            response.tell(speechOutput);
        }
    };

    intentHandlers['AMAZON.CancelIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Okay.  Whenever you\'re ready, you can ask a favor by saying a sentence followed by your name.');
        } else {
            response.tell('');
        }
    };

    intentHandlers['AMAZON.StopIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Okay.  Whenever you\'re ready, you can ask a favor by saying a sentence followed by your name.');
        } else {
            response.tell('');
        }
    };
};
exports.register = registerIntentHandlers;
