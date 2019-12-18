const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    channelID: String,
    name: String,
    time: String,
    text: String

},

{collection: 'messages'});
    



module.exports = mongoose.model('chat', chatSchema);