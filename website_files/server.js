var express = require("express");
var compression = require("compression");
var bodyParser = require("body-parser");
var secrets = require("./config/secrets");
var mongoose = require('mongoose');
var router = express.Router();
var app = express();

// db connection
mongoose.connect(secrets.mongo_connection);

/* Temporary log for debugging */
/* console.log("mongoose", mongoose); */

// compression
app.use(compression());

// parsing req body
app.use(bodyParser.urlencoded({ extended: true }));

// static paths
var usePath = __dirname;
app.use(express.static(usePath));

// routes
require('./routes')(app, router);

// server instance
var server = app.listen(process.env.PORT || 8080, function (){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});
