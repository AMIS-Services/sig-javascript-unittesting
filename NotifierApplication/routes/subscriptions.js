var express = require('express');
var subscriptions = require('../processor/subscriptionProcessor')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(subscriptions.sendNotifications());
});

module.exports = router;
