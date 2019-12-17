const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: {
     type: String,
     lowercase: true
    },
    username: {
        type: String, 
        lowercase: true, 
        },
    email: {
        type: String, 
        lowercase: true, 
        },
    password: String,
    image: String,
    
  },{collection: 'users'});
// {timestamps: true}

module.exports = mongoose.model('User',UserSchema);