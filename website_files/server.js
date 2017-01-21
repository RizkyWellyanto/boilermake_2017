var express = require('express');
var app     = express();

/* *
 * Edit the usePath variable if you want to 
 * change the files being statically served.
 * */
var usePath = __dirname;
app.use(express.static(usePath), function(req, res, next){
});

/** 
 * Setting up the server port.
 * */
var port = process.env.PORT || 3000;
console.log("Express server running on " + port);
app.listen(process.env.PORT || port);
