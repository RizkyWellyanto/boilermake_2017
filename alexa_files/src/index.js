/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This sample shows how to create a Lambda function for handling Alexa Skill requests that:
 *
 * - Custom slot type: demonstrates using custom slot types to handle a finite set of known values
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Minecraft Helper how to make paper."
 *  Alexa: "(reads back recipe for paper)"
 */






/**
 * This is the basic implementation of Butler Buddy (or whatever name),
 * if any major concerns arise don't feel bad waking me up -> call
 */







'use strict';

var APP_ID = undefined; //OPTIONAL: replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var AlexaSkill = require('./AlexaSkill');

var CATEGORIES = [
    "kitchen",
    "bathroom",
    "living room",
    "garage",
    "bedroom"
]

/**
 * ButlerBuddy is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Butler = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Butler.prototype = Object.create(AlexaSkill.prototype);
Butler.prototype.constructor = Butler;

// adapted from given onLaunch function
Butler.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Welcome to Butler Buddy. You can ask a question like, what categories are there? " +
        "What is in the kitchen? Or, where are the spoons? ... Now, what can I help you with?";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

/**
 * override intentHandlers to map intent handling functions.
 */
Butler.prototype.intentHandlers = {

    "ListKnownCategoriesIntent": function (intent, session, response) {
        var speechOutput = "The list of categories is as follows, " + getListOfCategories();
        var anythingElse = "Is there anything else I may find for you?";
        response.ask(speechOutput, anythingElse);
    },

    "ListObjectsOfCategoryIntent": function (intent, session, response) {
        var speechOutput;
        var categorySlot = intent.slots.Category;

        // this if statement structure is just null checking
        if (categorySlot && categorySlot.value) {
            speechOutput = "The list of objects within " + categorySlot +
                " is as follows, " + getListOfObjectsInCategory(intent, session, response);
        }
        else {
            handleNoCategoryProvided(intent, session, response);
        }

        var anythingElse = "Is there anything else I may find for you?";
        response.ask(speechOutput, anythingElse);
    },

    "ReturnLocationObjectIntent": function (intent, session, response) {
        var speechOutput;

        var objectSlot = intent.slots.Object;

        // this if statement structure is just null checking
        if (objectSlot && objectSlot.value) {
            speechOutput = getObjectLocation(intent, session, response);
        }
        else {
            handleNoObjectProvided(intent, session, response);
        }

        var anythingElse = "Is there anything else I may find for you?";
        response.ask(speechOutput, anythingElse);
    },

    // adapted from given intent
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye, master wayne";
        response.tell(speechOutput);
    },

    // adapted from given intent
    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye, master wayne.";
        response.tell(speechOutput);
    },

    // adapted from given intent
    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions about what items are within a room, where they are, or what rooms I know. Now, what can I help you with?";
        var repromptText = "You can say things like, what categories are there, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};



/**
 * Utility functions start here
 * TODO need implementation and documentation
 */


/**
 * Must handle no object being provided when prompting ReturnLocationObjectIntent
 *
 * @param intent
 * @param session
 * @param response
 */
function handleNoObjectProvided(intent, session, response) {

}


/**
 * Must handle no category being provided when prompting ReturnLocationObjectIntent
 *
 * @param intent
 * @param session
 * @param response
 */
function handleNoCategoryProvided(intent, session, response) {

}


/**
 * Returns the location of an object, as defined in the database
 *
 * Can be passed in with or without a category
 *
 * @param intent
 * @param session
 * @param response
 */
function getObjectLocation(intent, session, response) {

}


/**
 *
 * @param intent
 * @param session
 * @param response
 */
function getListOfObjectsInCategory(intent, session, response) {

}

/**
 * Returns the list of categories, as it is defined in LIST_OF_CATEGORIES.txt
 *
 * Text file will be replaced with database reference when ready
 *
 * @returns {string}
 */
function getListOfCategories() {
    var listOfCategories = "";
    for (var category in CATEGORIES) {
        listOfCategories += CATEGORIES[category] + ", ";
    }
    return listOfCategories;
}


exports.handler = function (event, context) {
    var index = new Butler();
    index.execute(event, context);
};