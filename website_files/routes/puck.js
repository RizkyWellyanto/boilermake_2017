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
                        'message': 'Unable to find puck'
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

    router.route('/puck/:id')
        .get(function (req, res) {
            Puck.findById(req.params.id, function (err, puck) {
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
            Puck.getPuckById(req.params.id, function (err, puck) {
                if (err || !puck) {
                    res.status(404);
                    res.send({
                        'message': 'Unable to find puck'
                    });
                    return;
                }
                Puck.setPuckLabel(puck, req.body.label, function (err, puck) {
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
            Puck.getPuckById(req.params.id, function (err, puck) {
                if (err || !puck) {
                    res.status(404);
                    res.send({
                        'message': 'Unable to find puck'
                    });
                    return;
                }
                Puck.deletePuckById(req.params.id, function (err, puck) {
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