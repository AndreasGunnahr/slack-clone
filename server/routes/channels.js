var express = require('express')
var router = express.Router()

/* Import database models */ ;
const Channels = require('../models/channels')
const Messages = require('../models/messages')
const DirectMessages = require('../models/directMessage');

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
router.post('/check-new-channel', function (req, res, next) {
    const searchValue = req.body.channelSearchValue;
    const searchByUserID = req.body.createdByUserID;
    Channels.findOne({name: searchValue,createdByUserID: searchByUserID }, async function(err, data) {   
        if(err){
            res.status(500).send();
        }
        else if(data == null) {
            if(searchValue == ""){
                res.status(201).json({ status: true , success: ""});
            }else{
                res.status(201).json({ status: true , success: "Name is available"});
            }
        }
        else{
            res.status(400).json({ status: false, error: "Name is not available" });
        }
    });
});

/* POST new Channel information if we have a valid channel name from the search channel router */
router.post('/new-channel', function (req, res, next) {
    // const enteredChannelName = req.body.name;
    // const enteredByUserID = req.body.createdByUserID;
    // Channels.findOne({name: enteredChannelName,createdByUserID: enteredByUserID }, async function(err, data) {   
    //     if(err){
    //         res.status(500).send();
    //     }
    //     else if(data == null) {
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
        // }
        // else{
        //     res.status(400).json({ status: false, error: "Channel name is already taken." });
        // }
    // });
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

// /* GET all Channels information from each user ID. */
router.get('/directMessage/:id', function (req, res, next){
    const userID = req.params.id;
    DirectMessages.find({createdByUserID: userID}, function(err, data) {   
        if(err){
            res.status(500).send();
        }
        else{
            res.send(data);
        }
    });
});

/* POST new Channel information and checking if the Channel is valid. */
router.post('/new-directMessage', function (req, res, next) {
    DirectMessages.findOne({selectedUserID: req.body.selectedUserID }, async function(err, data) {   
        if(err){
            res.status(500).send();
        }
        else if(data == null) {
            try{
                let directMessage = new DirectMessages(req.body);
                directMessage.save(function (err, directMessageObject) {
                    if (err){
                        res.status(500).send();
                    }
                });
                console.log("direct message created")
                res.status(201).json({ status: true, success: "Direct message created!" });

            }catch{
                res.status(500).send();
            }
        }
        else{
            res.status(400).json({ status: false, error: "Direct Message is already shown." });
        }
    });
});


module.exports = router