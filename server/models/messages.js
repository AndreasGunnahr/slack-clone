const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    channelID: String,
    name: String,
    time: String,
    text: String
},{collection: 'msgCollection'});


module.exports = mongoose.model('chat', chatSchema);