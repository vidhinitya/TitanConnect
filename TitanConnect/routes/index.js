// Dependencies
var express = require('express');
var session = require('express-session');
var router = express.Router();

// Models
var Account = require('../models/account');
var Group = require('../models/group');
var Profile = require('../models/profile');

// Begin Routes
router.get('/', function(req, res) {
    res.render('index', {
        user: req.user
    });
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
    user = new Account({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        belongsTo: []
    });
    console.log("User Parsed From From");
    console.log(user);
    user.save(function(err) {
        if (err) {
            console.log("DB Error: new Account not saved.");
            console.log(err);
            res.redirect('/register', {
                error: "Error Creating Account."
            })
        } else {
            console.log("New Account saved.");
            console.log(this);
            res.redirect('/login');
        }
    });
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', function(req, res) {
    var username = req.body.username
    Account.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            console.log("Error in getUserFromDB():");
            console.log(err);
            res.redirect('/login', {
                error: "Invalid User"
            });
        } else {
            console.log("User returned:");
            console.log(user);
            if (user.password === req.body.password) {
                req.session.user = user;
                res.redirect('/');
            } else {
                console.log("Login Failure:");
                req.session.user = undefined;
                res.redirect('login', {
                    error: 'Invalid Password.'
                });
            };
        }
    });
});

router.get('/logout', function(req, res) {
    req.session.user = undefined;
    res.redirect('/');
});

router.get('/ping', function(req, res) {
    res.status(200).send("pong!");
});

router.get('/users', function(req, res, next) {
    console.log("Route GET /users");
    Account.find({}, function(err, users) {
        if (err) {
            res.json({
                error: "DB Error: " + err
            });
        } else {
            res.json(users);
        }
    });
});

router.get('/users/:username', function(req, res, next) {
    Account.findOne({
        username: req.params.username
    }, function(err, user) {
        if (err) {
            res.json({
                error: "DB Error: " + err
            });
        } else {
            res.json(user);
        }
    });
});

router.get('/users/:username/groups', function(req, res, next) {
    Account.find({
        username: req.params.username
    }, function(err, user) {
        if (err) {
            res.json({
                error: "DB Error: " + err
            });
        } else {
            Group.find({
                groupMembers: user._id
            }, function(err, groups) {
                if (err) {
                    res.json({
                        error: "DB Error: " + err
                    });
                } else {
                    res.json(groups);
                }
            })
        }
    });
});

router.post('/users/:username/groups', function(req, res, next) {
    var user = req.session.user;
    if (user.username === req.params.username) {
        var group = new Group({
            groupname: req.body.groupname,
            admin: user._id,
            groupMembers: [user._id],
            groupChat: [{
                author: user._id,
                comment: "Welcome to your new group!",
                timestamp: Date.now
            }],
            description: req.body.description,
            groupCreatedDate: Date.now
        });
        group.save(function(err) {
            if (err) {
                console.log("DB Error: new Group not saved.");
                console.log('--- ' + err);
                res.redirect('/users/' + req.session.user.username + '/groups', {
                    error: "Error creating profile."
                });
            } else {
                console.log("New Profile saved.");
                Account.findOneAndUpdate({
                        username: user.username
                    }, {
                        $push: {
                            belongsTo: group._id
                        }
                    },
                    function(err, user) {
                        if (err) {
                            console.log("DB Error: Account Not Updated with New Group");
                        } else {
                            console.log("Account Updated with New Group");
                            res.redirect('/users/' + req.session.user.username + '/groups');
                        }
                    });
            }
        });
    } else {
        req.session.user = undefined;
        console.log("Unauthorized Post to /<user>/groups");
        res.redirect('/login', {
            error: "Not Authorized."
        });
    }
});

router.get('    /users/:username/groups/:groupname', function(req, res, next) {
    Group.findOne({
            groupname: req.params.groupname,
            groupMembers: req.params.username
        },
        function(err, group) {
            if (err) {
                res.json({
                    error: "DB Error: " + err
                });
            } else {
                res.json(group);
            }
        });
});

router.get('/groups', function(req, res, next) {
    Group.find({}, function(err, groups) {
        if (err) {
            res.json({
                error: "DB Error: " + err
            });
        } else {
            res.json(groups);
        }
    });
});

router.get('/profiles', function(req, res, next) {
    Profile.find({}, function(err, profiles) {
        if (err) {
            res.json({
                error: "DB Error: " + err
            });
        } else {
            res.json(profiles);
        }
    });
});

router.get('/users/:username/profile', function(req, res, next) {
    Account.findOne({
        username: req.params.username
    }, function(err, user) {
        if (err) {
            res.json({
                error: "Account DB Error: " + err
            });
        } else {
            Profile.findOne({
                user: user._id
            }, function(err, profile) {
                if (err) {
                    res.json({
                        error: "Profile DB Error: " + err
                    });
                } else {
                    res.json(profile);
                }
            });
        }
    });
});

router.post('/users/:username/profile', function(req, res, next) {
    var user = req.session.user;
    if (user.username === req.params.username) {
        Account.findOne({
            username: user.username
        }, function(err, user) {
            if (err) {
                res.json({
                    error: "Account DB Error: " + err
                });
            } else {
                var profile = new Profile({
                    user: user._id,
                    profileCreatedDate: Date.now,
                    about: "",
                    Facebook: "",
                    instagram: "",
                    bio: "",
                    website: ""
                });
                profile.save(function(err) {
                    if (err) {
                        console.log("DB Error: new Profile not saved.");
                        console.log('--- ' + err);
                        res.redirect('/users/' + req.session.user.username + '/profile', {
                            error: "Error creating profile."
                        });
                    } else {
                        console.log("New Profile saved.");
                        console.log('--- ' + this);
                        res.redirect('/users/' + req.session.user.username + '/profile');
                    }
                });
            }
        });
    } else {
        req.session = undefined;
        res.redirect('/login', {
            error: "Not Authorized"
        })
    }
});

module.exports = router;
