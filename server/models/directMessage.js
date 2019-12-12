const mongoose = require('mongoose');

const directMessageSchema = mongoose.Schema(
  {
    createdByUserID: {
    },
    selectedUserID: {
    },
    username: {
        type: String,
        lowercase: true
    }
  });


module.exports = mongoose.model('DirectMessage',directMessageSchema);