/**
 * Created by rizky on 1/21/17.
 */
var path = require("path");

module.exports = function (router){

    router.route('/')
        .get(function(req, res){
            res.sendFile(path.join(__dirname + '/../public/index.html'));
        });

    return router;
};