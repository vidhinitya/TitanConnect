var express = require('express');
var router = express.Router();
var User = require("../models/user").User;

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}, function(err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
    res.json(users);
  });
});

router.get('/:userName', function(req, res, next) {
    userName = req.params.userName;
    console.log('Searching For: ' + userName);
    User.find({ userName: userName }, function(err, user) {
        if (err) throw err;

        // object of all the users
        console.log(userName + ' found!');
        res.json(user);
    });
});

module.exports = router;
