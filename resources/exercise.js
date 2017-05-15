/**
 * Created by rickv on 15-5-2017.
 */
var express = require('express');
var request = require('request');
var router = express.Router();

module.exports = router;

var fs = require('fs');

var connection = require('./connection.js');
var config = require('./config.js');
var utils = require('./utils.js');



app.get('/exercise', function (request, response){
    // Get token
    var authToken = request.header('Authorization');

    // If token found: verify
    if (authToken) {
        jsonWebToken.verify(authToken, request.app.get('token'), function (err, decoded) {
            if (err) {
                console.log("Auth error");
                return response.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // Search exercise with a given exerciseId
                Exercise.findOne(
                    {exerciseId: request.header('exerciseId')}, function (error, exercise) {
                        if (error) {
                            response.status(404).send("Cannot find exercise with the given ID!");
                        } else {
                            console.log("Send!");
                            // Return statuscode 200!
                            response.status(200).send(exercise);
                        }
                    }
                );
            }
        });
    }
});


router.get('/exercise', function (req, res) {
    var exerciseId = req.header('exerciseId');

    var query = 'SELECT ' + exerciseId + ' FROM exercise';

    connection.query(query, function (err) {
        if (err) {
            console.log(err.message);
            utils.error(409, 'Already exists', res);
            return;
        }
        res.status(201).send();
    })
});