var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let errorMessage = req.session.error
  let successMessage = req.session.success;
  res.render('index',{error: errorMessage, success: successMessage});
});

module.exports = router;
