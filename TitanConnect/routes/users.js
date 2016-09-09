var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('List of Users');
});

router.get('/:userName/', function(req, res, next) {
  res.send('Profile Page for User: ' + req.params.userName);
});

module.exports = router;
