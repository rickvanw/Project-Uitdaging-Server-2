var express = require('express');
var request = require('request');
var router = express.Router();

module.exports = router;

var connection = require('./connection.js');
var config = require('./config.js');
var utils = require('./utils.js');

/**
 * GET info of logged in user
 */
router.get('', function (req, res) {

    //TODO logged-in user_id
    var user_id = 1;

    var query = "SELECT role_id, email, first_name, last_name FROM user WHERE user_id = " + user_id;
    connection.query(query, function (err, result) {
        if (err){
            res.status(400).json([]);
            return;
        }
        res.status(200).json(result);
    });
});

router.post('/add', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;


    //var query = 'insert into complaint(name) values()';
    var query = 'INSERT INTO user(email, password, first_name, last_name) VALUES ("'+email+'","'+password+'","'+first_name+'","'+last_name+'")';

    console.log(query);

    connection.query(query, function (err) {
        if (err) {
            console.log(err.message);
            utils.error(409, 'Already exists', res);
            return;
        }
        res.status(201).send();
    })
});

router.put('/change', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    // TODO current logged-in user_id
    var user_id = 1;

    //var query = 'insert into complaint(name) values()';
    var query = 'UPDATE user SET email= "'+email+'", password= "'+password+'", first_name= "'+first_name+'", last_name= "'+email+'" WHERE user_id='+user_id+'';

    console.log(query);

    connection.query(query, function (err) {
        if (err) {
            console.log(err.message);
            utils.error(409, 'Already exists', res);
            return;
        }
        res.status(201).send();
    })
});

router.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    //var query = 'insert into complaint(name) values()';
    var query = 'SELECT password FROM user WHERE email = "' + email + '"';

    console.log(query);

    connection.query(query, function (err, result) {
        if (err) {
            console.log(err.message);
            return;
        }
        var str = JSON.stringify(result);

        console.log("RESULT: "+ str);

        if(password==result){

            console.log("Logged in");
            res.status(201).send();
        }else{
            console.log("NOT logged in");
            res.status(401).send();
        }
    })
});