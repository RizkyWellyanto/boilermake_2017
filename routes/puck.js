/**
 * Created by rizky on 1/21/17.
 */

var Puck = require("../models/puck");

module.exports = function (router) {

    router.route('/puck/')
        .get(function (req, res) {
            Puck.getAllPucks(function (err, data) {
                if (err || !data) {
                    res.status(404);
                    res.send({
                        'message': 'Unable to find pucks'
                    });
                    return;
                }

                res.status(200);
                /* Temporary console.log for debugging */
                // console.log("success", "data", data);
                res.send({
                    'message': 'OK',
                    data:data
                });
            })
        })
        .delete(function (req, res) {
            Puck.deleteAllPucks(function (err, data) {
                if (err || !data) {
                    res.status(404);
                    res.send({
                        'message': 'Unable to delete pucks'
                    });
                    return;
                }

                res.status(200);
                res.send({
                    'message': 'OK',
                    data:data
                });
            })
        });

    router.route('/puck/:pid')
        .get(function (req, res) {
            Puck.getPuckById(req.params.pid, function (err, puck) {
                if (err || !puck) {
                    res.status(404);
                    res.send({
                        'message': 'Puck not found',
                        'err': err
                    });
                    return;
                }

                res.status(200);
                res.send({
                    'message': 'OK',
                    'data': puck
                });
            });
        })
        .put(function(req, res){
            Puck.getPuckById(req.params.pid, function (err, data) {
                if (err || data.length === 0) {
                    res.status(404);
                    res.send({
                        'message': 'Unable to find puck'
                    });
                    return;
                }
                Puck.setPuckLabel(data[0], req.body.label, function (err, puck) {
                    res.status(200);
                    res.send({
                        'message':'Puck updated',
                        'data':puck
                    });
                });
            });
        })
        .post(function(req, res){
            var newPuck = new Puck({
                pid:req.params.pid,
                label:req.body.label
            });
            Puck.createPuck(newPuck, function (err, puck) {
                if (err) throw err;
                res.status(201);
                res.send({
                    'message': 'Puck created!',
                    'data': puck
                });
            });
        })
        .delete(function (req, res) {
            Puck.getPuckById(req.params.pid, function (err, puck) {
                if (err || !puck) {
                    res.status(404);
                    res.send({
                        'message': 'Unable to find puck'
                    });
                    return;
                }
                Puck.deletePuckById(req.params.pid, function (err, puck) {
                    if (err || !puck) {
                        res.status(500);
                        res.send({
                            'message': 'Puck failed to be deleted',
                            'err': err
                        });
                        return;
                    }

                    res.status(200);
                    res.send({
                        'message':'Puck deleted',
                        'data':puck
                    });
                });
            });
        });

    return router;
};
