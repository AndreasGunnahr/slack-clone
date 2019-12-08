var express = require('express');
var router = express.Router();

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    const signedInUser = req.session.activeUserInfo;
    res.render('dashboard');
});

module.exports = router;
