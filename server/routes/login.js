var express = require('express')
var router = express.Router()

// Define the home page route
router.get('/', function (req, res) {
  res.send('This is the login  page');
})

module.exports = router