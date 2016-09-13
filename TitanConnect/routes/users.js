var express = require('express');
var router = express.Router();
var User = require("../models/user").User;
var Group = require("../models/group").Group;

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            console.log(err);
            throw err;
        }
    // object of all the users
    console.log(users);
    res.json(users);
  });
});

router.get('/:userName', function(req, res, next) {
    userName = req.params.userName;
    console.log('Searching For: ' + userName);
    User.find({ userName: userName }, function(err, user) {
        if (err) {
            console.log(err);
            throw err;
        }
        
        // object of all the users
        console.log(userName + ' found!');
        res.json(user);
    });
});

router.get('/:userName/groups', function(req, res, next) {
    userName = req.params.userName;
    console.log('Searching For: ' + userName);
    User.find({ userName: userName }, function(err, user) {
        if (err) {
            console.log(err);
            throw err;
        }
        // object of all the users
        console.log(userName + ' found!');
        res.json(user);
        Group.find({ groupMembers: userName }, function(err, userGroups) {
            if (err) {
                console.log(err);
                throw err;
            }
            // object of all the users
            console.log('Groups for ' + userName + ' found!');
            res.json(userGroups);
        });
    });
});

module.exports = router;
