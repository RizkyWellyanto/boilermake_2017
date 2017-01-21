/**
 * Created by rizky on 1/21/17.
 */

module.exports = function(app, router){
    app.use('/api', require('./home.js')(router));
    app.use('/api', require('./puck.js')(router));
};