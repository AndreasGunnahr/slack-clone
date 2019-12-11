const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');

const AllUsersSchema = mongoose.Schema(
  {
    username: String,
    password: String
  },{collection: 'users'});

module.exports = mongoose.model('Login',AllUsersSchema);