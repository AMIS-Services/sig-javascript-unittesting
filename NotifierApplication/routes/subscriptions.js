var express = require('express');
var subscriptions = require('../processor/subscriptionProcessor')
var subscriptionRepo = require('../services/subscriptions')
var router = express.Router();

/* GET start sending notifications. */
router.get('/', function (req, res, next) {
  res.send(subscriptions.sendNotifications());
});

/* GET all subscriptions. */
router.get('/subscriptions', function (req, res, next) {
  res.send(subscriptionRepo.getAll());
});

module.exports = router;
