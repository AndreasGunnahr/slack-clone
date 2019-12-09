var express = require('express');
var router = express.Router();

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    const signedInUser = req.session.activeUserInfo;
    res.render('chat', {username: "yde"}) //signedInUser.username});
});

module.exports = router;
