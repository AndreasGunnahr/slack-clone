var express = require('express')
var router = express.Router()

/* Import database models */ ;
const Channels = require('../models/channels')
const Messages = require('../models/messages')

/* GET all Channels information from each user ID. */
router.get('/:id', function (req, res, next){
    const userID = req.params.id;
    Channels.find({createdByUserID: userID}, function(err, data) {   
        if(err){
            res.status(500).send();
        }
        else{
            res.send(data);
        }
    });
});

/* POST new Channel information and checking if the Channel is valid. */
router.post('/new-channel', function (req, res, next) {
    const enteredChannelName = req.body.name;
    Channels.findOne({name: enteredChannelName }, async function(err, data) {   
        if(err){
            res.status(500).send();
        }
        else if(data == null) {
            try{
                let channel = new Channels(req.body);
                channel.save(function (err, channelObject) {
                    if (err){
                        res.status(500).send();
                    }
                });
                res.status(201).json({ status: true, success: "Channel created!" });
            }catch{
                res.status(500).send();
            }
        }
        else{
            res.status(400).json({ status: false, error: "Channel name is already taken." });
        }
    });
});

/* GET all messages to the specific channel. */
router.get('/messages/:id', function (req, res, next) {
    const clickedChannelID = req.params.id;
    Messages.find({channelID: clickedChannelID},{'_id': 0, 'username': 1, 'time': 1, 'text': 1}, function(err, data) {   
        if(err){
            res.status(500).send();
        }
        else{
            res.send(data);
        }
    });
});


module.exports = router