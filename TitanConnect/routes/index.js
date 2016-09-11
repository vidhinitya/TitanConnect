var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TitanConnect');
var User = require("../models/user").User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('TChome');
});

router.get('/register/', function(req, res, next) {
  res.render('index', { title: 'Register' });
});

router.get('/login/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

var addDemoUser = function(){
    var user = new User({
        userName: 'demo2',
        email: 'demo2@demoname.com',
        password: 'demo',
        firstName: 'Joe',
        lastName: 'Edwards',
        phone: '000-000-0000',
        bio: 'demo'
    });
    user.save(function(err) {
        if (err) {
            console.log(err);
            throw err;
        };

    console.log('User saved successfully!');
    });
};

//addDemoUser();

module.exports = router;
