'use strict';
var textHelper = (function () {
    return {
        completeHelp: 'Here\'s some things you can say,'
        + ' where is my shoes'
        + ' where are the forks'
        + ' and exit.',
        nextHelp: 'You can ask me where things are and I will point you to the labeled puck. So, Can I help you with anything?',

        getObject: function(recognizedObject) {
            // might need to configure this later
            return recognizedObject;
        }
    };
})();
module.exports = textHelper;
