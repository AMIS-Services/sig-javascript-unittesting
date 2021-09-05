var express = require('express');
const notificationRepo = require('../services/notifications')
var router = express.Router();

/* GET users listing. */
router.get('/allnotifications', function (req, res, next) {
    res.send(notificationRepo.getAll());
});

module.exports = router;
