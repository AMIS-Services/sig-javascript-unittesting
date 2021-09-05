var express = require('express');
var subscriptions = require('../processor/subscriptionProcessor')
var subscriptionRepo = require('../services/subscriptions')
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(subscriptions.sendNotifications());
  
  /* GET users listing. */
router.get('/subscriptions', function (req, res, next) {
  res.send(subscriptionRepo.getAll());
});

module.exports = router;
