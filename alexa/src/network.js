'use strict';
var http = require('http');

var network = (function () {
    return {
        getObject: function (label, callback) {
            http.get('https://alfred-the-butler.herokuapp.com/api/puck/', function (res) {
                if(res.message === "OK"){
                    res.data.forEach(function (obj) {
                        if(obj.label == label){
                            callback(obj.pid);
                        }
                    });
                }
            })
        },
        getObjects: function (callback) {
            http.get('https://alfred-the-butler.herokuapp.com/api/puck/', function (res) {
                if(res.message === "OK"){
                    callback(res.data);
                }
            })
        }
    };
})();
module.exports = network;
