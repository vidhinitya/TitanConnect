var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.session.passport.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/groups',function(req, res, next) {
    user = req.session.passport.user;
    console.log("At route /groups: ", user)
    if(user){
        Account.findOne({username: user}, function(err, user){
            if(err || !user){
                console.log("Error in route /groups:  DB Error");
                res.redirect('/login');
            }
            else{
                console.log("At route /groups.  User Found");
                res.render('groups', user);
            }

        });
    }
    else{
        res.redirect('/login');
    }
});

router.get('/inbox', passport.authenticate('local'), function(req, res) {
    res.json({message: "In Development"})
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
