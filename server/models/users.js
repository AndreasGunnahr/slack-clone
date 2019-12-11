const mongoose = require('mongoose');


const UsersSchema = mongoose.Schema(
  {
    username: String,
    password: String
  },{collection: 'users'});

module.exports = mongoose.model('Users', UsersSchema);