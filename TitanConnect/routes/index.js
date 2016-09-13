var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TitanConnect');
var User = require("../models/user").User;
var Group = require("../models/group").Group;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('TChome');
});

router.get('/register/', function(req, res, next) {
  res.render('register');
});

router.get('/login/', function(req, res, next) {
  res.render('login');
});

var addDemoUser = function(){
    var user = new User({
        userName: '111NEWDEMO',
        email: '111NEWDEMOEMAIL@DEMO.COM',
        password: 'example',
        firstName: 'E',
        lastName: 'Xample',
        phone: '000-000-0000',
        bio: 'example',
        belongsTo: []
    });
    user.save(function(err) {
        if (err) {
            console.log(err);
            throw err;
        };

    console.log('User saved successfully!');
    });
};

var addDemoGroup = function(){
    User.find({ userName: 'example' }, function(err, user) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('example user found!');
        var group = new Group({
            groupName: 'DEMOGROUP',
            admin: user._id,
            groupMembers: [ user._id ],
            groupChat: [{
                author: user._id,
                comment: 'exampleGroup Created!',
                timestamp: Date.now()
            }],
            description: 'An example group created for testing',
            groupCreatedDate: Date.now()
        });
        group.save(function(err) {
            if (err) {
                console.log(err);
                throw err;
            };
            console.log('Group saved successfully!');
        });
    });
    Group.find({ groupName: 'exampleGroup' }, function(err, group) {
        User.update(
            { userName: 'NEWDEMO'},
            { $push: { belongsTo: group._id }}, {upsert: true}
        );
    });
};

//addDemoUser();
//addDemoGroup();

module.exports = router;
