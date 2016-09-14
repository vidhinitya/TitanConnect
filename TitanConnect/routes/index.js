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

router.post('/register/', function(req, res, next) {
    if (validName(name) & validEmail(email)){
        var user = new User({
            userName: req.body.name,
            email: req.body.email,
            firstName: "N/A",
            lastName: "N/A",
            phone: req.body.phone,
            password: req.body.password,
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
                res.render('register', {error:"Database Error"});
            }
            else{
                res.render('login', {success:"Account Created."});
            }
        });
    }
    else{
        res.render('register', {error:"Username or Email already on system."})
    }
});

router.get('/login/', function(req, res, next) {
  res.render('login');
});

var validName = function(){ return true; };
var validEmail = function(){ return true; };

module.exports = router;
