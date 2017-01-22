'use strict';
var http = require('http');

var network = (function () {
    return {
        getObject: function (label, context, callback) {
            http.get('http://alfred-the-butler.herokuapp.com/api/puck/', function (res) {
                // if(res.message === "OK"){
                //     res.data.forEach(function (obj) {
                //         if(obj.label == label){
                //             callback(obj.pid);
                //         }
                //     });
                // }
                console.log("Got response: " + res.statusCode);

                context.succeed();
            })
        }
        // getObjects: function (context, callback) {
        //     http.get('http://alfred-the-butler.herokuapp.com/api/puck/', function (res) {
        //         console.log(res);
        //
        //         if(res.message === "OK"){
        //             callback("touch me senpai");
        //             // callback(res.data);
        //         }
        //
        //         context.done();
        //     });
        // }
    };
})();
module.exports = network;
