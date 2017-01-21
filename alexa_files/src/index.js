/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This is the basic implementation of Butler Buddy (or whatever name),
 * if any major concerns arise don't feel bad waking me up -> call
 */



'use strict';

var APP_ID = undefined; //OPTIONAL: replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

var AlexaSkill = require('./AlexaSkill'),
    mongoose = require('mongoose');


/**
 * Mongoose database references and calls
 */
mongoose.connect('mongodb://elliott:caleb@cluster0-shard-00-00-gnhms.mongodb.net:27017,' +
    'cluster0-shard-00-01-gnhms.mongodb.net:27017,cluster0-shard-00-02-gnhms.mongodb.net:' +
    '27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //we are connected!
});

var objectSchema = mongoose.Schema({
    name: String
});



// TODO remove this hard-coded list as database references are made
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

    "AddObjectsToListIntent": function (intent, session, response) {
        var speechoutput;

        var objectSlot = intent.slots.Object;
        var categorySlot = intent.slots.Category;
        var locationSlot = intent.slots.Location;

        speechoutput = "write this intent dude";

        var anythingElse = "Is there anything else I may find for you?";
        response.ask(speechoutput, anythingElse);
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
 */


function handleNoObjectProvided(intent, session, response) {

}


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
    var speechoutput;
    var listOfCategories = "";
    var category = mongoose.model(intent.slots.Category, objectSchema);
    var object = intent.slots.Object;

    if (object && object.value) {
        if (category && category.value) {

            category.findOne(object, function (err, object) {
                if (err) return console.error (err);
                console.log (object.name);
            });
        }
        else {
            var items = mongoose.model('Items', objectSchema);

            items.findOne(object, function (err, object) {
                if (err) return console.error (err);
                speechoutput = object.location;
            });
        }
    }
    else {
        handleNoObjectProvided(intent, session, response);
    }
}


function getListOfObjectsInCategory(intent, session, response) {
    var category = intent.slots.Category;

    if (category && category.value) {
        category.find(function (err, items) {
            if (err) return console.error(err);
            console.log(items);
        })
    }
    else {
        handleNoCategoryProvided(intent, session, response);
    }
}


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