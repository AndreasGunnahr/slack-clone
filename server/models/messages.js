const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
  {
    channelID: {
    },
    username: {
     type: String,
     lowercase: true
    },
    text: {
        type: String,
        lowercase: true
    }
  });


module.exports = mongoose.model('Messages',MessageSchema);